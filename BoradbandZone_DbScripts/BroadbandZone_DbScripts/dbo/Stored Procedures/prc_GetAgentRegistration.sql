CREATE PROCEDURE [dbo].[prc_GetAgentRegistration]
	@prCurrentPage INT,
	@prPageSize INT,
	@prSortColumn VARCHAR(50),
	@prSortInAsc BIT,
	@prSearchKeyword VARCHAR(150) = '',
	@prRecordStatus INT,
	@oTotalRecord INT OUTPUT

AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID),
			@vSelectQuery NVARCHAR(MAX)

	DECLARE @var_Table TABLE(
		RegId INT NOT NULL,
		Fullname VARCHAR(50) NOT NULL,
		UserLogin VARCHAR(50) NOT NULL, 
		CompanyName VARCHAR(50) NULL,
		MobileNo VARCHAR(15) NOT NULL,
		SuperiorName VARCHAR(50) NULL,
		SuperiorLogin VARCHAR(25) NULL,
		CreatedOn SMALLDATETIME NULL,
		ActivationCode VARCHAR(100) NULL,
		IsApproved BIT NULL,
		ApprovalDate SMALLDATETIME NULL,
		ApprovedBy VARCHAR(50),
		RowNum INT
	)

	BEGIN TRY
		IF OBJECT_ID('tempdb..##temp_Table') IS NOT NULL DROP TABLE ##temp_Table

		-- get row from and row to based on current page
		SELECT @vSelectQuery =  dbo.fn_GenerateDynamicQuery(@prCurrentPage, @prPageSize, @prSortColumn, @prSortInAsc)

		SELECT r.RegId,
		    r.Fullname,
			r.UserLogin,
			r.CompanyName,
			r.MobileNo,
			SuperiorName = a.Fullname,
			SuperiorLogin = a.UserLogin,
			r.CreatedOn,
			r.ActivationCode,
			r.IsApproved,
			r.ApprovalDate,
			r.ApprovedBy
		INTO ##temp_Table
		FROM Registration r 
		LEFT JOIN Agent a ON a.AgentId = r.SuperiorId
		WHERE 1 = CASE WHEN ISNULL(@prSearchKeyword,'') = ''  THEN 1
					   WHEN r.Fullname LIKE '%' + @prSearchKeyword + '%' OR
						    r.CompanyName LIKE '%' +@prSearchKeyword + '%' THEN 1
						ELSE 0
					END
		AND 1 = CASE WHEN ISNULL(@prRecordStatus, 0) = 0 THEN 1
		             WHEN @prRecordStatus = 1 AND IsApproved IS NULL THEN 1
					 WHEN @prRecordStatus = 2 AND IsApproved = 1 THEN 1
					 WHEN @prRecordStatus = 3 AND IsApproved = 0 THEN 1
					 ELSE 0
				END

		PRINT @vSelectQuery
		-- insert the dynamic query results into temp table
		INSERT INTO @var_Table
		EXEC SP_ExecuteSQL @vSelectQuery

		SELECT  RegId,
				Fullname,
				UserLogin,
				CompanyName,
				MobileNo,
				SuperiorName,
				SuperiorLogin,
				CreatedOn = FORMAT(CreatedOn, 'MM/dd/yyyy'),
				ActivationCode,
				IsApproved,
				ApprovalDate  = FORMAT(ApprovalDate, 'MM/dd/yyyy'),
				ApprovedBy
		FROM  @var_Table

		SELECT @oTotalRecord = COUNT(RegId) FROM ##temp_Table

		DROP TABLE  ##temp_Table

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END