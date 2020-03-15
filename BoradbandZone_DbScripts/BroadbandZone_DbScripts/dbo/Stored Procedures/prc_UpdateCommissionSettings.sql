
CREATE  PROCEDURE [dbo].[prc_UpdateCommissionSettings]
	@prAgentId INT,
	@prCommissionSetting udt_CommissionSetting READONLY,
	@prCreatedBy VARCHAR(50)
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID)
	DECLARE @vAgents TABLE
	(
		AgentId VARCHAR(10)
	)

	BEGIN TRY

		UPDATE ac
		SET ac.AgentCommission = cs.AgentCommissionPer,
			ac.SuperiorCommission = CASE WHEN a2.AgentId IS NULL THEN pc.CommissionPercent  -- when agent has no superior 
										 WHEN NOT ac.CommId IS NULL THEN ac2.AgentCommission - cs.AgentCommissionPer -- agent superior is active, get calculate the superior commision
										 ELSE 0 -- when agent superior is no longer active or superior deos not hv the commission setting created
								    END,
		    ac.ModifiedBy = @prCreatedBy,
			ac.ModifiedOn = GETDATE()
		FROM AgentCommission ac 
		INNER JOIN @prCommissionSetting cs ON ac.CategoryId = cs.CategoryId
		INNER JOIN ProductCategory pc ON cs.CategoryId = pc.CategoryId
		INNER JOIN Agent a1 ON a1.AgentId = ac.AgentId
		LEFT JOIN Agent a2 ON a1.SuperiorId = a2.AgentId AND a2.IsActive = 1
		LEFT JOIN AgentCommission ac2 ON ac2.AgentId = a2.AgentId AND cs.CategoryId = ac2.CategoryId
		WHERE ac.AgentId = @prAgentId

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END