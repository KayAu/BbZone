
CREATE PROCEDURE [dbo].[prc_GetWithdrawalSubmittedForDownload]
	@prStatus VARCHAR(20),
	@prAgent NVARCHAR(16),
	@prSubmittedFrom SMALLDATETIME = NULL,
	@prSubmittedTo SMALLDATETIME = NULL,
	@prCompletedFrom SMALLDATETIME = NULL,
	@prCompletedTo SMALLDATETIME = NULL

AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID)

	BEGIN TRY

		SELECT w.WithdrawalId,			
				w.Agent,
				w.Amount,
				w.ReferenceNo,
				w.CreatedOn,
				w.Status,
				w.CompletedOn
		FROM Withdrawal w
		WHERE 1 = CASE WHEN ISNULL(@prStatus,'') = '' THEN 1
					   WHEN w.Status = @prStatus THEN 1
					   ELSE 0
				  END
		AND 1 = CASE WHEN ISNULL(@prAgent,'') = '' THEN 1
					 WHEN w.Agent = @prAgent THEN 1
					 ELSE 0
				END
	    AND 1 = CASE WHEN ISNULL(@prSubmittedFrom,'') = '' AND  ISNULL(@prSubmittedTo,'') = '' THEN 1
					 WHEN w.CreatedOn  BETWEEN @prSubmittedFrom AND @prSubmittedTo THEN 1
					 ELSE 0
				END
	    AND 1 = CASE WHEN ISNULL(@prCompletedFrom,'') = '' AND  ISNULL(@prCompletedTo,'') = '' THEN 1
					 WHEN w.CreatedOn  BETWEEN @prCompletedFrom AND @prCompletedTo THEN 1
					 ELSE 0
				END

		

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END