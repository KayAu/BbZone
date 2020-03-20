

CREATE FUNCTION [dbo].[fnGetMyAgents] (
	@prSuperiorId INT = NULL
)
RETURNS @vAgentHierarchy TABLE 
(	
	AgentId INT,
	AgentUsername NVARCHAR(16),
	FullName VARCHAR(50),
	RootSuperiorId INT,
	SuperiorId INT,
	AgentLevel INT
)
BEGIN

	WITH cteAgentHierarchy
	AS
	(
		SELECT AgentId,
				UserLogin,
				FullName,
				RootSuperiorId = AgentId,
				SuperiorId, 
				AgentLevel = 1  
		FROM Agent
		WHERE 1 = CASE WHEN @prSuperiorId IS NULL AND SuperiorId IS NULL THEN 1
					   WHEN SuperiorId = @prSuperiorId THEN 1
					   ELSE 0
				  END
		UNION ALL
		SELECT a.AgentId,
				a.UserLogin,
				a.FullName,
				cte.RootSuperiorId,
				a.SuperiorId, 
				AgentLevel = AgentLevel + 1
		FROM Agent a
		INNER JOIN cteAgentHierarchy cte ON a.SuperiorId = cte.AgentId
	)

	INSERT INTO @vAgentHierarchy
	SELECT * 
	FROM cteAgentHierarchy

	RETURN
END