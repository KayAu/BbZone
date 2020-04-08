CREATE PROCEDURE [dbo].[prc_GetMyAgentsForCommissionSetting]
	@prSuperiorId INT = NULL,
	@prProductID INT,
	@oAllowCommConfig BIT OUTPUT
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID)

	BEGIN TRY
		SET @oAllowCommConfig = 0

	    -- check if this agent already has his commission setup for the product selected. 
		-- If the agent does not have his commission set up for this product, he is not allow to set commissions for his subordinates
		IF NOT @prSuperiorId IS NULL
		BEGIN
			IF EXISTS (SELECT  1
						FROM AgentCommission ac 
						LEFT JOIN ProductCategory pc ON ac.CategoryId = pc.CategoryId 
						WHERE ac.AgentId = @prSuperiorId
						AND pc.ProductId = @prProductID)
			SET @oAllowCommConfig = 1
		END
		ELSE
			SET @oAllowCommConfig = 1
		-- get the list of subordinates who do not have their commission set up yet for the selected product  
		SELECT a1.AgentId AS [DisplayValue] 
			  ,a1.Fullname AS [DisplayText]
			  ,CAST(0 AS BIT) AS Selected
		FROM Agent a1
		WHERE NOT a1.AgentId IN 
		(
			SELECT AgentId
			FROM AgentCommission ac
		    INNER JOIN ProductCategory pc ON ac.CategoryId = pc.CategoryId 
		    WHERE pc.ProductId = @prProductID
		)
		AND 1 = CASE WHEN @prSuperiorId IS NULL AND a1.SuperiorId IS NULL THEN 1  -- ADMIN
					 WHEN a1.SuperiorId = @prSuperiorId THEN 1
					 ELSE 0
				END

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END