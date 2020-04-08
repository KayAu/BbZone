
CREATE PROCEDURE [dbo].[prc_GetPaymentDetails]
	--@prStrApplicationId varchar(800),
	--@prAgent NVARCHAR(16)
	@prWithdrawalId INT
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID),
			@vPaymentItemsStr VARCHAR(MAX)

	BEGIN TRY

		WITH cteTable
		AS
		(
			--SELECT 
			--	ca.ApplicationId,
			--	ca.CustomerName ,				
			--	pp.PackageName,
			--	pc.Category,
			--	ca.OrderNo,
			--	[Date] = FORMAT(ca.CreatedOn, 'MM/dd/yyyy'),
			--	CommRate = AgentCommission,
			--	(pp.Commission * ac.AgentCommission) * 1.0 / 100 AS Amount
			--FROM vwWithdrawalItems wi 
			--INNER JOIN CustomerApplication ca ON wi.WithdrawalId  = ca.ApplicationId
			--INNER JOIN Agent a ON ca.Agent = a.UserLogin
			--INNER JOIN AgentCommission ac ON ac.CategoryId = ca.CategoryId AND ac.AgentId = a.AgentId
			--INNER JOIN ProductPackage pp ON ca.ProdPkgId = pp.ProdPkgId
			--INNER JOIN ProductCategory pc ON pp.CategoryId = pc.CategoryId
			--WHERE wi.WithdrawalId = @prWithdrawalId 
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
				ClaimAmount =  CAST(ROUND((cc.PackageCommOnDate * cc.AgentCommOnDate) * 1.0 / 100, 2) AS MONEY)
				--DeductAmount = CASE WHEN NOT cc.DeductedWithdrawalId IS NULL THEN CAST(ROUND((cc.PackageCommOnDate * cc.AgentCommOnDate) * 1.0 / 100, 2) AS MONEY) ELSE '-' END
			FROM ClaimableCommission cc 
			INNER JOIN CustomerApplication ca ON ca.ApplicationId = cc.ApplicationId
			INNER JOIN ProductPackage pp ON ca.ProdPkgId = pp.ProdPkgId
			WHERE cc.ClaimWithdrawalId = @prWithdrawalId
			AND cc.DeductedWithdrawalId IS NULL
			--OR cc.DeductedWithdrawalId = @prWithdrawalId
			--UNION ALL
			--SELECT ApplicationId = '', 
			--	   TransactionDetails = ac.Description, 
			--	   OrderNo = '', 
			--	   PackageName = '', 
			--	   [Date] = FORMAT(ac.CreatedOn, 'MM/dd/yyyy'), 
			--	   TransactionType = 'Purchase',
			--	   ClaimAmount = '-', 
			--	   DeductAmount = CAST(ROUND(ac.Amount, 2) AS MONEY)
			--FROM AgentCharge ac
			--WHERE ac.WithdrawalId = @prWithdrawalId
		)

		SELECT @vPaymentItemsStr = (SELECT 
									  (SELECT p.ApplicationId AS 'td' FOR XML PATH(''), TYPE),
									  (SELECT p.TransactionDetails AS 'td' FOR XML PATH(''), TYPE),
									  (SELECT p.OrderNo AS 'td' FOR XML PATH(''), TYPE),
									  (SELECT p.PackageName AS 'td' FOR XML PATH(''), TYPE),									  
									  (SELECT p.Date AS 'td' FOR XML PATH(''), TYPE),
									  (SELECT p.TransactionType AS 'td' FOR XML PATH(''), TYPE),
									  (SELECT p.ClaimAmount AS 'td' FOR XML PATH(''), TYPE)
									  -- (SELECT p.DeductAmount AS 'td' FOR XML PATH(''), TYPE)
									FROM cteTable p
									FOR XML PATH('tr'))

		SELECT  SlipNo = RIGHT('0000' + CAST(w.WithdrawalId AS VARCHAR),6),
				a.AgentId,
				a.Fullname,
				a.Nric,
				a.BankName,
				a.BankAccNo,
				w.ReferenceNo,
				PaymentAmount = FORMAT(w.Amount, 'C', 'zh-MY') ,
				PaymentDate = FORMAT(w.CreatedOn, 'dd/MM/yyyy'),
				PaymentItemsStr = @vPaymentItemsStr
		FROM Withdrawal w
		INNER JOIN Agent a ON w.Agent = a.UserLogin
		WHERE w.WithdrawalId = @prWithdrawalId

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END