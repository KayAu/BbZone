CREATE PROCEDURE [dbo].[prc_GetProducts]
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
		ProductId INT,
		ProductName VARCHAR(150),
		IsActive BIT,
		CreatedOn SMALLDATETIME,
		CreatedBy VARCHAR(50),
		ModifiedOn SMALLDATETIME,
		ModifiedBy VARCHAR(50),
		RowNum INT
	)

	BEGIN TRY
		IF OBJECT_ID('tempdb..##temp_Table') IS NOT NULL DROP TABLE ##temp_Table

		SELECT @prSearchKeyword = LTRIM(RTRIM(@prSearchKeyword)) 

		-- get row from and row to based on current page
		SELECT @vSelectQuery =  dbo.fn_GenerateDynamicQuery(@prCurrentPage, @prPageSize, @prSortColumn, @prSortInAsc)

		SELECT *
		INTO ##temp_Table
		FROM Product
		WHERE 1 = CASE WHEN ISNULL(@prSearchKeyword,'') = ''  THEN 1
					   WHEN ProductName LIKE '%' + @prSearchKeyword + '%' THEN 1
					   ELSE 0
				  END
		AND 1 = CASE WHEN @prRecordStatus IS NULL THEN 1
					 WHEN ISNULL(IsActive,0) = @prRecordStatus THEN 1
					 ELSE 0
				END

		-- insert the dynamic query results into temp table
		INSERT INTO @var_Table
		EXEC SP_ExecuteSQL @vSelectQuery

		PRINT @vSelectQuery

		SELECT ProductId
			  ,ProductName
			  ,IsActive
			  ,CreatedOn = FORMAT(CreatedOn, 'MM/dd/yyyy') 
			  ,CreatedBy
			  ,ModifiedOn = FORMAT(ModifiedOn, 'MM/dd/yyyy') 
			  ,ModifiedBy
		FROM  @var_Table

		SELECT @oTotalRecord = COUNT(CreatedOn) FROM ##temp_Table

		DROP TABLE  ##temp_Table

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END