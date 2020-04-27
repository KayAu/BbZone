
CREATE PROCEDURE [dbo].[prc_TerminateWithdrawal]
	@prWithdrawalId INT,
	@prModifiedBy VARCHAR(50)
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID)

	BEGIN TRY
		
		UPDATE Withdrawal
		SET Status = 'Terminated',
			ModifiedBy = @prModifiedBy,
			ModifiedOn = GETDATE()
		WHERE WithdrawalId = @prWithdrawalId

		UPDATE AgentPocket
		SET WithdrawalId = NULL
		WHERE WithdrawalId = @prWithdrawalId

		UPDATE ClaimableCommission
		SET DeductedWithdrawalId = NULL
		WHERE DeductedWithdrawalId = @prWithdrawalId
		
		UPDATE ClaimableCommission
		SET ClaimWithdrawalId = NULL
		WHERE ClaimWithdrawalId = @prWithdrawalId
	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END