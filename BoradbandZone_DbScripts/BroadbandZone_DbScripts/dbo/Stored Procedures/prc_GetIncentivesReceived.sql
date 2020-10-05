CREATE PROCEDURE [dbo].[prc_GetIncentivesReceived]
	@prCurrentPage INT,
	@prPageSize INT,
	@prSortColumn VARCHAR(50),
	@prSortInAsc BIT,
	@prProduct INT,
	@prProductCategory INT,
	@prProductPackage  INT,
	@prKeyword VARCHAR(50) = NULL,
	@prReceivedFrom SMALLDATETIME = NULL,
	@prReceivedUntil SMALLDATETIME = NULL,
	@prPaymentReceived BIT = NULL,
	@oTotalRecord INT OUTPUT

AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID),
			@vSelectQuery NVARCHAR(MAX)

	DECLARE @var_Table TABLE
	(
		IncPymntId INT,
		ApplicationId INT,
		CustomerName VARCHAR(100),
		OrderNo VARCHAR(25),
		PackageName VARCHAR(150),
		Category VARCHAR(50),
		ProductName VARCHAR(150),
		IncentiveAmt MONEY,
		IsActive BIT,
		CreatedOn SMALLDATETIME,
		CreatedBy VARCHAR(50),
		RowNum INT
	)

	BEGIN TRY
		IF OBJECT_ID('tempdb..##temp_Table') IS NOT NULL DROP TABLE ##temp_Table

		-- get row from and row to based on current page
		SELECT @vSelectQuery =  dbo.fn_GenerateDynamicQuery(@prCurrentPage, @prPageSize, @prSortColumn, @prSortInAsc)

		SELECT ir.IncPymntId,
			   ca.ApplicationId,
		       ca.CustomerName,
			   ca.OrderNo,
			   pp.PackageName,
			   pc.Category,
			   p.ProductName,
			   ir.IncentiveAmt,
			   ir.IsActive,
			   ir.CreatedOn,
			   ir.CreatedBy
		INTO ##temp_Table
		FROM CustomerApplication ca 
		LEFT JOIN ProductPackage pp ON pp.ProdPkgId = ca.ProdPkgId
		LEFT JOIN ProductCategory pc ON pc.CategoryId = pp.CategoryId
		LEFT JOIN Product p ON p.ProductId = pc.ProductId
		LEFT JOIN IncentiveReceived ir ON ir.ApplicationId = ca.ApplicationId		--FROM IncentiveReceived ir
		--INNER JOIN CustomerApplication ca ON ir.ApplicationId = ca.ApplicationId
		--INNER JOIN ProductPackage pp ON pp.ProdPkgId = ca.ProdPkgId
		--INNER JOIN ProductCategory pc ON pc.CategoryId = pp.CategoryId
		--INNER JOIN Product p ON p.ProductId = pc.ProductId
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
		AND 1 = CASE WHEN ISNULL(@prReceivedFrom,'') = '' OR ISNULL(@prReceivedUntil,'') = '' THEN 1
					 WHEN ir.CreatedOn BETWEEN @prReceivedFrom AND @prReceivedUntil THEN 1
					 ELSE 0
				END	
		AND 1 = CASE WHEN @prKeyword IS NULL OR @prKeyword = '' THEN 1
		             WHEN ca.CustomerName LIKE '%' + @prKeyword + '%' THEN 1
					 WHEN ca.OrderNo LIKE '%' + @prKeyword + '%'  THEN 1
					 ELSE 0
				END	
		AND 1 = CASE wHEN @prPaymentReceived IS NULL THEN 1
		             wHEN @prPaymentReceived = 1 AND NOT ir.IncPymntId IS NULL THEN 1
					 wHEN @prPaymentReceived = 0 AND ir.IncPymntId IS NULL THEN 1
					 ELSE 0 
				END
		AND 1 = CASE WHEN ir.IsActive IS NULL THEN 1
					 WHEN ir.IsActive = 1 THEN 1
					 ELSE 0
				END

		-- insert the dynamic query results into temp table
		INSERT INTO @var_Table
		EXEC SP_ExecuteSQL @vSelectQuery

		PRINT @vSelectQuery

		SELECT IncPymntId,
				ApplicationId,
				CustomerName,
				OrderNo,
				PackageName,
				Category,
				ProductName,
				IncentiveAmt,
				IsActive,
				CreatedOn = FORMAT(CreatedOn, 'MM/dd/yyyy'),
				CreatedBy
		FROM  @var_Table

		SELECT @oTotalRecord = COUNT(ApplicationId) FROM ##temp_Table

		DROP TABLE  ##temp_Table

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END