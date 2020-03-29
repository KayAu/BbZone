
CREATE VIEW [dbo].[vwWithdrawalItems]
AS
(
	SELECT  WithdrawalId,
			ClaimCommId,
			Agent,
			[Status],
			ClaimCommItemsId
	FROM
	(
		SELECT WithdrawalId,
			   ClaimCommId,
			   Agent,
			   [Status],
			   ClaimCommItemsId,
			   ROW_NUMBER() OVER (PARTITION BY ClaimCommId ORDER BY ModifiedOn DESC) As RowNo
		FROM Withdrawal
		CROSS APPLY (
			SELECT CAST(ExtractedText AS INT) AS ClaimCommId
			FROM [dbo].[fnSplit](ClaimCommItemsId, '|')
		) s
	) w
	WHERE w.RowNo = 1
)