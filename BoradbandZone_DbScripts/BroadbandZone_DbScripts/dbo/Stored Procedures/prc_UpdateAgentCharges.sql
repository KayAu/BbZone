
CREATE PROCEDURE [dbo].[prc_UpdateAgentPocket]
	@prAgent VARCHAR(25),
	@prWithdrawalId INT
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID)

	BEGIN TRY

		UPDATE AgentPocket
		SET WithdrawalId = @prWithdrawalId
		FROM AgentPocket
		WHERE Agent = @prAgent
		AND ISNULL(Cancelled, 0) = 0
		AND WithdrawalId IS NULL

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END