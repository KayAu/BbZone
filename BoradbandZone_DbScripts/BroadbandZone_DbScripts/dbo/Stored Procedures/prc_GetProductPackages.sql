CREATE PROCEDURE [dbo].[prc_GetProductPackages]
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
		ProdPkgId INT NOT NULL,
		CategoryId INT NOT NULL,
		Category VARCHAR(50),
		PackageName VARCHAR(150),
		Description VARCHAR(300),
		Commission MONEY  NOT NULL,
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

		SELECT pp.ProdPkgId
			  ,pp.CategoryId 
			  ,pc.Category
			  ,pp.PackageName
			  ,pp.Description
			  ,pp.Commission
			  ,pp.IsActive
			  ,pp.CreatedOn
			  ,pp.CreatedBy
			  ,pp.ModifiedOn
			  ,pp.ModifiedBy
		INTO ##temp_Table
		FROM ProductPackage pp
		INNER JOIN ProductCategory pc ON pp.CategoryId = pc.CategoryId
		WHERE 1 = CASE WHEN ISNULL(@prSearchKeyword,'') = ''  THEN 1
					   WHEN PackageName LIKE '%' + @prSearchKeyword + '%' OR
					        Description LIKE '%' + @prSearchKeyword + '%' THEN 1
					   ELSE 0
				  END
		AND 1 = CASE WHEN @prRecordStatus IS NULL THEN 1
					 WHEN @prRecordStatus = pp.IsActive THEN 1
					 ELSE 0
				END

		-- insert the dynamic query results into temp table
		INSERT INTO @var_Table
		EXEC SP_ExecuteSQL @vSelectQuery

		PRINT @vSelectQuery

		SELECT ProdPkgId
			  ,CategoryId = LTRIM(RTRIM(CAST(CategoryId AS CHAR(5))))
			  ,Category
			  ,PackageName
			  ,Description
			  ,Commission
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