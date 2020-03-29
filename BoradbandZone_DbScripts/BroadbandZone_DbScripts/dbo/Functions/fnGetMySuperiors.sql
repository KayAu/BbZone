
CREATE FUNCTION [dbo].[fnGetMySuperiors] (
	@prAgentId INT = NULL
)
RETURNS @vSuperiorHierarchy TABLE 
(	
	AgentId INT,
	Agent NVARCHAR(16),
	FullName VARCHAR(50),
	SuperiorId INT,
	AgentLevel INT
)
BEGIN
	WITH cteSuperiorHierarchy
	AS
	(
		SELECT AgentId,
				UserLogin,
				FullName,
				SuperiorId, 
				AgentLevel = 1  
		FROM Agent
		WHERE AgentId = @prAgentId
		UNION ALL
		SELECT a.AgentId,
				a.UserLogin,
				a.FullName,
				a.SuperiorId, 
				AgentLevel = AgentLevel + 1
		FROM Agent a
		INNER JOIN cteSuperiorHierarchy cte ON a.AgentId = cte.SuperiorId
	)

	INSERT INTO @vSuperiorHierarchy
	SELECT * 
	FROM cteSuperiorHierarchy

	RETURN
END