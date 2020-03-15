
CREATE  PROCEDURE [dbo].[prc_InsertCommissionSettings]
	@prAgents VARCHAR(MAX) ,
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
		INSERT INTO @vAgents
		SELECT * FROM [dbo].[fnSplit](@prAgents, ';');

		WITH cteAgentCommission
		AS
		(
			SELECT CAST(AgentId AS INT) AS AgentId,
				   s.CategoryId,
				   s.AgentCommissionPer
			FROM @vAgents
			CROSS APPLY
			(
				SELECT * 
				FROM  @prCommissionSetting
			) s
		)

		INSERT INTO AgentCommission
		SELECT t.AgentId
		      ,t.CategoryId
			  ,t.AgentCommissionPer
			  ,CASE WHEN a2.AgentId IS NULL THEN pc.CommissionPercent  -- when agent has no superior 
					WHEN NOT ac.CommId IS NULL THEN ac.AgentCommission - t.AgentCommissionPer -- agent superior is active, get calculate the superior commision
					ELSE 0 -- when agent superior is no longer active or superior deos not hv the commission setting created
			   END
			  ,GETDATE()
			  ,@prCreatedBy
			  ,GETDATE()
			  ,@prCreatedBy
		FROM cteAgentCommission t
		INNER JOIN ProductCategory pc ON t.CategoryId = pc.CategoryId
		INNER JOIN Agent a ON a.AgentId = t.AgentId
		LEFT JOIN Agent a2 ON a.SuperiorId = a2.AgentId AND a2.IsActive = 1
		LEFT JOIN AgentCommission ac ON ac.AgentId = a2.AgentId AND t.CategoryId = ac.CategoryId

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END