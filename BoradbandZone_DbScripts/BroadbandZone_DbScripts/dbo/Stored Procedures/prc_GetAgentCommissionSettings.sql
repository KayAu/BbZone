CREATE PROCEDURE [dbo].[prc_GetAgentCommissionSettings]
	@prAgentId INT,
	@prProductId INT
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID)

	BEGIN TRY

		SELECT pc.CategoryId,
			   pc.Category,
			   ac.SuperiorCommission AS [SupCommission],
			   ac.AgentCommission AS [AgentCommissionPer]
		FROM ProductCategory pc 
		LEFT JOIN AgentCommission ac ON ac.CategoryId = pc.CategoryId AND ac.AgentId = @prAgentId
		WHERE pc.ProductId = @prProductId
		AND pc.IsActive = 1
		ORDER BY pc.Category

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END