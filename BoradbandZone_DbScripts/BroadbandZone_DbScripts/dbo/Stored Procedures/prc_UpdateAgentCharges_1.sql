
CREATE PROCEDURE [dbo].[prc_UpdateAgentCharges]
	@prAgent VARCHAR(25),
	@prWithdrawalId INT
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID)

	BEGIN TRY

		UPDATE ac
		SET ac.WithdrawalId = @prWithdrawalId
		FROM AgentCharge ac
		WHERE ac.Agent = @prAgent
		AND ISNULL(Cancelled, 0) = 0
		AND ac.WithdrawalId IS NULL

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END