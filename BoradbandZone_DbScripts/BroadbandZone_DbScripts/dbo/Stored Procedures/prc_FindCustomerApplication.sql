CREATE PROCEDURE [dbo].[prc_FindCustomerApplication]
	@prSearchKeyword VARCHAR(100)

AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID)


	BEGIN TRY

		SELECT DISTINCT ca.CustomerName,
					   ca.CustomerId,
					   ca.ApplicationId,
					   ca.OrderNo,
					   ca.Agent
		FROM CustomerApplication ca
		INNER JOIN ClaimableCommission cc ON ca.ApplicationId = cc.ApplicationId
		INNER JOIN Withdrawal w ON w.WithdrawalId = cc.ClaimWithdrawalId
		WHERE CustomerName LIKE '%' + @prSearchKeyword + '%' 
		AND NOT cc.ClaimWithdrawalId IS NULL
		AND cc.DeductedWithdrawalId IS NULL -- No clawback submitted yet

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END