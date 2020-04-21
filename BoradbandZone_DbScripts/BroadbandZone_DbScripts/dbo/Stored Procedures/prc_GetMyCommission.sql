CREATE PROCEDURE [dbo].[prc_GetMyCommission]
	@prProductId INT,
	@prAgentId INT 
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID),
	        @vIsAdmin BIT = 0,
			@vCols AS NVARCHAR(MAX),
			@query AS NVARCHAR(MAX);

	BEGIN TRY

		SELECT 
			 ac.CategoryId
			,pc.Category
			,ac.AgentCommission  AS [AgentCommissionPer]
			,CASE WHEN ac2.AgentCommission IS NULL THEN pc.CommissionPercent ELSE ac2.AgentCommission  END  AS [SupCommission]
		FROM AgentCommission ac
		INNER JOIN ProductCategory pc ON ac.CategoryId = pc.CategoryId
		INNER JOIN Agent a1 ON ac.AgentId = a1.AgentId
		LEFT JOIN AgentCommission ac2 ON ac2.AgentId = a1.SuperiorId AND ac2.CategoryId = ac.CategoryId
		WHERE pc.ProductId = @prProductId
		AND  a1.AgentId = @prAgentId 
		ORDER BY pc.Category

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END