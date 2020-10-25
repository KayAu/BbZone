CREATE PROCEDURE [dbo].[prc_ReportAgentWithdrawal]
	@prCurrentPage INT,
	@prPageSize INT,
	@prSortColumn VARCHAR(50),
	@prSortInAsc BIT,
	@prApprovedFrom SMALLDATETIME = NULL,
	@prApprovedTo SMALLDATETIME = NULL,
	@oTotalRecord INT OUTPUT
AS
BEGIN
	IF OBJECT_ID('tempdb..##temp_Table') IS NOT NULL DROP TABLE ##temp_Table

	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID),
			@vSelectQuery NVARCHAR(MAX),
			@vOrderByQuery NVARCHAR(MAX),
			@vWhereQuery NVARCHAR(MAX) = '',
	        @vFromRow VARCHAR(5),
			@vToRow VARCHAR(5)

	DECLARE @var_Table TABLE
	(
		[WithdrawalId] [int]  NOT NULL,
		[Agent] [nvarchar](16) NULL,
		[WithdrawAmount] [money] NULL,
		[SubmittedOn] [varchar](25) NULL,
		[ApprovedOn][varchar](25) NULL,
		[ApplicationId] [int] NULL,
		[TransactionDetails] [varchar](250) NULL,
		[PackageName] [varchar](150) NULL,
		[PackageComm] [money] NULL,
		[AgentComm] [smallint] NULL,
		[ClaimAmount] [money] NULL,
		[DeductAmount] [money] NULL,
		[TransactionType] [varchar](50) NULL,
		[TransactionDate] [varchar](12) NULL,
		RowNum INT
	)

	-- get row from and row to based on current page
	SELECT @vSelectQuery =  dbo.fn_GenerateDynamicQuery(@prCurrentPage, @prPageSize, @prSortColumn, @prSortInAsc)

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
		INTO ##temp_Table
		FROM Withdrawal w
		INNER JOIN WithdrawalItems wi ON w.WithdrawalId = wi.WithdrawalId
		WHERE NOT w.CompletedOn IS NULL
		AND  1 = CASE WHEN @prApprovedFrom IS NULL AND @prApprovedTo IS NULL THEN 1
					  WHEN w.CompletedOn BETWEEN @prApprovedFrom AND @prApprovedTo THEN 1
					  ELSE 0
				 END
		-- insert the dynamic query results into temp table
		INSERT INTO @var_Table
		EXEC SP_ExecuteSQL @vSelectQuery

		PRINT @vSelectQuery

		SELECT  WithdrawalId
			  ,Agent
			  ,WithdrawAmount
			  ,SubmittedOn
			  ,ApprovedOn
			  ,ApplicationId
			  ,TransactionDetails
			  ,PackageName
			  ,PackageComm
			  ,AgentComm
			  ,ClaimAmount
			  ,DeductAmount
			  ,TransactionType
			  ,TransactionDate
		FROM  @var_Table

		SELECT @oTotalRecord = COUNT(WithdrawalId) FROM ##temp_Table

		DROP TABLE  ##temp_Table

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END