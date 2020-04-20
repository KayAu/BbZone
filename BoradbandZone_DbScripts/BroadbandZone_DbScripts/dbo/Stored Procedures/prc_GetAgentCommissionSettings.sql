CREATE PROCEDURE [dbo].[prc_GetAgentCommissionSettings]
	@prAgentId INT,
	@prProductId INT
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID)

	BEGIN TRY

		SELECT pc.CategoryId,
			   pc.Category,
			   ac2.AgentCommission AS [SupCommission],
			   ac1.AgentCommission AS [AgentCommissionPer]
		FROM ProductCategory pc 
		LEFT JOIN AgentCommission ac1 ON ac1.CategoryId = pc.CategoryId AND ac1.AgentId = @prAgentId
		LEFT JOIN Agent a ON ac1.AgentId = a.agentId
		LEFT JOIN AgentCommission ac2 ON ac2.CategoryId = ac1.CategoryId AND ac2.AgentId = a.SuperiorId
		WHERE pc.ProductId = @prProductId
		AND pc.IsActive = 1
		ORDER BY pc.Category

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END