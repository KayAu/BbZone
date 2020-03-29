CREATE PROCEDURE [dbo].[prc_GetClawback]
	@prCurrentPage INT,
	@prPageSize INT,
	@prSortColumn VARCHAR(50),
	@prSortInAsc BIT,
	@prSearchKeyword VARCHAR(150) = '',
	@oTotalRecord INT OUTPUT

AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID),
			@vSelectQuery NVARCHAR(MAX)

	DECLARE @var_Table TABLE(
		ClawbackId INT NOT NULL,
		CustomerName NVARCHAR(50) NOT NULL,
		OrderNo VARCHAR(25) NOT NULL,
		Agent NVARCHAR(50) NOT NULL,
		Remarks VARCHAR(200) NOT NULL,
		CreatedOn SMALLDATETIME NOT NULL,
		Editable BIT NULL,
		RowNum INT
	)

	BEGIN TRY
		IF OBJECT_ID('tempdb..##temp_Table') IS NOT NULL DROP TABLE ##temp_Table

		SELECT @prSearchKeyword = LTRIM(RTRIM(@prSearchKeyword)) 

		-- get row from and row to based on current page
		SELECT @vSelectQuery =  dbo.fn_GenerateDynamicQuery(@prCurrentPage, @prPageSize, @prSortColumn, @prSortInAsc)

		SELECT DISTINCT c.ClawbackId,
					   ca.CustomerName,
					   ca.OrderNo,
					   ca.Agent,
					   c.Remarks,
					   c.CreatedOn,
					   Editable = 1 -- CASE WHEN NOT wi.WithdrawalId IS NULL THEN 1 ELSE 0 END
		INTO ##temp_Table
		FROM Clawback c
		INNER JOIN ClaimableCommission cc ON cc.ApplicationId = c.ApplicationId
		INNER JOIN CustomerApplication ca ON c.ApplicationId = ca.ApplicationId
		WHERE 1 = CASE WHEN ISNULL(@prSearchKeyword,'') = ''  THEN 1
					   WHEN ca.Agent LIKE '%' + @prSearchKeyword + '%' OR ca.CustomerName LIKE '%' + @prSearchKeyword + '%' THEN 1
					   WHEN ca.OrderNo LIKE '%' + @prSearchKeyword + '%' THEN 1
					   ELSE 0
				  END

		-- insert the dynamic query results into temp table
		INSERT INTO @var_Table
		EXEC SP_ExecuteSQL @vSelectQuery

		PRINT @vSelectQuery

		SELECT ClawbackId ,
			    CustomerName,
				OrderNo,
				Agent,
				Remarks,
				Editable
		FROM  @var_Table

		SELECT @oTotalRecord = COUNT(ClawbackId) FROM @var_Table

		DROP TABLE  ##temp_Table

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END