CREATE PROCEDURE [dbo].[prc_GetWithdrawal]
	@prCurrentPage INT,
	@prPageSize INT,
	@prSortColumn VARCHAR(50),
	@prSortInAsc BIT,
	@prIsCompleted BIT,
	@prAgent VARCHAR(50) = '',
	@prSubmittedFrom SMALLDATETIME = NULL,
	@prSubmittedTo SMALLDATETIME = NULL,
	@prCompletedFrom SMALLDATETIME = NULL,
	@prCompletedTo SMALLDATETIME = NULL,
	@oTotalRecord INT OUTPUT

AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID),
			@vSelectQuery NVARCHAR(MAX)

	DECLARE @var_Table TABLE(
		WithdrawalId INT,
		Agent  VARCHAR(50),
		Amount MONEY,
		SubmittedOn SMALLDATETIME,
		GiroFee MONEY,
		IsCompleted BIT,
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
			w.Amount,
			w.CreatedOn,
			w.GiroFee,
			w.IsCompleted,
			w.CompletedOn,
			w.ReferenceNo
		INTO ##temp_Table
		FROM Withdrawal w
		WHERE 1 = CASE WHEN ISNULL(@prIsCompleted,0) = 0 THEN 1
					 WHEN w.IsCompleted = @prIsCompleted THEN 1
					 ELSE 0
				END
		AND 1 = CASE WHEN ISNULL(@prAgent,'') = '' THEN 1
					 WHEN w.Agent = @prAgent THEN 1
					 ELSE 0
				END
		PRINT @vSelectQuery
		-- insert the dynamic query results into temp table
		INSERT INTO @var_Table
		EXEC SP_ExecuteSQL @vSelectQuery



		SELECT WithdrawalId,
			   Agent,
			   Amount,
			   SubmittedOn = FORMAT(SubmittedOn, 'MM/dd/yyyy'),
			   GiroFee,
			   IsCompleted,
			   CompletedOn = FORMAT(CompletedOn, 'MM/dd/yyyy'),
			   ReferenceNo
		FROM  @var_Table

		SELECT @oTotalRecord = COUNT(WithdrawalId) FROM @var_Table

		DROP TABLE  ##temp_Table

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END