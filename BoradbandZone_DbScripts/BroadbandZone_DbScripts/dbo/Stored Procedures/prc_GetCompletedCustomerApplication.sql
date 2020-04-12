CREATE PROCEDURE [dbo].[prc_GetCompletedCustomerApplication]
	@prCurrentPage INT,
	@prPageSize INT,
	@prSortColumn VARCHAR(50),
	@prSortInAsc BIT,
	@prProduct INT,
	@prProductCategory INT,
	@prProductPackage INT,
	@prCommStatus VARCHAR(15),
	@prViewAgent VARCHAR(50) = '',
	@prActivatedFrom SMALLDATETIME = NULL,
	@prActivatedTo SMALLDATETIME = NULL,
	@prPayDateFrom SMALLDATETIME = NULL,
	@prPayDateTo SMALLDATETIME = NULL,
	@prKeyword VARCHAR(100) = NULL,
	@prDocumentCompleted BIT = NULL,
	@prIsAdmin BIT = NULL,
	@prAgentId INT,
	@oTotalRecord INT OUTPUT

AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID),
			@vSelectQuery NVARCHAR(MAX)

	DECLARE @vTeamMembers TABLE 
	(	
		AgentUsername NVARCHAR(16),
		FullName VARCHAR(50)
	)

	DECLARE @var_Table TABLE(
		ApplicationId INT,
		CustomerName VARCHAR(100),
		PackageName VARCHAR(50),
		Category VARCHAR(50),
		ActivatedOn SMALLDATETIME,
		OrderNo VARCHAR(25),
		Agent VARCHAR(50),
		--IsOverride BIT,
		DocumentCompleted BIT,
		CommStatus VARCHAR (15),
		--ClaimSubmitted BIT,
		--IsPaid  BIT,
		PaidOn SMALLDATETIME,
		RowNum INT
	)

	BEGIN TRY
		IF OBJECT_ID('tempdb..##temp_Table') IS NOT NULL DROP TABLE ##temp_Table

		IF @prIsAdmin <> 1
		BEGIN
			INSERT INTO @vTeamMembers
			EXEC prc_GetMyEntireTeam @prAgentId
		END
	
		-- get row from and row to based on current page
		SELECT @vSelectQuery =  dbo.fn_GenerateDynamicQuery(@prCurrentPage, @prPageSize, @prSortColumn, @prSortInAsc)

		SELECT 
			   ca.ApplicationId
			  ,ca.CustomerName
			  ,pp.PackageName
			  ,pc.Category
			  ,ca.ActivationDate
			  ,ca.OrderNo
			  ,a.UserLogin
			 -- ,cc.IsOverride
			  ,ca.DocumentCompleted
			  ,CommStatus = CASE WHEN ca.DocumentCompleted = 0 THEN 'Claim Disallowed'
			                     WHEN NOT w.CompletedOn IS NULL THEN 'Paid'
							     --WHEN ca.DocumentCompleted = 1 AND cc.ClaimWithdrawalId IS NULL THEN 'Not Claim'
								 WHEN ca.DocumentCompleted = 1 AND NOT cc.ClaimWithdrawalId IS NULL THEN 'Claimed'
								 ELSE 'Not Claim'
							END
			  ,w.CompletedOn 
		INTO ##temp_Table
		FROM CustomerApplication ca
		INNER JOIN ProductPackage PP ON ca.ProdPkgId = pp.ProdPkgId
		INNER JOIN ProductCategory PC ON pc.CategoryId = pp.CategoryId
		INNER JOIN Product p ON pc.ProductId = p.ProductId
		INNER JOIN ClaimableCommission cc ON cc.ApplicationId = ca.ApplicationId  --AND cc.AgentId = a.AgentId
		INNER JOIN Agent a ON cc.AgentId = a.AgentId
		LEFT JOIN Withdrawal w ON w.WithdrawalId = cc.ClaimWithdrawalId
		WHERE 1 = CASE WHEN @prAgentId IS NULL THEN 1
		               WHEN cc.AgentId = @prAgentId AND ISNULL(cc.IsOverride, 0) = 0 THEN 1
					   ELSE 0
				  END
		AND 1 = CASE WHEN ISNULL(@prProduct,0) = 0 THEN 1
					   WHEN p.ProductId = @prProduct THEN 1
					   ELSE 0
				  END
		AND 1 = CASE WHEN ISNULL(@prProductCategory,0) = 0 THEN 1
					   WHEN Pc.CategoryId = @prProductCategory THEN 1
					   ELSE 0
				  END
		AND 1 = CASE WHEN ISNULL(@prProductPackage,0) = 0 THEN 1
					 WHEN PP.ProdPkgId = @prProductPackage THEN 1
					 ELSE 0
				END
		AND 1 = CASE WHEN ISNULL(@prViewAgent,'') = '' THEN 1
					 WHEN a.UserLogin = @prViewAgent THEN 1
					 ELSE 0
				END
		AND 1 = CASE WHEN ISNULL(@prActivatedFrom,'') = '' OR ISNULL(@prActivatedTo,'') = '' THEN 1
					 WHEN CONVERT(DATE, ca.ActivationDate)  BETWEEN @prActivatedFrom AND @prActivatedTo THEN 1
					 ELSE 0
				END	
		AND 1 = CASE WHEN ISNULL(@prPayDateFrom,'') = '' OR ISNULL(@prPayDateTo,'') = '' THEN 1
					 WHEN CONVERT(DATE, w.CompletedOn) BETWEEN @prPayDateFrom AND @prPayDateTo THEN 1
					 ELSE 0
				END	
		AND 1 = CASE wHEN @prDocumentCompleted IS NULL THEN 1
		             wHEN @prDocumentCompleted  = ca.DocumentCompleted THEN 1
					 ELSE 0 
				END
		AND 1 = CASE wHEN @prCommStatus IS NULL THEN 1
					 WHEN @prCommStatus = 'Paid' AND NOT w.CompletedOn IS NULL THEN  1
					 WHEN @prCommStatus = 'Claim Disallowed' AND ca.DocumentCompleted = 0 THEN  1
					 WHEN @prCommStatus = 'Not Claim' AND ca.DocumentCompleted = 1 AND cc.ClaimWithdrawalId IS NULL THEN  1
				     WHEN @prCommStatus = 'Claimed' AND ca.DocumentCompleted = 1 AND NOT cc.ClaimWithdrawalId IS NULL THEN  1
					 ELSE 0 
				END				
		AND 1 = CASE WHEN ISNULL(@prKeyword,'') = '' THEN 1
					 WHEN ca.CustomerName LIKE '%' + @prKeyword + '%' 
						  OR ca.OrderNo LIKE '%' + @prKeyword + '%'
					      OR ca.ResidentialName LIKE '%' + @prKeyword + '%' THEN 1
					 ELSE 0
				END	

		PRINT @vSelectQuery
		-- insert the dynamic query results into temp table
		INSERT INTO @var_Table
		EXEC SP_ExecuteSQL @vSelectQuery

		SELECT
			ApplicationId,
			CustomerName,
			PackageName,
			Category,
			ActivatedOn = FORMAT(ActivatedOn, 'MM/dd/yyyy'),
			OrderNo,
			Agent,
			--IsOverride,
			DocumentCompleted,
			CommStatus,
			--ClaimSubmitted,
			--IsPaid,
			PaidOn = FORMAT(PaidOn, 'MM/dd/yyyy')
		FROM  @var_Table

		SELECT @oTotalRecord = COUNT(ApplicationId) FROM ##temp_Table

		DROP TABLE  ##temp_Table

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END