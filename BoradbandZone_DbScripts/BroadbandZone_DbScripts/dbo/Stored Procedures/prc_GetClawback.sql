CREATE PROCEDURE [dbo].[prc_GetClawback]
	@prCurrentPage INT,
	@prPageSize INT,
	@prSortColumn VARCHAR(50),
	@prSortInAsc BIT,
	@prSearchKeyword VARCHAR(150) = '',
	@prIsDeducted BIT,
	@prAgentId INT,
	@prIsAdmin BIT,
	@oTotalRecord INT OUTPUT

AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID),
			@vSelectQuery NVARCHAR(MAX)

	DECLARE @var_Table TABLE(
		ClawbackId INT NOT NULL,
		ApplicationId INT NOT NULL,
		CustomerName NVARCHAR(50) NOT NULL,
		OrderNo VARCHAR(25)  NULL,
		Agent NVARCHAR(50) NOT NULL,
		TransactionType  NVARCHAR(25) NOT NULL,
		Remarks VARCHAR(200) NOT NULL,
		DeductAmount MONEY,
		IsDeducted BIT,
		DeductedOn SMALLDATETIME NULL,
		Cancelled BIT,
		CreatedOn SMALLDATETIME NOT NULL,
		CreatedBy VARCHAR(50) NOT NULL,
		ModifiedOn SMALLDATETIME NOT NULL,
		ModifiedBy VARCHAR(50) NOT NULL,
		Editable BIT NULL,
		RowNum INT
	)

	BEGIN TRY
		IF OBJECT_ID('tempdb..##temp_Table') IS NOT NULL DROP TABLE ##temp_Table

		SELECT @prSearchKeyword = LTRIM(RTRIM(@prSearchKeyword)) 

		-- get row from and row to based on current page
		SELECT @vSelectQuery =  dbo.fn_GenerateDynamicQuery(@prCurrentPage, @prPageSize, @prSortColumn, @prSortInAsc)

		SELECT DISTINCT c.ClawbackId,
					   ca.ApplicationId,
					   ca.CustomerName,
					   ca.OrderNo,
					   a.UserLogin,
					   TransactionType = CASE WHEN cc.IsOverride = 1 THEN 'Override' ELSE 'Own Sales' END,
					   c.Remarks,
					   wi.DeductAmount,
					   IsDeducted = CASE WHEN NOT wi.WithdrawalItemId IS NULL THEN 1 ELSE 0 END,
					   DeductedOn = wi.TransactionDate,
					   c.Cancelled,
					   c.CreatedOn,
					   c.CreatedBy,
					   c.ModifiedOn,
					   c.ModifiedBy,
					   Editable = CASE WHEN wi.WithdrawalItemId IS NULL THEN 1 
									   WHEN c.Cancelled IS NULL THEN 1 
									   ELSE 0 
								  END
		INTO ##temp_Table
		FROM Clawback c
		INNER JOIN ClaimableCommission cc ON cc.ApplicationId = c.ApplicationId
		INNER JOIN Agent a ON cc.AgentId = a.AgentId
		INNER JOIN CustomerApplication ca ON c.ApplicationId = ca.ApplicationId
		LEFT JOIN WithdrawalItems wi ON cc.ClaimCommId = wi.ClaimCommId AND wi.TransactionType = 'Clawback'
		WHERE 1 = CASE WHEN @prIsAdmin = 1 THEN 1
					   WHEN @prIsAdmin = 0 AND cc.AgentId = @prAgentId THEN 1
					   ELSE 0
				  END
		AND 1 = CASE WHEN @prIsDeducted IS NULL THEN 1
					 WHEN @prIsDeducted = 1 AND NOT wi.WithdrawalItemId IS NULL  AND wi.TransactionType = 'Clawback' THEN 1
					 WHEN @prIsDeducted = 0 AND wi.WithdrawalItemId IS NULL THEN 1
					 ELSE 0
				END
		AND 1 = CASE WHEN ISNULL(@prSearchKeyword,'') = ''  THEN 1
					WHEN a.UserLogin LIKE '%' + @prSearchKeyword + '%' OR ca.CustomerName LIKE '%' + @prSearchKeyword + '%' THEN 1
					WHEN ca.OrderNo LIKE '%' + @prSearchKeyword + '%' THEN 1
					ELSE 0
				END
         
		-- insert the dynamic query results into temp table
		INSERT INTO @var_Table
		EXEC SP_ExecuteSQL @vSelectQuery

		PRINT @vSelectQuery

		SELECT ClawbackId ,
				ApplicationId,
			    CustomerName,
				OrderNo,
				Agent,
				TransactionType,
				Remarks,
				DeductAmount = FORMAT(DeductAmount, 'C', 'ms-MY'),
				IsDeducted,
				DeductedOn = FORMAT(DeductedOn, 'MM/dd/yyyy') ,
				Cancelled,
				CreatedOn,
				CreatedBy,
				ModifiedOn,
				ModifiedBy,
				Editable
		FROM  @var_Table

		SELECT @oTotalRecord = COUNT(ClawbackId) FROM ##temp_Table

		DROP TABLE  ##temp_Table

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END