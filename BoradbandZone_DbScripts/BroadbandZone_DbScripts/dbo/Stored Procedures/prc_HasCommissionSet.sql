
CREATE PROCEDURE [dbo].[prc_HasCommissionSet]
	@prCategoryId INT, 
	@prAgent VARCHAR(20)
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID),
			@vIsConfigured BIT = 0


	BEGIN TRY

		IF EXISTS (SELECT 1 
					FROM AgentCommission ac
					INNER JOIN Agent a ON ac.AgentId = a.AgentId
					WHERE a.UserLogin = @prAgent
					AND ac.CategoryId = @prCategoryId)
			SET @vIsConfigured = 1 

		SELECT IsConfigured =  @vIsConfigured
	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END