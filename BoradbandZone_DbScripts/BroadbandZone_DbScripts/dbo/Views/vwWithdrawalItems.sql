

CREATE VIEW [dbo].[vwWithdrawalItems]
AS
(
	SELECT WithdrawalId,
	       ApplicationId,
		   Agent,
		   WithdrawalAppId
	FROM Withdrawal
	CROSS APPLY (
		SELECT ExtractedText AS WithdrawalAppId
		FROM [dbo].[fnSplit](ApplicationId, '|')
	) s

)