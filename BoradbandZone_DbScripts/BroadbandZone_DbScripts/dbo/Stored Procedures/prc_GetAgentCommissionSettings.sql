CREATE PROCEDURE [dbo].[prc_GetAgentCommissionSettings]
	@prAgentId INT,
	@prProductId INT
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID)

	BEGIN TRY
		SELECT ac.CategoryId,
			   pc.Category,
			   pc.DefaultCommission AS [SupCommission],
			   ac.AgentCommission AS [AgentCommissionPer]
		FROM AgentCommission ac
		INNER JOIN ProductCategory pc ON ac.CategoryId = pc.CategoryId
		WHERE pc.ProductId = @prProductId
		AND ac.AgentId = @prAgentId
		ORDER BY pc.Category
	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END