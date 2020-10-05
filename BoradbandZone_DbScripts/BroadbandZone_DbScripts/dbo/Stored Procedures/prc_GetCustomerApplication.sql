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
	@prActivatedFrom SMALLDATETIME = NULL,
	@prActivatedTo SMALLDATETIME = NULL,
	@prResidentialType VARCHAR(30) = NULL,
	@prKeyword VARCHAR(100) = NULL,
	@prDocumentCompleted BIT = NULL,
	@prIsAdmin BIT = NULL,
	@prAgentId INT,
	@prFilterMode INT = NULL,
	@oTotalRecord INT OUTPUT,
	@oTotalUnreadMsg INT OUTPUT,
	@oTotalCommINotConfig INT OUTPUT,
	@oTotalOddClaimed INT OUTPUT

AS
BEGIN
	IF OBJECT_ID('tempdb..##temp_Table') IS NOT NULL DROP TABLE ##temp_Table
	IF OBJECT_ID('tempdb..##TeamMembers') IS NOT NULL DROP TABLE ##TeamMembers

	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID),
			@vSelectQuery NVARCHAR(MAX),
			@vOrderByQuery NVARCHAR(MAX),
			@vWhereQuery NVARCHAR(MAX) = '',
	        @vFromRow VARCHAR(5),
			@vToRow VARCHAR(5)

	SELECT @vFromRow = CAST(((@prCurrentPage - 1) * @prPageSize) + 1 AS VARCHAR(5))
	SELECT @vToRow = CAST(CASE WHEN @prCurrentPage = 1 THEN @prPageSize 
	                          ELSE (((@prCurrentPage - 1) * @prPageSize) + 1) + @prPageSize 
						  END AS VARCHAR(5))	

	CREATE TABLE ##TeamMembers  
	(	
		AgentUsername NVARCHAR(16),
		FullName VARCHAR(50),
		AgentId INT,
		SuperiorId INT,
		AgentLevel INT
	)

	DECLARE @var_Table TABLE(
		ApplicationId INT,
		CustomerName VARCHAR(100),
		CompanyName VARCHAR(100) NULL,
		PackageName VARCHAR(50),
		Category VARCHAR(50),
		ResidentialType VARCHAR(30),
		ResidentialName VARCHAR(50),
		Agent VARCHAR(50),		
		OrderNo VARCHAR(25),
		UserId VARCHAR(25) NULL,
		CustomerRemarks VARCHAR(500) NULL,
		SubmittedOn SMALLDATETIME,
		Status  VARCHAR(50),
		TotalUnreadMsg INT,
		CommIsConfigured BIT,
		OddClaimed BIT,
		RowNum INT
	)

	BEGIN TRY

		INSERT INTO ##TeamMembers
		EXEC prc_GetMyEntireTeam @prAgentId

		-- get row from and row to based on current page
		SELECT @vOrderByQuery =  dbo.fn_GenerateOrderByQuery(@prSortColumn, @prSortInAsc)

		SELECT @vWhereQuery =  CASE WHEN ISNULL(@prProduct,0) <> 0 THEN  'p.ProductId = @vProduct' ELSE  @vWhereQuery + '' END  
		SELECT @vWhereQuery =  CASE WHEN ISNULL(@prProductCategory,0) <> 0 AND @vWhereQuery <> '' THEN @vWhereQuery + ' AND pc.CategoryId = @vProductCategory' 
									WHEN ISNULL(@prProductCategory,0) <> 0 AND @vWhereQuery = '' THEN @vWhereQuery + 'pc.CategoryId = @vProductCategory' 
									ELSE  @vWhereQuery + '' END   
		SELECT @vWhereQuery =  CASE WHEN ISNULL(@prProductPackage,0) <> 0 AND @vWhereQuery <> '' THEN @vWhereQuery + ' AND pp.ProdPkgId = @vProductPackage' 
									WHEN ISNULL(@prProductPackage,0) <> 0 AND @vWhereQuery = '' THEN @vWhereQuery + 'pp.ProdPkgId = @vProductPackage' 
									ELSE  @vWhereQuery + '' END   	
		SELECT @vWhereQuery =  CASE WHEN ISNULL(@prStatus,0) <> 0 AND @vWhereQuery <> '' THEN @vWhereQuery + ' AND a.AppStatusId = @vStatus' 
									WHEN ISNULL(@prStatus,0) <> 0 AND @vWhereQuery = '' THEN @vWhereQuery + 'a.AppStatusId = @vStatus' 
									ELSE  @vWhereQuery + '' END  
		SELECT @vWhereQuery =  CASE WHEN ISNULL(@prAgent,'') <> '' AND @vWhereQuery <> '' THEN @vWhereQuery + ' AND ca.Agent = @vAgent' 
									WHEN ISNULL(@prAgent,'') <> '' AND @vWhereQuery = '' THEN @vWhereQuery + 'ca.Agent = @vAgent' 
									ELSE  @vWhereQuery + '' END  	
		SELECT @vWhereQuery =  CASE WHEN ISNULL(@prSubmittedFrom,'') <> '' AND ISNULL(@prSubmittedTo,'') <> '' AND @vWhereQuery <> '' THEN 
										 @vWhereQuery + ' AND CONVERT(DATE, ca.CreatedOn) BETWEEN @vSubmittedFrom AND @vSubmittedTo'
									WHEN ISNULL(@prSubmittedFrom,'') <> '' AND ISNULL(@prSubmittedTo,'') <> '' AND @vWhereQuery = '' THEN 
										 @vWhereQuery + 'CONVERT(DATE, ca.CreatedOn) BETWEEN @vSubmittedFrom AND @vSubmittedTo'
									ELSE  @vWhereQuery + '' END  
		SELECT @vWhereQuery =  CASE WHEN ISNULL(@prActivatedFrom,'') <> '' AND ISNULL(@prActivatedTo,'') <> '' AND @vWhereQuery <> '' THEN 
										  @vWhereQuery + ' AND CONVERT(DATE, ca.ActivationDate) BETWEEN @vActivatedFrom AND @vActivatedTo'
									WHEN ISNULL(@prActivatedFrom,'') <> '' AND ISNULL(@prActivatedTo,'') <> '' AND @vWhereQuery = '' THEN 
										@vWhereQuery + 'CONVERT(DATE, ca.ActivationDate) BETWEEN @vActivatedFrom AND @vActivatedTo'
									ELSE  @vWhereQuery + '' END  	
		SELECT @vWhereQuery =  CASE WHEN ISNULL(@prResidentialType,'') <> '' AND @vWhereQuery <> '' THEN @vWhereQuery + ' AND ca.ResidentialType = @vResidentialType' 
									WHEN ISNULL(@prResidentialType,'') <> '' AND @vWhereQuery = '' THEN @vWhereQuery + 'ca.ResidentialType = @vResidentialType' 
								    ELSE  @vWhereQuery + '' END  	
		SELECT @vWhereQuery =  CASE WHEN @prIsAdmin = 0 AND @vWhereQuery <> '' THEN @vWhereQuery + ' AND ca.Agent = tm.AgentUsername'
									WHEN @prIsAdmin = 0 AND @vWhereQuery = '' THEN @vWhereQuery + 'ca.Agent = tm.AgentUsername'
								    ELSE  @vWhereQuery + '' END  
		SELECT @vWhereQuery =  CASE WHEN @prDocumentCompleted = 0 AND @vWhereQuery <> '' THEN @vWhereQuery + ' AND ISNULL(ca.DocumentCompleted, 0) = 0'
									WHEN @prDocumentCompleted = 1 AND @vWhereQuery <> '' THEN @vWhereQuery + ' AND ca.DocumentCompleted = 1'
									WHEN @prDocumentCompleted = 0 AND @vWhereQuery = '' THEN @vWhereQuery + 'ISNULL(ca.DocumentCompleted, 0) = 0'
									WHEN @prDocumentCompleted = 1 AND @vWhereQuery = '' THEN @vWhereQuery + 'ca.DocumentCompleted = 1'
								    ELSE  @vWhereQuery + '' END  
		SELECT @vWhereQuery = CASE WHEN NOT @prKeyword IS NULL AND @vWhereQuery <> '' THEN  @vWhereQuery + 
									' AND (ca.CustomerName LIKE ''%' + @prKeyword + '%''
									  OR ca.CompanyName LIKE ''%' + @prKeyword + '%''
									  OR ca.OrderNo LIKE ''%' + @prKeyword + '%''
									  OR ca.ResidentialName LIKE ''%' + @prKeyword + '%'')'
								   WHEN NOT @prKeyword IS NULL AND @vWhereQuery = '' THEN @vWhereQuery + 
									 'ca.CustomerName LIKE ''%' + @prKeyword + '%''
									  OR ca.CompanyName LIKE ''%' + @prKeyword + '%''
									  OR ca.OrderNo LIKE ''%' + @prKeyword + '%''
									  OR ca.ResidentialName LIKE ''%' + @prKeyword + '%'''
							       ELSE  @vWhereQuery + '' END  		
		SELECT @vWhereQuery = CASE WHEN @prFilterMode = 1 AND @vWhereQuery <> '' THEN @vWhereQuery + ' AND msg.TotalUnreadMsg > 0'
								   WHEN @prFilterMode = 2 AND @vWhereQuery <> '' THEN @vWhereQuery + ' AND ac.CommId IS NULL'
								   WHEN @prFilterMode = 3 AND @vWhereQuery <> '' THEN @vWhereQuery + ' AND cl.OddClaimed = 1'
								   WHEN @prFilterMode = 1 AND @vWhereQuery = '' THEN @vWhereQuery + 'msg.TotalUnreadMsg > 0'
								   WHEN @prFilterMode = 2 AND @vWhereQuery = '' THEN @vWhereQuery + 'ac.CommId IS NULL'
								   WHEN @prFilterMode = 3 AND @vWhereQuery = '' THEN @vWhereQuery + 'cl.OddClaimed = 1'
								   ELSE @vWhereQuery + '' END  
							

		SELECT @vSelectQuery = 'SELECT ca.ApplicationId,
				ca.CustomerName,
				ca.CompanyName,
				pp.PackageName,
				pc.Category,
				ca.ResidentialType,
				ca.ResidentialName,
				ca.Agent,
				ca.OrderNo,
				ca.UserId,
				ca.CustomerRemarks,
				ca.CreatedOn,
				a.Status,
				msg.TotalUnreadMsg,
				CommIsConfigured = CAST(CASE WHEN NOT ac.CommId IS NULL THEN 1 ELSE 0 END AS BIT),
				cl.OddClaimed,
			    ROW_NUMBER() OVER (ORDER BY ' + @vOrderByQuery + ') AS RowNum
		INTO ##temp_Table
		FROM CustomerApplication ca
		INNER JOIN ProductPackage PP ON ca.ProdPkgId = pp.ProdPkgId
		INNER JOIN ProductCategory PC ON pc.CategoryId = pp.CategoryId
		INNER JOIN Product p ON pc.ProductId = p.ProductId
		INNER JOIN ApplicationStatus a ON ca.AppStatusId = a.AppStatusId
		INNER JOIN ##TeamMembers tm ON ca.Agent = tm.AgentUsername
		LEFT JOIN AgentCommission ac ON ac.AgentId = tm.AgentId AND ac.CategoryId = ca.CategoryId
		CROSS APPLY
		(
			SELECT TotalUnreadMsg = COUNT(CommId)
			FROM Communication
			WHERE ApplicationId = ca.ApplicationId
			AND [Role] = CASE WHEN @vIsAdmin = 1 THEN ''AG'' ELSE ''AD'' END
			AND MsgRead = 0
		) msg
		CROSS APPLY
		(
			SELECT OddClaimed = CASE WHEN COUNT(ClaimCommId) > 0 AND a.Status <> ''Post Complete'' THEN 1 ELSE 0 END
			FROM ClaimableCommission
			WHERE ApplicationId = ca.ApplicationId
			AND NOT ClaimWithdrawalId IS NULL
		) cl'  + 
		CASE WHEN @vWhereQuery <> '' THEN ' WHERE ' + @vWhereQuery  ELSE '' END
		
		PRINT @vSelectQuery
		---- insert the dynamic query results into temp table
		--INSERT INTO @var_Table
		EXEC SP_ExecuteSQL @vSelectQuery, N'@vCurrentPage INT,
											@vPageSize INT,
											@vProduct INT,
											@vProductCategory INT,
											@vProductPackage INT,
											@vStatus INT,
											@vAgent VARCHAR(50),
											@vSubmittedFrom SMALLDATETIME,
											@vSubmittedTo SMALLDATETIME,
											@vActivatedFrom SMALLDATETIME,
											@vActivatedTo SMALLDATETIME,
											@vResidentialType VARCHAR(30),
											@vKeyword VARCHAR(100),
											@vDocumentCompleted BIT,
											@vIsAdmin BIT,
											@vAgentId INT,
											@vFilterMode INT ', 
											@vCurrentPage = @prCurrentPage,
											@vPageSize = @prPageSize,
											@vProduct = @prProduct,
											@vProductCategory = @prProductCategory,
											@vProductPackage = @prProductPackage,
											@vStatus = @prStatus,
											@vAgent = @prAgent,
											@vSubmittedFrom = @prSubmittedFrom,
											@vSubmittedTo = @prSubmittedTo,
											@vActivatedFrom = @prActivatedFrom,
											@vActivatedTo = @prActivatedTo,
											@vResidentialType = @prResidentialType,
											@vKeyword = @prKeyword,
											@vDocumentCompleted = @prDocumentCompleted,
											@vIsAdmin = @prIsAdmin,
											@vAgentId = @prAgentId,
											@vFilterMode = @prFilterMode;

		INSERT INTO @var_Table
		SELECT *
		FROM  ##temp_Table

		SELECT ApplicationId,
				CustomerName,
				CompanyName,
				ResidentialName,
				PackageName,
				Category,
				Agent,
				OrderNo,
				UserId,
				CustomerRemarks,
				SubmittedOn  = FORMAT(SubmittedOn, 'MM/dd/yyyy'),
				[Status],
				TotalUnreadMsg,
				CommIsConfigured,
				OddClaimed
		FROM  @var_Table
		WHERE RowNum Between @vFromRow AND @vToRow

		SELECT @oTotalRecord = COUNT(ApplicationId) FROM ##temp_Table
		SELECT @oTotalUnreadMsg = COUNT(ApplicationId) FROM ##temp_Table WHERE TotalUnreadMsg > 0
	    SELECT @oTotalCommINotConfig = COUNT(ApplicationId) FROM ##temp_Table WHERE CommIsConfigured = 0
		SELECT @oTotalOddClaimed = COUNT(ApplicationId) FROM ##temp_Table WHERE OddClaimed = 1

		DROP TABLE  ##temp_Table
		DROP TABLE  ##TeamMembers
	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END