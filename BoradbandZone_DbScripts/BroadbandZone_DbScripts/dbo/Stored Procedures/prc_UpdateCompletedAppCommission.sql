
CREATE PROCEDURE [dbo].[prc_UpdateCompletedAppCommission]
	@prAppId INT,
	@prAgentLogin VARCHAR(16),
	@prCreatedBy VARCHAR(50)
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID),
	        @vCategoryId INT,
			@vPackageComm MONEY,
			@vIsCompleted BIT,
			@vHasClaimExists BIT,
			@vAgentId INT

	BEGIN TRY
	
		SELECT @vCategoryId = ca.CategoryId,
			   @vPackageComm = pp.Commission,
			   @vIsCompleted = CASE WHEN s.Status = 'Post Complete' THEN 1 ELSE 0 END,
			   @vHasClaimExists =  CASE WHEN c.TotalClaimable > 0 THEN 1 ELSE 0 END,
			   @vAgentId = a.AgentId
		FROM CustomerApplication ca
		INNER JOIN ProductPackage pp ON pp.ProdPkgId = ca.ProdPkgId
		INNER JOIN ApplicationStatus s ON s.AppStatusId = ca.AppStatusId
		INNER JOIN Agent a ON a.UserLogin = ca.Agent
		CROSS APPLY (
			SELECT TotalClaimable = COUNT(ClaimCommId)  -- Check if the application has been updated as claimable before, this could happen when admin wrongfully update the status to Post Complete and revert to other status then
			FROM ClaimableCommission
			WHERE ApplicationId = ca.ApplicationId 
		) c
		WHERE ca.ApplicationId = @prAppId	

		IF @vIsCompleted = 1 
		BEGIN	
			IF @vHasClaimExists = 0
			BEGIN
				INSERT INTO ClaimableCommission
				SELECT @prAppId,
					   @vAgentId,
					   @vPackageComm,
					   ac.AgentCommission,
					   0,
					   NULL,
					   NULL,
					   NULL,
					   GETDATE(),
					   @prCreatedBy		    
				FROM AgentCommission ac
				WHERE ac.CategoryId = @vCategoryId
				AND ac.AgentId = @vAgentId
				UNION ALL
				SELECT @prAppId,
					   a.SuperiorId,
					   @vPackageComm,
					   ac.SuperiorCommission,
					   1,
						NULL,
					   NULL,
					   NULL,
					   GETDATE(),
					   @prCreatedBy		   
				FROM  [dbo].[fnGetMySuperiors](@vAgentId) a
				INNER JOIN AgentCommission ac ON ac.AgentId = a.AgentId and ac.CategoryId = @vCategoryId
				WHERE NOT a.SuperiorId IS NULL
			END

			UPDATE CustomerApplication
			SET ActivationDate = GETDATE()
			WHERE ApplicationId = @prAppId
		END

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END