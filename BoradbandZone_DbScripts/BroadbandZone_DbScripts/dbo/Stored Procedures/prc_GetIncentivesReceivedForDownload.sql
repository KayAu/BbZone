CREATE PROCEDURE [dbo].[prc_GetIncentivesReceivedForDownload]
	@prProduct INT,
	@prProductCategory INT,
	@prProductPackage  INT,
	@prKeyword VARCHAR(50) = NULL,
	@prReceivedFrom SMALLDATETIME = NULL,
	@prReceivedUntil SMALLDATETIME = NULL

AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID)


	BEGIN TRY

		SELECT ir.IncPymntId,
			   ir.ApplicationId,
		       ca.CustomerName,
			   ca.OrderNo,
			   pp.PackageName,
			   pc.Category,
			   p.ProductName,
			   ir.IncentiveAmt,
			   ir.IsActive,
			   ir.CreatedOn,
			   ir.CreatedBy
		FROM IncentiveReceived ir
		INNER JOIN CustomerApplication ca ON ir.ApplicationId = ca.ApplicationId
		INNER JOIN ProductPackage pp ON pp.ProdPkgId = ca.ProdPkgId
		INNER JOIN ProductCategory pc ON pc.CategoryId = pp.CategoryId
		INNER JOIN Product p ON p.ProductId = pc.ProductId
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
		AND ir.IsActive = 1

	

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END