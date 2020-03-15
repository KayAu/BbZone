CREATE PROCEDURE [dbo].[prc_DboardMyTeamSubmissions]
	@prUsername VARCHAR(16),
	@oTotalAllAgents INT OUTPUT
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID),
			@vSuperiorId INT

	DECLARE @vAgentHierarchy TABLE
	(
		AgentId INT,
		AgentUsername NVARCHAR(16),
		FullName VARCHAR(50),
		RootSuperiorId INT,
		SuperiorId INT,
		AgentLevel INT
	)

	BEGIN TRY
		SELECT @vSuperiorId = AgentId
		FROM Agent
		WHERE UserLogin = @prUsername;

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
			WHERE SuperiorId = @vSuperiorId
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

		SELECT FullName,
			   TotalAgents = ISNULL(TotalAgents, 0),
			   TotalCompleted = ISNULL(TotalCompleted, 0),
			   TotalInProgress = ISNULL(TotalInProgress, 0)
		FROM @vAgentHierarchy h
		OUTER APPLY
		(
			SELECT TotalAgents = COUNT(ah.AgentId),
				   TotalCompleted = SUM(CASE WHEN ISNULL(s.Status, '')  = 'Post Complete' THEN 1 ELSE 0 END),
				   TotalInProgress = SUM(CASE WHEN NOT ISNULL(s.Status, '') IN ('Cancel','KIV') THEN 1 ELSE 0 END)
			FROM @vAgentHierarchy ah
			LEFT JOIN CustomerApplication ca ON ca.Agent = ah.AgentUsername 
			LEFT JOIN ApplicationStatus s ON ca.AppStatusId = s.AppStatusId
			WHERE ah.RootSuperiorId = h.AgentId
			AND ah.AgentLevel > 1
			GROUP BY ah.RootSuperiorId
		) s
		WHERE AgentLevel = 1

		SELECT  @oTotalAllAgents = SUM(CASE WHEN AgentLevel >= 1 THEN 1 ELSE 0 END)
		FROM @vAgentHierarchy

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END