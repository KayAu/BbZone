
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
		,cteAgentSuperiorCommission
		AS
		(
			SELECT t.AgentId
				  ,t.CategoryId
				  ,t.AgentCommissionPer
				  ,SuperiorCommission = CASE WHEN a2.AgentId IS NULL THEN pc.CommissionPercent  -- when agent has no superior 
											 WHEN NOT ac1.CommId IS NULL THEN ac1.AgentCommission - t.AgentCommissionPer -- agent superior is active, get calculate the superior commision
											 ELSE 0 -- when agent superior is no longer active or superior deos not hv the commission setting created
									    END
				  ,CommId = ISNULL(ac2.CommId,0)
			FROM cteAgentCommission t
			INNER JOIN ProductCategory pc ON t.CategoryId = pc.CategoryId
			INNER JOIN Agent a ON a.AgentId = t.AgentId
			LEFT JOIN Agent a2 ON a.SuperiorId = a2.AgentId AND a2.IsActive = 1
			LEFT JOIN AgentCommission ac1 ON ac1.AgentId = a2.AgentId AND t.CategoryId = ac1.CategoryId
			LEFT JOIN AgentCommission ac2 ON t.AgentId = ac2.AgentId AND ac2.CategoryId = t.CategoryId
		)

		MERGE AgentCommission ac USING cteAgentSuperiorCommission s ON  (ac.CommId = s.CommId)
		WHEN NOT MATCHED BY TARGET
		THEN INSERT (AgentId
				   ,CategoryId
				   ,AgentCommission
				   ,SuperiorCommission
				   ,CreatedOn
				   ,CreatedBy
				   ,ModifiedOn
				   ,ModifiedBy)
		   VALUES (
					AgentId
					,CategoryId
					,AgentCommissionPer
					,SuperiorCommission
					,GETDATE()
					,@prCreatedBy
					,GETDATE()
					,@prCreatedBy);

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END