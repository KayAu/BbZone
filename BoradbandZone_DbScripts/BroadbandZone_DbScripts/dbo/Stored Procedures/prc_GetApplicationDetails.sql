CREATE PROCEDURE [dbo].[prc_GetApplicationDetails]
	@prAppId INT
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID)


	BEGIN TRY
		SELECT ca.*
			  ,pc.Category 
			  ,pp.PackageName
			  ,ShowEForm = CAST(CASE WHEN p.ProductName = 'TM' THEN 1 ELSE 0 END AS BIT)
	  FROM CustomerApplication ca
	  INNER JOIN ProductCategory pc ON pc.CategoryId = ca.CategoryId
	  INNER JOIN ProductPackage pp ON pp.ProdPkgId = ca.ProdPkgId
	  INNER JOIN Product p ON pc.ProductId = p.ProductId
	  WHERE ca.ApplicationId = @prAppId

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END