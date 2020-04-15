
CREATE  PROCEDURE [dbo].[prc_GetCommissionSettings]
	@prProductId INT,
	@prAgentAcc NVARCHAR(16) 

AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID),
	        @vIsAdmin BIT,
			@vUserId INT

	DECLARE @vCommissionSetting udt_CommissionSetting 

	BEGIN TRY
		IF EXISTS (SELECT 1 FROM AdminUser WHERE UserLogin = @prAgentAcc)
		SET @vIsAdmin = 1

		IF @vIsAdmin = 1
		BEGIN
			INSERT INTO @vCommissionSetting
			SELECT  ap.CategoryId,
					ap.Category,
					ap.CommissionPercent, 
					0 
			FROM Agent a
			CROSS APPLY ( SELECT a.AgentId, pc.CategoryId, pc.Category, pc.CommissionPercent
						  FROM ProductCategory pc 
						  WHERE pc.ProductId = @prProductId
						  AND pc.IsActive = 1
						) ap
			LEFT JOIN AgentCommission ac ON ac.AgentId = ap.AgentId AND ac.CategoryId = ap.CategoryId
			WHERE a.SuperiorId IS NULL
			AND ac.CommId IS NULL
			GROUP BY ap.CategoryId,
					 ap.Category,
					 ap.CommissionPercent
		END
		ELSE
		BEGIN
			INSERT INTO @vCommissionSetting
			SELECT  ap.CategoryId,
					ap.Category,
					ap.CommissionPercent, 
					0 
			FROM Agent a1
			INNER JOIN Agent a2 ON a1.SuperiorId = a2.AgentId
			CROSS APPLY ( SELECT a1.AgentId, pc.CategoryId, pc.Category, pc.CommissionPercent
						  FROM ProductCategory pc 
						  WHERE pc.ProductId = @prProductId
						  AND pc.IsActive = 1
						) ap
			LEFT JOIN AgentCommission ac ON ac.AgentId = ap.AgentId AND ac.CategoryId = ap.CategoryId
			WHERE  a2.UserLogin = @prAgentAcc 
			AND ac.CommId IS NULL
			GROUP BY ap.CategoryId,
					 ap.Category,
					 ap.CommissionPercent 
		END

		SELECT * FROM @vCommissionSetting
	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END