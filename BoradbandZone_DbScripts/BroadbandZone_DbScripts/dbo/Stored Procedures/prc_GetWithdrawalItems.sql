
CREATE PROCEDURE [dbo].[prc_GetWithdrawalItems]
	--@prStrApplicationId varchar(800),
	--@prAgent NVARCHAR(16)
	@prWithdrawalId INT
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID)

	BEGIN TRY
		

		SELECT 
			ca.ApplicationId,
			ca.CustomerName,
			pp.PackageName,
			pc.Category,
			ca.CreatedOn,
			(pp.Commission * ac.AgentCommission) * 1.0 / 100 AS ClaimAmount
		FROM vwWithdrawalItems wi 
		INNER JOIN CustomerApplication ca ON wi.WithdrawalAppId  = ca.ApplicationId
		INNER JOIN Agent a ON ca.Agent = a.UserLogin
		INNER JOIN AgentCommission ac ON ac.CategoryId = ca.CategoryId AND ac.AgentId = a.AgentId
		INNER JOIN ProductPackage pp ON ca.ProdPkgId = pp.ProdPkgId
		INNER JOIN ProductCategory pc ON pp.CategoryId = pc.CategoryId
	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END