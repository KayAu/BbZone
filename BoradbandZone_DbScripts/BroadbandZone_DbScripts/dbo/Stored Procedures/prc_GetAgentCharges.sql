﻿CREATE PROCEDURE [dbo].[prc_GetAgentCharges]
	@prCurrentPage INT,
	@prPageSize INT,
	@prSortColumn VARCHAR(50),
	@prSortInAsc BIT,
	@prSearchKeyword VARCHAR(150) = '',
	@prRecordStatus BIT,
	@oTotalRecord INT OUTPUT

AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID),
			@vSelectQuery NVARCHAR(MAX)

	DECLARE @var_Table TABLE(
		ChargeId INT NOT NULL,
		Agent NVARCHAR(16) NOT NULL,
		Amount MONEY NOT NULL,
		Description VARCHAR(250) NOT NULL,
		WithdrawalId INT NULL,
		Cancelled BIT NULL,
		CreatedOn SMALLDATETIME NOT NULL,
		CreatedBy VARCHAR(50) NOT NULL,
		ModifiedOn SMALLDATETIME NOT NULL,
		ModifiedBy VARCHAR(50) NOT NULL,
		RowNum INT
	)

	BEGIN TRY
		IF OBJECT_ID('tempdb..##temp_Table') IS NOT NULL DROP TABLE ##temp_Table

		SELECT @prSearchKeyword = LTRIM(RTRIM(@prSearchKeyword)) 

		-- get row from and row to based on current page
		SELECT @vSelectQuery =  dbo.fn_GenerateDynamicQuery(@prCurrentPage, @prPageSize, @prSortColumn, @prSortInAsc)

		SELECT *
		INTO ##temp_Table
		FROM AgentCharge ac 
		WHERE 1 = CASE WHEN ISNULL(@prSearchKeyword,'') = ''  THEN 1
					   WHEN Agent LIKE '%' +@prSearchKeyword + '%'  OR Description LIKE '%' +@prSearchKeyword + '%' THEN 1
					   ELSE 0
				  END
		AND 1 = CASE WHEN @prRecordStatus IS NULL THEN 1
					 WHEN @prRecordStatus = 1 AND ISNULL(ac.Cancelled,0) = 0 THEN 1
					 WHEN @prRecordStatus = 0 AND ac.Cancelled = 1 THEN 1
					 ELSE 0
				END

		-- insert the dynamic query results into temp table
		INSERT INTO @var_Table
		EXEC SP_ExecuteSQL @vSelectQuery

		PRINT @vSelectQuery

		SELECT  ChargeId
				,Agent
				,Amount
				,Description
				,WithdrawalId
				,Cancelled
				,CreatedOn
				,CreatedBy
				,ModifiedOn
				,ModifiedBy
		FROM  @var_Table

		SELECT @oTotalRecord = COUNT(ChargeId) FROM @var_Table

		DROP TABLE  ##temp_Table

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END