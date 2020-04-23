CREATE PROCEDURE [dbo].[prc_UpdateClaimableCommission]
	@prWithdrawalId INT
	--@prClaimableItemsId VARCHAR(MAX)
	
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID)

	BEGIN TRY
		UPDATE cc
		SET cc.ClaimWithdrawalId = CASE WHEN wi.TransactionType <> 'Clawback' THEN wi.WithdrawalId END,
	    	cc.DeductedWithdrawalId = CASE WHEN wi.TransactionType = 'Clawback' THEN wi.WithdrawalId END
		FROM ClaimableCommission cc
		INNER JOIN WithdrawalItems wi ON wi.ClaimCommId = cc.ClaimCommId
		WHERE wi.WithdrawalId = @prWithdrawalId
	
	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END
