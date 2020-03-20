
CREATE PROCEDURE [dbo].[prc_GetMyAgents]
	@prSuperiorId INT = NULL,
	@prProductID INT,
	@oAllowCommConfig BIT OUTPUT
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID)

	BEGIN TRY
		SET @oAllowCommConfig = 0

	    -- check if this agent has commission set for the product selected
		IF EXISTS (SELECT  1
				FROM AgentCommission ac 
				LEFT JOIN ProductCategory pc ON ac.CategoryId = pc.CategoryId 
				WHERE ac.AgentId = @prSuperiorId
				AND pc.ProductId = @prProductID)
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
	    AND a1.SuperiorId = @prSuperiorId

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END