
CREATE FUNCTION [dbo].[fnGetMyEarningHierarchy] (
	@prAgent VARCHAR(25)
)
RETURNS @vAgentHierarchy TABLE 
(	
	AgentId INT,
	Agent NVARCHAR(16),
	FullName VARCHAR(50),
	MyAgent BIT
)
BEGIN

	WITH cteAgentHierarchy
	AS
	(
		SELECT AgentId,
			   UserLogin,
			   FullName,
			   MyAgent = 0  
		FROM Agent
		WHERE UserLogin = @prAgent
		UNION ALL
		SELECT a1.AgentId,
			   a1.UserLogin,
			   a1.FullName,
			   MyAgent = 1  
		FROM Agent a1 
		INNER JOIN Agent a2 ON a1.SuperiorId = a2.AgentId
		WHERE a2.UserLogin = @prAgent 				
	)

	INSERT INTO @vAgentHierarchy
	SELECT * 
	FROM cteAgentHierarchy

	RETURN
END