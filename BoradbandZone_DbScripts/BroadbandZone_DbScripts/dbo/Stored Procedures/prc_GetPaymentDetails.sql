
CREATE PROCEDURE [dbo].[prc_GetPaymentDetails]
	@prWithdrawalId INT
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID),
			@vPaymentItemsStr VARCHAR(MAX)

	DECLARE @vPaymentItems AS TABLE
	(
		ApplicationId INT,
		TransactionDetails VARCHAR(100),
		OrderNo VARCHAR(25),
		PackageName VARCHAR(150),
		[Date] VARCHAR(25),
		TransactionType VARCHAR(25),
		ClaimAmount MONEY
	)

	BEGIN TRY

		INSERT INTO @vPaymentItems
		SELECT 
			ca.ApplicationId,
			TransactionDetails = ca.CustomerName,
			OrderNo = CASE WHEN NOT ca.OrderNo IS NULL THEN ca.OrderNo  ELSE '' END,
			pp.PackageName,
			[Date] = FORMAT(ca.CreatedOn, 'MM/dd/yyyy'),	
			TransactionType = CASE WHEN NOT cc.ClaimWithdrawalId IS NULL AND cc.DeductedWithdrawalId IS NULL THEN 'Own Sales'
									WHEN NOT cc.ClaimWithdrawalId IS NULL AND NOT cc.DeductedWithdrawalId IS NULL THEN 'Clawback' 
									WHEN cc.IsOverride = 1 THEN 'Override' 
								END,
			ClaimAmount = CASE WHEN NOT cc.DeductedWithdrawalId IS NULL THEN - CAST(ROUND((cc.PackageCommOnDate * cc.AgentCommOnDate) * 1.0 / 100, 2) AS MONEY) 
				                ELSE CAST(ROUND((cc.PackageCommOnDate * cc.AgentCommOnDate) * 1.0 / 100, 2) AS MONEY)
							END
		FROM ClaimableCommission cc 
		INNER JOIN CustomerApplication ca ON ca.ApplicationId = cc.ApplicationId
		INNER JOIN ProductPackage pp ON ca.ProdPkgId = pp.ProdPkgId
		WHERE cc.ClaimWithdrawalId = @prWithdrawalId
		UNION ALL
		SELECT ApplicationId = '-',
			    TransactionDetails = ac.Description,
				OrderNo = '-',
				PackageName = '-',
				[Date] = FORMAT(ac.CreatedOn, 'MM/dd/yyyy'),
				TransactionType = 'Charges',
				ClaimAmount = ac.Amount * -1
		FROM AgentCharge ac
		WHERE ac.WithdrawalId = @prWithdrawalId
		

		SELECT @vPaymentItemsStr = (SELECT 
									  (SELECT p.ApplicationId AS 'td' FOR XML PATH(''), TYPE),
									  (SELECT p.TransactionDetails AS 'td' FOR XML PATH(''), TYPE),
									  (SELECT p.OrderNo AS 'td' FOR XML PATH(''), TYPE),
									  (SELECT p.PackageName AS 'td' FOR XML PATH(''), TYPE),									  
									  (SELECT p.Date AS 'td' FOR XML PATH(''), TYPE),
									  (SELECT p.TransactionType AS 'td' FOR XML PATH(''), TYPE),
									  (SELECT p.ClaimAmount AS 'td' FOR XML PATH(''), TYPE)
									  -- (SELECT p.DeductAmount AS 'td' FOR XML PATH(''), TYPE)
									FROM @vPaymentItems p
									FOR XML PATH('tr'))

		SELECT  SlipNo = RIGHT('0000' + CAST(w.WithdrawalId AS VARCHAR),6),
				a.AgentId,
				a.Fullname,
				a.Nric,
				a.BankName,
				a.BankAccNo,
				w.ReferenceNo,
				PaymentAmount = FORMAT(w.Amount, 'C', 'zh-MY') ,
				DeductAmount = FORMAT(ABS(c.TotalDeduction), 'C', 'zh-MY') ,
				PaymentDate = FORMAT(w.CreatedOn, 'dd/MM/yyyy'),
				PaymentItemsStr = @vPaymentItemsStr
				
		FROM Withdrawal w
		INNER JOIN Agent a ON w.Agent = a.UserLogin
		CROSS APPLY(
			SELECT TotalDeduction = SUM(ClaimAmount) FROM @vPaymentItems WHERE ClaimAmount < 0
		) c
		WHERE w.WithdrawalId = @prWithdrawalId

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END