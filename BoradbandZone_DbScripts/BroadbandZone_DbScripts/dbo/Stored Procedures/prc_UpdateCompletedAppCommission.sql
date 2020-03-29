
CREATE PROCEDURE [dbo].[prc_UpdateCompletedAppCommission]
	@prAppId INT,
	@prAgentId INT,
	@prCreatedBy VARCHAR(50)
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID),
	        @vCategoryId INT,
			@vPackageComm MONEY,
			@vIsCompleted BIT

	BEGIN TRY
	
		SELECT @vCategoryId = ca.CategoryId,
			   @vPackageComm = pp.Commission,
			   @vIsCompleted = CASE WHEN s.Status = 'Post Complete' THEN 1 ELSE 0 END
		FROM CustomerApplication ca
		INNER JOIN ProductPackage pp ON pp.ProdPkgId = ca.ProdPkgId
		INNER JOIN ApplicationStatus s ON s.AppStatusId = ca.AppStatusId
		WHERE ca.ApplicationId = @prAppId	
		
		IF @vIsCompleted = 1
		BEGIN	
			INSERT INTO ClaimableCommission
			SELECT @prAppId,
				   @prAgentId,
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
			AND ac.AgentId = @prAgentId
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
			FROM  [dbo].[fnGetMySuperiors](@prAgentId) a
			INNER JOIN AgentCommission ac ON ac.AgentId = a.AgentId and ac.CategoryId = @vCategoryId
			WHERE NOT a.SuperiorId IS NULL
		END

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END