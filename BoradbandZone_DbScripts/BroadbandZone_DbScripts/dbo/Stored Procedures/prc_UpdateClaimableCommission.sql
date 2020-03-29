CREATE PROCEDURE [dbo].[prc_UpdateClaimableCommission]
	@prWithdrawalId INT,
	@prClaimableItemsId VARCHAR(MAX)
	
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID)
	DECLARE @vTblimCommId AS TABLE(
		ClaimCommId INT
	)
	BEGIN TRY
		INSERT INTO @vTblimCommId
		SELECT CAST(ExtractedText AS INT) 
		FROM [dbo].[fnSplit](@prClaimableItemsId, '|')

		-- Update ClaimWithdrawalId with the withdrawal id
		UPDATE cc
		SET cc.ClaimWithdrawalId = @prWithdrawalId
		FROM ClaimableCommission cc
		INNER JOIN @vTblimCommId t ON t.ClaimCommId = cc.ClaimCommId
		
		-- Update DeductedWithdrawalId with the withdrawal id 
		UPDATE cc
		SET cc.DeductedWithdrawalId = @prWithdrawalId,
		    cc.DeductedOn = GETDATE()
		FROM ClaimableCommission cc
		INNER JOIN @vTblimCommId t ON t.ClaimCommId = cc.ClaimCommId
		LEFT JOIN Clawback c ON c.ApplicationId = cc.ApplicationId
		WHERE NOT c.ClawbackId IS NULL AND cc.DeductedWithdrawalId IS NULL 

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END
