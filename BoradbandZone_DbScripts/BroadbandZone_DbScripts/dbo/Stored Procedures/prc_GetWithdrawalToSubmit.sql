
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
		ClaimCommId INT,
		TransactionDetails VARCHAR(250),
		PackageName VARCHAR(150),
		CreatedOn SMALLDATETIME,
		PackageComm MONEY,
		AgentComm SMALLINT,
		ClaimAmount MONEY,
		DeductAmount MONEY,
		TransactionType VARCHAR(50),		
		RowNum INT
	)

	BEGIN TRY
		IF OBJECT_ID('tempdb..##temp_Table') IS NOT NULL DROP TABLE ##temp_Table

		-- get row from and row to based on current page
		SELECT @vSelectQuery = dbo.fn_GenerateDynamicQuery(@prCurrentPage, @prPageSize, @prSortColumn, @prSortInAsc)

		SELECT 
			ca.ApplicationId,
			cc.ClaimCommId,
			ca.CustomerName AS [TransactionDetails],
			pp.PackageName,
			ca.CreatedOn,
			cc.PackageCommOnDate,
			cc.AgentCommOnDate,
			ClaimAmount = CASE WHEN cc.ClaimWithdrawalId IS NULL THEN  CAST(ROUND((cc.PackageCommOnDate * cc.AgentCommOnDate) * 1.0 / 100, 2) AS MONEY) ELSE NULL END,
			DeductAmount = CASE WHEN NOT c.ClawbackId IS NULL AND cc.DeductedWithdrawalId IS NULL THEN CAST(ROUND((cc.PackageCommOnDate * cc.AgentCommOnDate) * 1.0 / 100, 2) AS MONEY) ELSE NULL END,
			TransactionType = CASE WHEN NOT c.ClawbackId IS NULL AND cc.DeductedWithdrawalId IS NULL THEN 'Clawback'
								   WHEN cc.IsOverride = 1  THEN 'Override' 
								   ELSE 'Own Sales' 
						      END
		INTO ##temp_Table
		FROM ClaimableCommission cc
		INNER JOIN Agent a ON cc.AgentId = a.AgentId
		INNER JOIN CustomerApplication ca ON ca.ApplicationId = cc.ApplicationId
		INNER JOIN ApplicationStatus s ON s.AppStatusId = ca.ApplicationId
		INNER JOIN ProductPackage pp ON ca.ProdPkgId = pp.ProdPkgId
		LEFT JOIN Clawback c ON c.ApplicationId = ca.ApplicationId
		WHERE a.UserLogin = @prAgent
		AND ca.DocumentCompleted = 1
		AND s.Status = 'Post Complete'
		AND 1 = CASE WHEN cc.ClaimWithdrawalId IS NULL THEN 1
					 WHEN NOT c.ClawbackId IS NULL AND cc.DeductedWithdrawalId IS NULL THEN 1
					 ELSE 0
				END
	    AND 1 = CASE WHEN ISNULL(@prSubmittedFrom,'') = '' AND ISNULL(@prSubmittedTo,'') = '' THEN 1
					 WHEN ca.CreatedOn  BETWEEN @prSubmittedFrom AND @prSubmittedTo THEN 1
					 ELSE 0
				END
	    AND 1 = CASE WHEN ISNULL(@prSearchKeyword,'') = '' THEN 1
					 WHEN ca.CustomerName LIKE '%' + @prSearchKeyword + '%' THEN 1
					 WHEN CAST(ca.OrderNo AS VARCHAR(150)) LIKE '%' + @prSearchKeyword + '%' THEN 1
					 ELSE 0
				END

		PRINT @vSelectQuery

		-- insert the dynamic query results into temp table
		INSERT INTO @var_Table
		EXEC SP_ExecuteSQL @vSelectQuery

		SELECT *
		FROM
		(
		    -- SALES COMMISSION INCLUDING OVERRIDING
			SELECT ClaimCommId,
				   TransactionDetails,
				   PackageName,
				   [Date] = FORMAT(CreatedOn, 'MM/dd/yyyy'),
				   PackageComm,
				   AgentComm,
				   ClaimAmount,
				   DeductAmount,
				   TransactionType
			FROM  @var_Table
			UNION ALL
			-- AGENT CHARGES
			SELECT ClaimCommId = NULL,        
				   TransactionDetails = ac.Description, 
				   PackageName = NULL, 
				   [Date] = FORMAT(ac.CreatedOn, 'MM/dd/yyyy'), 
				   PackageComm = NULL,
				   AgentComm = NULL, 
				   ClaimAmount = NULL, 
				   DeductAmount = ac.Amount,
				   TransactionType = 'Purchase'
			FROM AgentCharge ac
			WHERE ac.Agent = @prAgent
			AND ISNULL(Cancelled, 0) = 0
			AND ac.WithdrawalId IS NULL
		) a 
		ORDER BY [Date]

		SELECT @oTotalRecord = COUNT(ClaimCommId) FROM ##temp_Table

		DROP TABLE  ##temp_Table

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END