CREATE PROCEDURE [dbo].[prc_GetCustomerApplicationForDownload]

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
	@prAgentId INT

AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID)

	DECLARE @vTeamMembers TABLE 
	(	
		AgentUsername NVARCHAR(16),
		FullName VARCHAR(50),
		AgentId INT
	)

	BEGIN TRY

		IF @prIsAdmin <> 1
		BEGIN
			INSERT INTO @vTeamMembers
			EXEC prc_GetMyEntireTeam @prAgentId
		END

		SELECT 
			   ca.ApplicationId
			  ,pc.Category
			  ,pp.PackageName
			  ,ca.Agent
			  ,ca.CompanyName
			  ,ca.CompanyRegNo
			  ,ca.CustomerName
			  ,ca.CustomerId
			  ,ca.ResidentialType
			  ,ca.ResidentialName
			  ,ca.CustomerAddr
			  ,ca.City
			  ,ca.Postcode
			  ,ca.State
			  ,ca.ContactNo
			  ,ca.Email
			  ,ca.CustomerRemarks
			  ,ca.AdminRemarks
			  ,a.Status
			  ,ca.IsProcessed
			  ,ca.OrderNo
			  ,ca.UserId
			  ,ca.TelNo
			  ,ca.EForm
			  ,ca.SubmitByAgent
			  ,ca.DocumentCompleted
			  ,ca.ActivationDate
			  ,ca.CreatedOn
			  ,ca.CreatedBy
			  ,ca.ModifiedOn
			  ,ca.ModifiedBy
		FROM CustomerApplication ca
		INNER JOIN ProductPackage PP ON ca.ProdPkgId = pp.ProdPkgId
		INNER JOIN ProductCategory PC ON pc.CategoryId = pp.CategoryId
		INNER JOIN Product p ON pc.ProductId = p.ProductId
		INNER JOIN ApplicationStatus a ON ca.AppStatusId = a.AppStatusId
		LEFT JOIN @vTeamMembers tm ON ca.Agent = tm.AgentUsername
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
					 WHEN CONVERT(DATE, ca.CreatedOn) BETWEEN @prSubmittedFrom AND @prSubmittedTo THEN 1
					 ELSE 0
				END	
		AND 1 = CASE WHEN ISNULL(@prActivatedFrom,'') = '' OR ISNULL(@prActivatedTo,'') = '' THEN 1
					 WHEN CONVERT(DATE, ca.ActivationDate)  BETWEEN @prActivatedFrom AND @prActivatedTo THEN 1
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
						  OR ca.OrderNo LIKE '%' + @prKeyword + '%'
					      OR ca.ResidentialName LIKE '%' + @prKeyword + '%' THEN 1
					 ELSE 0
				END	

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END