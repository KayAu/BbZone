
CREATE PROCEDURE [dbo].[prc_GetWithdrawalSubmitted]
	@prCurrentPage INT,
	@prPageSize INT,
	@prSortColumn VARCHAR(50),
	@prSortInAsc BIT,
	@prStatus VARCHAR(20),
	@prAgent NVARCHAR(16),
	--@prSearchKeyword VARCHAR(150),
	@prSubmittedFrom SMALLDATETIME = NULL,
	@prSubmittedTo SMALLDATETIME = NULL,
	@prCompletedFrom SMALLDATETIME = NULL,
	@prCompletedTo SMALLDATETIME = NULL,
	@oTotalRecord INT OUTPUT,
	@oTotalAmountClaimed MONEY OUTPUT,
	@oTotalAmountPayout MONEY OUTPUT

AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID),
			@vSelectQuery NVARCHAR(MAX)

	DECLARE @var_Table TABLE(
		WithdrawalId INT,
		Agent NVARCHAR(50),
		Amount MONEY,
		SubmittedOn SMALLDATETIME,
		Status VARCHAR(20),
		CompletedOn SMALLDATETIME,
		ReferenceNo VARCHAR(25),
		RowNum INT
	)

	BEGIN TRY
		IF OBJECT_ID('tempdb..##temp_Table') IS NOT NULL DROP TABLE ##temp_Table

		-- get row from and row to based on current page
		SELECT @vSelectQuery =  dbo.fn_GenerateDynamicQuery(@prCurrentPage, @prPageSize, @prSortColumn, @prSortInAsc)

		SELECT w.WithdrawalId,			
				w.Agent,
				w.WithdrawAmount,
				w.CreatedOn,
				w.Status,
				w.CompletedOn,
				w.ReferenceNo
		INTO ##temp_Table
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

		PRINT @vSelectQuery
		-- insert the dynamic query results into temp table
		INSERT INTO @var_Table
		EXEC SP_ExecuteSQL @vSelectQuery

		SELECT 
			WithdrawalId,			
			Agent,
			Amount = FORMAT(Amount, 'C2', 'ms-MY'),
			SubmittedOn = FORMAT(SubmittedOn, 'MM/dd/yyyy'),
			Status,
			CompletedOn = FORMAT(CompletedOn, 'MM/dd/yyyy'),
			ReferenceNo
		FROM  @var_Table

		SELECT @oTotalRecord = COUNT(*) FROM ##temp_Table
		SELECT @oTotalAmountClaimed = CASE WHEN @oTotalRecord = 0 THEN 0 
										   ELSE (SELECT SUM(CASE WHEN Status <> 'Terminated' THEN WithdrawAmount ELSE 0 END) FROM ##temp_Table) END
		SELECT @oTotalAmountPayout = CASE WHEN @oTotalRecord = 0 THEN 0  
										  ELSE (SELECT SUM(CASE WHEN Status = 'Completed' THEN WithdrawAmount ELSE 0 END) FROM ##temp_Table) END

		DROP TABLE  ##temp_Table

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END