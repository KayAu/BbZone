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
		IF OBJECT_ID('tempdb..##temp_AgentComm') IS NOT NULL DROP TABLE ##temp_AgentComm

		SELECT 
			 ac.CategoryId
			,pc.Category
			,ac.AgentCommission  AS [AgentCommissionPer]
		FROM AgentCommission ac
		INNER JOIN ProductCategory pc ON ac.CategoryId = pc.CategoryId
		INNER JOIN Agent a1 ON ac.AgentId = a1.AgentId
		WHERE pc.ProductId = @prProductId
		AND  a1.AgentId = @prAgentId 
		ORDER BY pc.Category

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END