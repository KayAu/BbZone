CREATE PROCEDURE [dbo].[prc_GetCustomerOrder]
	@prCurrentPage INT,
	@prPageSize INT,
	@prSortColumn VARCHAR(50),
	@prSortInAsc BIT,
	@prProduct INT,
	@prProductCategory INT,
	@prProductPackage  INT,
	@prStatus INT,
	@prAgent VARCHAR(50) = '',
	@prSubmittedFrom SMALLDATETIME = NULL,
	@prSubmittedTo SMALLDATETIME = NULL,
	@oTotalRecord INT OUTPUT

AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID),
			@vSelectQuery NVARCHAR(MAX)

	DECLARE @var_Table TABLE(
		OrderId INT,
		CustomerName VARCHAR(100),
		PackageName VARCHAR(50),
		Category VARCHAR(50),
		OrderNo VARCHAR(25),
		Agent  VARCHAR(50),
		SubmittedOn SMALLDATETIME,
		OrderStatus  VARCHAR(50),
		RowNum INT
	)

	BEGIN TRY
		IF OBJECT_ID('tempdb..##temp_Table') IS NOT NULL DROP TABLE ##temp_Table

		-- get row from and row to based on current page
		SELECT @vSelectQuery =  dbo.fn_GenerateDynamicQuery(@prCurrentPage, @prPageSize, @prSortColumn, @prSortInAsc)

		SELECT co.OrderId,
			co.CustomerName,
			pp.PackageName,
			pc.Category,
			co.Agent,
			co.OrderNo,
			co.CreatedOn ,
			o.OrderStatus
		INTO ##temp_Table
		FROM CustomerOrder co
		INNER JOIN ProductPackage PP ON co.ProdPkgId = pp.ProdPkgId
		INNER JOIN ProductCategory PC ON pc.CategoryId = pp.CategoryId
		INNER JOIN Product p ON pc.ProductId = p.ProductId
		INNER JOIN OrderStatus o ON co.OrderStatusId = o.OrderStatusId
		WHERE 1 = CASE WHEN ISNULL(@prProduct,0) = 0 THEN 1
					   WHEN p.ProductId = @prProduct THEN 1
					   ELSE 0
				  END
		AND 1 = CASE WHEN ISNULL(@prProductCategory,0) = 0 THEN 1
					   WHEN Pc.CategoryId = @prProductCategory THEN 1
					   ELSE 0
				  END
		AND 1 = CASE WHEN ISNULL(@prProductPackage,0) = 0 THEN 1
					 WHEN PP.ProdPkgId = @prProductPackage THEN 1
					 ELSE 0
				END
		AND 1 = CASE WHEN ISNULL(@prStatus,0) = 0 THEN 1
					 WHEN o.OrderStatusId = @prStatus THEN 1
					 ELSE 0
				END
		AND 1 = CASE WHEN ISNULL(@prAgent,'') = '' THEN 1
					 WHEN co.Agent = @prAgent THEN 1
					 ELSE 0
				END

		-- insert the dynamic query results into temp table
		INSERT INTO @var_Table
		EXEC SP_ExecuteSQL @vSelectQuery

		PRINT @vSelectQuery

		SELECT OrderId,
			   CustomerName,
				PackageName,
				Category,
				OrderNo,
				Agent,
				SubmittedOn  = FORMAT(SubmittedOn, 'MM/dd/yyyy'),
				OrderStatus 
		FROM  @var_Table

		SELECT @oTotalRecord = COUNT(OrderId) FROM ##temp_Table

		DROP TABLE  ##temp_Table

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END