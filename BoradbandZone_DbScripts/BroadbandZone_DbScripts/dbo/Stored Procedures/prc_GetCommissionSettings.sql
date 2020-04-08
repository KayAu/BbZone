
CREATE  PROCEDURE [dbo].[prc_GetCommissionSettings]
	@prProductId INT,
	@prAgentAcc NVARCHAR(16) 

AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID),
	        @vIsAdmin BIT

	DECLARE @vCommissionSetting udt_CommissionSetting 

	BEGIN TRY
		IF EXISTS (SELECT 1 FROM AdminUser WHERE UserLogin = @prAgentAcc)
		SET @vIsAdmin = 1

		INSERT INTO @vCommissionSetting
		SELECT pc.CategoryId,
		pc.Category,
		ISNULL(ac.AgentCommission,0), --((ac.AgentCommission * 1.0) * pc.DefaultCommission)/100,
		0 
		FROM ProductCategory pc
		LEFT JOIN AgentCommission ac ON ac.CategoryId = pc.CategoryId  
		LEFT JOIN Agent a ON ac.AgentId = a.AgentId
		WHERE pc.ProductId = @prProductId
		AND pc.IsActive = 1
		AND 1 = CASE WHEN @vIsAdmin = 1 THEN 1
		             WHEN a.UserLogin = @prAgentAcc THEN 1
					 ELSE 0 
				END

		SELECT * FROM @vCommissionSetting
	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END