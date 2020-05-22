
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
		TransactionDate VARCHAR(25),
		TransactionType VARCHAR(25),
		ClaimAmount MONEY
	)

	BEGIN TRY

		INSERT INTO @vPaymentItems
		SELECT 
			wi.ApplicationId,
			wi.TransactionDetails,
			OrderNo = CASE WHEN NOT ca.OrderNo IS NULL THEN ca.OrderNo  ELSE '' END,
			wi.PackageName,
			wi.TransactionDate,	
			wi.TransactionType,
			ClaimAmount = CASE WHEN wi.TransactionType IN ('Own Sales', 'Override') THEN wi.ClaimAmount
				               ELSE wi.DeductAmount
						  END
		FROM WithdrawalItems wi
		LEFT JOIN CustomerApplication ca ON ca.ApplicationId = wi.ApplicationId
		WHERE wi.WithdrawalId = @prWithdrawalId

		SELECT @vPaymentItemsStr = (SELECT 
									  (SELECT p.ApplicationId AS 'td' FOR XML PATH(''), TYPE),
									  (SELECT p.TransactionDetails AS 'td' FOR XML PATH(''), TYPE),
									  (SELECT p.OrderNo AS 'td' FOR XML PATH(''), TYPE),
									  (SELECT p.PackageName AS 'td' FOR XML PATH(''), TYPE),									  
									  (SELECT p.TransactionDate AS 'td' FOR XML PATH(''), TYPE),
									  (SELECT p.TransactionType AS 'td' FOR XML PATH(''), TYPE),
									  (SELECT p.ClaimAmount AS 'td' FOR XML PATH(''), TYPE)
									  -- (SELECT p.DeductAmount AS 'td' FOR XML PATH(''), TYPE)
									FROM @vPaymentItems p
									FOR XML PATH('tr'))

		SELECT  SlipNo = RIGHT('0000' + CAST(w.WithdrawalId AS VARCHAR),6),
				a.AgentId,
				PayTo = CASE WHEN NOT  a.CompanyName IS NULL THEN  a.CompanyName ELSE a.Fullname END,
				a.Nric,
				a.BankName,
				a.BankAccNo,
				w.ReferenceNo,
				PaymentAmount = FORMAT(w.WithdrawAmount, 'C2', 'ms-MY') ,
				DeductAmount = FORMAT(w.Deduction, 'C2', 'ms-MY') ,
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