
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

		IF @vIsAdmin = 1
		BEGIN
			INSERT INTO @vCommissionSetting
			SELECT pc.CategoryId,
					pc.Category,
					pc.CommissionPercent, 
					0 
			FROM ProductCategory pc
			WHERE pc.ProductId = @prProductId
			AND pc.IsActive = 1
		END
		ELSE
		BEGIN
			INSERT INTO @vCommissionSetting
			SELECT pc.CategoryId,
				   pc.Category,
				   ISNULL(ac.AgentCommission, 0), 
				   0 
			FROM ProductCategory pc
			LEFT JOIN AgentCommission ac ON ac.CategoryId = pc.CategoryId  
			LEFT JOIN Agent a ON ac.AgentId = a.AgentId
			WHERE pc.ProductId = @prProductId
			AND pc.IsActive = 1
			AND a.UserLogin = @prAgentAcc 
		END

		--INSERT INTO @vCommissionSetting
		--SELECT pc.CategoryId,
		--	pc.Category,
		--	ISNULL(ac.AgentCommission,pc.CommissionPercent), 
		--	0 
		--FROM ProductCategory pc
		--LEFT JOIN AgentCommission ac ON ac.CategoryId = pc.CategoryId  
		--LEFT JOIN Agent a ON ac.AgentId = a.AgentId
		--WHERE pc.ProductId = @prProductId
		--AND pc.IsActive = 1
		--AND 1 = CASE WHEN @vIsAdmin = 1 AND a.SuperiorId IS NULL THEN 1
		--             WHEN a.UserLogin = @prAgentAcc THEN 1
		--			 ELSE 0 
		--		END

		SELECT * FROM @vCommissionSetting
	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END