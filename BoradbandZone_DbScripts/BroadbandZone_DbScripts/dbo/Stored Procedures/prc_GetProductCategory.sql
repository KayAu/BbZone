CREATE PROCEDURE [dbo].[prc_GetProductCategory]
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
		CategoryId INT NOT NULL,
		ProductId INT NOT NULL,
		ProductName VARCHAR(50),
		Category VARCHAR(50),
		CategoryType VARCHAR(25),
		CommissionPercent SMALLINT NOT NULL,
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

		SELECT CategoryId
		      ,p.ProductId
			  ,ProductName
			  ,Category
			  ,CategoryType
			  ,CommissionPercent
			  ,pc.IsActive
			  ,pc.CreatedOn 
			  ,pc.CreatedBy
			  ,pc.ModifiedOn
			  ,pc.ModifiedBy
		INTO ##temp_Table
		FROM ProductCategory pc 
		INNER JOIN Product p ON pc.ProductId = p.ProductId
		WHERE 1 = CASE WHEN ISNULL(@prSearchKeyword,'') = ''  THEN 1
					   WHEN Category LIKE @prSearchKeyword + '%' THEN 1
					   ELSE 0
				  END
		AND 1 = CASE WHEN @prRecordStatus IS NULL THEN 1
					 WHEN pc.IsActive = ISNULL(@prRecordStatus,0) THEN 1
					 ELSE 0
				END

		-- insert the dynamic query results into temp table
		INSERT INTO @var_Table
		EXEC SP_ExecuteSQL @vSelectQuery

		PRINT @vSelectQuery

		SELECT CategoryId
		      ,ProductId  = LTRIM(RTRIM(CAST(ProductId AS CHAR(5))))
			  ,ProductName
			  ,Category
			  ,CategoryType
			  ,CommissionPercent
			  ,IsActive
			  ,CreatedOn
			  ,CreatedBy
			  ,ModifiedOn
			  ,ModifiedBy
		FROM  @var_Table

		SELECT @oTotalRecord = COUNT(CategoryId) FROM ##temp_Table

		DROP TABLE  ##temp_Table

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END