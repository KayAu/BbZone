CREATE PROCEDURE [dbo].[prc_GetCustomerApplication]
	@prCurrentPage INT,
	@prPageSize INT,
	@prSortColumn VARCHAR(50),
	@prSortInAsc BIT,
	@prProduct INT,
	@prProductCategory INT,
	@prProductPackage INT,
	@prStatus INT,
	@prAgent VARCHAR(50) = '',
	@prSubmittedFrom SMALLDATETIME = NULL,
	@prSubmittedTo SMALLDATETIME = NULL,
	@prResidentialType VARCHAR(30) = NULL,
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
		ResidentialType VARCHAR(30),
		ResidentialName VARCHAR(50),
		Agent VARCHAR(50),
		SubmittedOn SMALLDATETIME,
		Status  VARCHAR(50),
		TotalUnreadMsg INT,
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

		SELECT ca.ApplicationId,
				ca.CustomerName,
				pp.PackageName,
				pc.Category,
				ca.ResidentialType,
				ca.ResidentialName,
				ca.Agent,
				ca.CreatedOn,
				a.Status,
				msg.TotalUnreadMsg
		INTO ##temp_Table
		FROM CustomerApplication ca
		INNER JOIN ProductPackage PP ON ca.ProdPkgId = pp.ProdPkgId
		INNER JOIN ProductCategory PC ON pc.CategoryId = pp.CategoryId
		INNER JOIN Product p ON pc.ProductId = p.ProductId
		INNER JOIN ApplicationStatus a ON ca.AppStatusId = a.AppStatusId
		LEFT JOIN @vTeamMembers tm ON ca.Agent = tm.AgentUsername
		CROSS APPLY
		(
			SELECT TotalUnreadMsg = COUNT(CommId)
			FROM Communication
			WHERE ApplicationId = ca.ApplicationId
			AND [Role] = CASE WHEN @prIsAdmin = 1 THEN 'AG' ELSE 'AD' END
			AND MsgRead = 0
		) msg
		WHERE 1 = CASE WHEN ISNULL(@prProduct,0) = 0 THEN 1
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
		AND 1 = CASE WHEN ISNULL(@prStatus,0) = 0 THEN 1
					 WHEN a.AppStatusId = @prStatus THEN 1
					 ELSE 0
				END
		AND 1 = CASE WHEN ISNULL(@prAgent,'') = '' THEN 1
					 WHEN ca.Agent = @prAgent THEN 1
					 ELSE 0
				END
		AND 1 = CASE WHEN ISNULL(@prSubmittedFrom,'') = '' OR ISNULL(@prSubmittedTo,'') = '' THEN 1
					 WHEN ca.CreatedOn BETWEEN @prSubmittedFrom AND @prSubmittedTo THEN 1
					 ELSE 0
				END	
		AND 1 = CASE WHEN ISNULL(@prResidentialType,'') = '' THEN 1
					 WHEN ca.ResidentialType = @prResidentialType THEN 1
					 ELSE 0
				END	
		AND 1 = CASE WHEN @prIsAdmin  = 1 THEN 1
		             WHEN @prIsAdmin  = 0 AND ca.Agent = tm.AgentUsername THEN 1
					 ELSE 0
				END
		AND 1 = CASE wHEN @prDocumentCompleted IS NULL THEN 1
		             wHEN @prDocumentCompleted  = ca.DocumentCompleted THEN 1
					 ELSE 0 
				END
		AND 1 = CASE WHEN ISNULL(@prKeyword,'') = '' THEN 1
					 WHEN ca.CustomerName LIKE '%' + @prKeyword + '%' 
						  --OR ca.CompanyName LIKE '%' + @prKeyword + '%'
						  --OR ca.CustomerAddr LIKE '%' + @prKeyword + '%'
						  OR ca.OrderNo LIKE '%' + @prKeyword + '%'
					      OR ca.ResidentialName LIKE '%' + @prKeyword + '%' THEN 1
					 ELSE 0
				END	

		PRINT @vSelectQuery
		-- insert the dynamic query results into temp table
		INSERT INTO @var_Table
		EXEC SP_ExecuteSQL @vSelectQuery

		SELECT ApplicationId,
			   CustomerName,
			   ResidentialName,
				PackageName,
				Category,
				Agent,
				SubmittedOn  = FORMAT(SubmittedOn, 'MM/dd/yyyy'),
				[Status],
				TotalUnreadMsg
		FROM  @var_Table

		SELECT @oTotalRecord = COUNT(ApplicationId) FROM ##temp_Table

		DROP TABLE  ##temp_Table

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END