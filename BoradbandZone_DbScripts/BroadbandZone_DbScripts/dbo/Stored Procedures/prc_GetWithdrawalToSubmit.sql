
CREATE PROCEDURE [dbo].[prc_GetWithdrawalToSubmit]
	@prCurrentPage INT,
	@prPageSize INT,
	@prSortColumn VARCHAR(50),
	@prSortInAsc BIT,
	@prAgent VARCHAR(25),
	@prSearchKeyword VARCHAR(150),
	@prSubmittedFrom SMALLDATETIME = NULL,
	@prSubmittedTo SMALLDATETIME = NULL,
	@oTotalRecord INT OUTPUT
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID),
			@vSelectQuery NVARCHAR(MAX)

	DECLARE @var_Table TABLE(
		ApplicationId INT,
		CustomerName VARCHAR(25),
		PackageName VARCHAR(150),
		Category VARCHAR(50),
		SubmittedOn SMALLDATETIME,
		ClaimAmount MONEY,
		RowNum INT
	)

	BEGIN TRY
		IF OBJECT_ID('tempdb..##temp_Table') IS NOT NULL DROP TABLE ##temp_Table

		-- get row from and row to based on current page
		SELECT @vSelectQuery =  dbo.fn_GenerateDynamicQuery(@prCurrentPage, @prPageSize, @prSortColumn, @prSortInAsc)

		SELECT 
			ca.ApplicationId,
			ca.CustomerName,
			pp.PackageName,
			pc.Category,
			ca.CreatedOn,
			(pp.Commission * ac.AgentCommission) * 1.0 / 100 AS ClaimAmount
		INTO ##temp_Table
		FROM CustomerApplication ca 
		INNER JOIN Agent a ON ca.Agent = a.UserLogin
		INNER JOIN AgentCommission ac ON ac.CategoryId = ca.CategoryId AND a.AgentId = ac.AgentId
		INNER JOIN ProductPackage pp ON ca.ProdPkgId = pp.ProdPkgId
		INNER JOIN ProductCategory pc ON pp.CategoryId = pc.CategoryId
		INNER JOIN ApplicationStatus s ON s.AppStatusId = ca.AppStatusId
		LEFT JOIN vwWithdrawalItems w ON ca.ApplicationId = w.WithdrawalAppId
		WHERE w.WithdrawalAppId IS NULL
		AND ca.Agent = @prAgent
		AND s.Status = 'Post Complete'
	    AND 1 = CASE WHEN ISNULL(@prSubmittedFrom,'') = '' AND  ISNULL(@prSubmittedTo,'') = '' THEN 1
					 WHEN ca.CreatedOn  BETWEEN @prSubmittedFrom AND @prSubmittedTo THEN 1
					 ELSE 0
				END
	    AND 1 = CASE WHEN ISNULL(@prSearchKeyword,'') = '' THEN 1
					 WHEN ca.CustomerName LIKE '%' + @prSearchKeyword + '%' THEN 1
					 WHEN CAST(ca.ApplicationId AS VARCHAR(150)) LIKE '%' + @prSearchKeyword + '%' THEN 1
					 ELSE 0
				END

		PRINT @vSelectQuery
		-- insert the dynamic query results into temp table
		INSERT INTO @var_Table
		EXEC SP_ExecuteSQL @vSelectQuery

		SELECT ApplicationId,
			   CustomerName,
			   PackageName,
			   Category,
			   SubmittedOn = FORMAT(SubmittedOn, 'MM/dd/yyyy'),
			   ClaimAmount
		FROM  @var_Table

		SELECT @oTotalRecord = COUNT(ApplicationId) FROM @var_Table

		DROP TABLE  ##temp_Table

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END