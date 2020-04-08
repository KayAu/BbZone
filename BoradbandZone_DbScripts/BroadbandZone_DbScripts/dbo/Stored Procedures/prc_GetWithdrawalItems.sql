
CREATE PROCEDURE [dbo].[prc_GetWithdrawalItems]
	@prWithdrawalId INT
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID)

	BEGIN TRY
		SELECT *
		FROM
		(
			SELECT 
				cc.ClaimCommId,
				TransactionDetails = ca.CustomerName,
				pp.PackageName,
				[Date] =FORMAT(ca.CreatedOn, 'MM/dd/yyyy'),
				cc.PackageCommOnDate,
				cc.AgentCommOnDate,
				ClaimAmount = CASE WHEN NOT cc.ClaimWithdrawalId IS NULL THEN  CAST(ROUND((cc.PackageCommOnDate * cc.AgentCommOnDate) * 1.0 / 100, 2) AS MONEY) ELSE NULL END,
				DeductAmount = CASE WHEN NOT cc.DeductedWithdrawalId IS NULL THEN CAST(ROUND((cc.PackageCommOnDate * cc.AgentCommOnDate) * 1.0 / 100, 2) AS MONEY) ELSE NULL END,
				TransactionType = CASE WHEN NOT cc.ClaimWithdrawalId IS NULL AND cc.DeductedWithdrawalId IS NULL THEN 'Own Sales'
									   WHEN NOT cc.ClaimWithdrawalId IS NULL AND NOT cc.DeductedWithdrawalId IS NULL THEN 'Clawback' 
									   WHEN cc.IsOverride = 1 THEN 'Override' 
								  END
			FROM ClaimableCommission cc 
			INNER JOIN CustomerApplication ca ON ca.ApplicationId = cc.ApplicationId
			INNER JOIN ProductPackage pp ON ca.ProdPkgId = pp.ProdPkgId
			WHERE cc.ClaimWithdrawalId = @prWithdrawalId
			OR cc.DeductedWithdrawalId = @prWithdrawalId
			UNION ALL
			SELECT NULL, 
				   TransactionDetails = ac.Description, 
				   NULL, 
				   [Date] = FORMAT(ac.CreatedOn, 'MM/dd/yyyy'), 
				   NULL, 
				   NULL, 
				   NULL, 
				   DeductAmount = ac.Amount,
				   'Purchase'
			FROM AgentCharge ac
			WHERE ac.WithdrawalId = @prWithdrawalId
		) a 
		ORDER BY [Date]

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END