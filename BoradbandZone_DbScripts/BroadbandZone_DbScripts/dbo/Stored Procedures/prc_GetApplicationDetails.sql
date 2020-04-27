CREATE PROCEDURE [dbo].[prc_GetApplicationDetails]
	@prAppId INT, 
	@prIsAdmin BIT
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID)


	BEGIN TRY
		SELECT ca.*
			  ,pc.Category 
			  ,pp.PackageName
			  ,ShowEForm = CAST(CASE WHEN p.ProductName = 'TM' THEN 1 ELSE 0 END AS BIT)
			  ,s.Status
			  ,AllowEdit = CAST( CASE WHEN @prIsAdmin = 1 THEN 1 ELSE s.AllowEdit END AS BIT)   --s.AllowEdit
			  ,CommIsConfigured = CAST(CASE WHEN NOT ac.CommId IS NULL THEN 1 ELSE 0 END AS BIT)
			  ,a.Email AS AgentEmail
	  FROM CustomerApplication ca
	  INNER JOIN ApplicationStatus s ON ca.AppStatusId = s.AppStatusId
	  INNER JOIN ProductCategory pc ON pc.CategoryId = ca.CategoryId
	  INNER JOIN ProductPackage pp ON pp.ProdPkgId = ca.ProdPkgId
	  INNER JOIN Product p ON pc.ProductId = p.ProductId
	  INNER JOIN Agent a ON a.UserLogin = ca.Agent 
	  LEFT JOIN AgentCommission ac ON ac.AgentId = a.AgentId AND ac.CategoryId = ca.CategoryId
	  WHERE ca.ApplicationId = @prAppId

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END