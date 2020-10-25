CREATE PROCEDURE [dbo].[prc_ReportAgentWithdrawalDownload]
	@prApprovedFrom SMALLDATETIME = NULL,
	@prApprovedTo SMALLDATETIME = NULL
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID)

	BEGIN TRY

		SELECT w.WithdrawalId
			  ,Agent
			  ,WithdrawAmount
			  ,SubmittedOn = FORMAT(w.CreatedOn, 'dd/MM/yyyy')
			  ,ApprovedOn = FORMAT(w.CompletedOn, 'dd/MM/yyyy')
			  ,ApplicationId
			  ,TransactionDetails
			  ,PackageName
			  ,PackageComm
			  ,AgentComm
			  ,ClaimAmount
			  ,DeductAmount
			  ,TransactionType
			  ,TransactionDate
		FROM Withdrawal w
		INNER JOIN WithdrawalItems wi ON w.WithdrawalId = wi.WithdrawalId
		WHERE NOT w.CompletedOn IS NULL
		AND  1 = CASE WHEN @prApprovedFrom IS NULL AND @prApprovedTo IS NULL THEN 1
					  WHEN w.CompletedOn BETWEEN @prApprovedFrom AND @prApprovedTo THEN 1
					  ELSE 0
				 END
	
	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END