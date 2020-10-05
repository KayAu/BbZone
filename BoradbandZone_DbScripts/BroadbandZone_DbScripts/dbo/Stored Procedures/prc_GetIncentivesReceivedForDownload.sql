CREATE PROCEDURE [dbo].[prc_GetIncentivesReceivedForDownload]
	@prProduct INT,
	@prProductCategory INT,
	@prProductPackage  INT,
	@prKeyword VARCHAR(50) = NULL,
	@prReceivedFrom SMALLDATETIME = NULL,
	@prReceivedUntil SMALLDATETIME = NULL,
	@prPaymentReceived BIT = NULL
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID)


	BEGIN TRY

		SELECT ca.ApplicationId,
		       ca.CustomerName,
			   ca.OrderNo,
			   pp.PackageName,
			   pc.Category,
			   p.ProductName,
			   ir.IncentiveAmt,
			   ir.IncPymntId,
			   --ir.IsActive,
			   ir.CreatedOn,
			   ir.CreatedBy
		FROM CustomerApplication ca 
		LEFT JOIN ProductPackage pp ON pp.ProdPkgId = ca.ProdPkgId
		LEFT JOIN ProductCategory pc ON pc.CategoryId = pp.CategoryId
		LEFT JOIN Product p ON p.ProductId = pc.ProductId
		LEFT JOIN IncentiveReceived ir ON ir.ApplicationId = ca.ApplicationId
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
		 ORDER BY ca.CustomerName

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END