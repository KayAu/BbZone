
CREATE  PROCEDURE [dbo].[prc_GetCommissionSettings]
	@prProductId INT,
	@prAgentAcc NVARCHAR(16) 

AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID)
	DECLARE @vCommissionSetting udt_CommissionSetting 

	BEGIN TRY
		
		INSERT INTO @vCommissionSetting
		SELECT pc.CategoryId,
		pc.Category,
		ac.AgentCommission, --((ac.AgentCommission * 1.0) * pc.DefaultCommission)/100,
		0 
		FROM ProductCategory pc
		LEFT JOIN AgentCommission ac ON ac.CategoryId = pc.CategoryId  
		LEFT JOIN Agent a ON ac.AgentId = a.AgentId
		WHERE pc.ProductId = @prProductId
		AND pc.IsActive = 1
		AND a.UserLogin = @prAgentAcc

		SELECT * FROM @vCommissionSetting
	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END