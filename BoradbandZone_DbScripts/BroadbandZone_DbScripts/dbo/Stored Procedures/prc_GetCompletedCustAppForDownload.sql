CREATE PROCEDURE [dbo].[prc_GetCompletedCustAppForDownload]
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
	@prDocumentCompleted BIT = NULL
	--@prIsAdmin BIT = NULL
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID)

	BEGIN TRY
	
		SELECT 
			   ca.ApplicationId
			  ,ca.CustomerName
			  ,pp.PackageName
			  ,pc.Category
			  ,ca.ActivationDate
			  ,ca.UserId
			  ,a.UserLogin
			  ,ca.DocumentCompleted
			  ,CommAmount = CASE WHEN NOT cc.ClaimWithdrawalId IS NULL THEN FORMAT((cc.PackageCommOnDate * cc.AgentCommOnDate) * 1.0 / 100,'c','ms-MY')
								 ELSE 'RM0' END
			  ,CommStatus = CASE WHEN NOT cc.ClaimWithdrawalId IS NULL AND s.Status <> 'Post Complete' THEN 'Odd Claim'
								 WHEN ISNULL(ca.DocumentCompleted,0) = 0 THEN 'Claim Disallowed'
			                     WHEN NOT w.CompletedOn IS NULL THEN 'Paid'
								 WHEN cc.AgentCommOnDate = 0 THEN 'Not Created'
							     WHEN ca.DocumentCompleted = 1 AND cc.ClaimWithdrawalId IS NULL THEN 'Not Claim'
								 WHEN ca.DocumentCompleted = 1 AND NOT cc.ClaimWithdrawalId IS NULL THEN 'Claimed'	
							END
			  ,w.WithdrawalId
			  ,w.CompletedOn 
		FROM CustomerApplication ca
		INNER JOIN ApplicationStatus s ON ca.AppStatusId = s.AppStatusId
		--INNER JOIN Agent a ON ca.Agent = a.UserLogin
		INNER JOIN ProductPackage PP ON ca.ProdPkgId = pp.ProdPkgId
		INNER JOIN ProductCategory PC ON pc.CategoryId = pp.CategoryId
		INNER JOIN Product p ON pc.ProductId = p.ProductId
		LEFT JOIN ClaimableCommission cc ON cc.ApplicationId = ca.ApplicationId  
		LEFT JOIN AgentCommission ac ON ac.AgentId = cc.AgentId AND ac.CategoryId = ca.CategoryId
		LEFT JOIN Agent a ON ac.AgentId = a.AgentId
		LEFT JOIN Withdrawal w ON w.WithdrawalId = cc.ClaimWithdrawalId
		WHERE 
		1 = CASE WHEN s.Status = 'Post Complete' THEN 1
		         WHEN NOT cc.ClaimWithdrawalId IS NULL AND s.Status <> 'Post Complete' THEN 1
				 ELSE 0
			END
		--AND 1 = CASE WHEN @prAgentId IS NULL THEN 1
		--               WHEN cc.AgentId IS NULL AND a.AgentId = @prAgentId THEN 1
		--               WHEN cc.AgentId = @prAgentId AND ISNULL(cc.IsOverride, 0) = 0 THEN 1
		--			   ELSE 0
		--		  END
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
					 WHEN @prCommStatus = 'Odd Claim' AND NOT cc.ClaimWithdrawalId IS NULL AND s.Status <> 'Post Complete' THEN  1
					 WHEN @prCommStatus = 'Not Claim' AND ca.DocumentCompleted = 1 AND cc.ClaimWithdrawalId IS NULL THEN  1
				     WHEN @prCommStatus = 'Claimed' AND ca.DocumentCompleted = 1 AND NOT cc.ClaimWithdrawalId IS NULL THEN  1
					 ELSE 0 
				END				
		AND 1 = CASE WHEN ISNULL(@prKeyword,'') = '' THEN 1
					 WHEN ca.CustomerName LIKE '%' + @prKeyword + '%' 
						  OR ca.UserId LIKE '%' + @prKeyword + '%'
					      OR ca.ResidentialName LIKE '%' + @prKeyword + '%' THEN 1
					 ELSE 0
				END	


	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END