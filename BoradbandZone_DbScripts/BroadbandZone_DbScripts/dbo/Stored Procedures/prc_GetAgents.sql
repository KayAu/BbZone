CREATE PROCEDURE [dbo].[prc_GetAgents]
	@prCurrentPage INT,
	@prPageSize INT,
	@prSortColumn VARCHAR(50),
	@prSortInAsc BIT,
	@prSearchKeyword VARCHAR(150) = '',
	@prRecordStatus BIT,
	@oTotalRecord INT OUTPUT

AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID),
			@vSelectQuery NVARCHAR(MAX)

	DECLARE @var_Table TABLE(
		AgentId INT,
		Fullname VARCHAR(50),
		CompanyName VARCHAR(50),
		MobileNo VARCHAR(15),
		TelNo  VARCHAR(15),
		IsActive BIT,
		SuperiorName VARCHAR(50),
		CreatedOn SMALLDATETIME,
		LastLoginOn VARCHAR(15),
		RowNum INT
	)

	BEGIN TRY
		IF OBJECT_ID('tempdb..##temp_Table') IS NOT NULL DROP TABLE ##temp_Table

		-- get row from and row to based on current page
		SELECT @vSelectQuery =  dbo.fn_GenerateDynamicQuery(@prCurrentPage, @prPageSize, @prSortColumn, @prSortInAsc)

		SELECT a1.AgentId
			  ,a1.UserLogin
			  ,a1.CompanyName
			  ,a1.MobileNo
			  ,a1.TelNo
			  ,a1.IsActive
			  ,SuperiorName = CASE WHEN NOT a1.SuperiorId IS NULL THEN a2.UserLogin ELSE NULL END
			  ,a1.CreatedOn
			  ,l.LastLoginOn	
		INTO ##temp_Table
		FROM Agent a1
		LEFT JOIN Agent a2 ON a1.SuperiorId = a2.AgentId
		CROSS APPLY
		(
			SELECT TOP 1 LastLoginOn = FORMAT(LoginDate, 'MM/dd/yyyy')
			FROM LoginTrail
			WHERE AgentId = a1.AgentId
			ORDER BY LoginDate DESC
		) l
		WHERE 1 = CASE WHEN ISNULL(@prSearchKeyword,'') = ''  THEN 1
					   WHEN a1.UserLogin LIKE '%' + @prSearchKeyword + '%' OR
					        a2.UserLogin LIKE '%' + @prSearchKeyword + '%' THEN 1
					   ELSE 0
				  END
		AND 1 = CASE WHEN @prRecordStatus IS NULL THEN 1
					 WHEN a1.IsActive = ISNULL(@prRecordStatus,0) THEN 1
					 ELSE 0
				END

		PRINT @vSelectQuery

		-- insert the dynamic query results into temp table
		INSERT INTO @var_Table
		EXEC SP_ExecuteSQL @vSelectQuery


		SELECT AgentId,
				Fullname,
				CompanyName,
				MobileNo,
				TelNo,
				IsActive,
				SuperiorName,
				LastLoginOn
		FROM  @var_Table

		SELECT @oTotalRecord = COUNT(AgentId) FROM ##temp_Table

		DROP TABLE  ##temp_Table

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END