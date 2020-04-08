CREATE PROCEDURE [dbo].[prc_FindCompletedApplication]
	@prSearchKeyword VARCHAR(100)

AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID)

	BEGIN TRY

		SELECT  ca.ApplicationId,
				ca.CustomerName,	   
				ca.OrderNo,
				pp.PackageName,
				pc.Category,
				p.ProductName
		FROM CustomerApplication ca
		INNER JOIN ProductPackage pp ON pp.ProdPkgId = ca.ProdPkgId
		INNER JOIN ProductCategory pc ON pc.CategoryId = pp.CategoryId
		INNER JOIN Product p ON p.ProductId = pc.ProductId
		INNER JOIN ApplicationStatus s ON s.AppStatusId = ca.AppStatusId
		WHERE s.Status = 'Post Complete'
		AND ca.CustomerName LIKE '%' + @prSearchKeyword + '%' 
	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END