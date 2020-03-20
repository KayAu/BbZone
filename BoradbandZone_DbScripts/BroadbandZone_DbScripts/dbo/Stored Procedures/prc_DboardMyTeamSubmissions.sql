CREATE PROCEDURE [dbo].[prc_DboardMyTeamSubmissions]
	@prSuperiorId INT = NULL,
	@oTotalAllAgents INT OUTPUT
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID),
			@vSuperiorId INT

	DECLARE @vAgentHierarchy udt_AgentHierarchy

	BEGIN TRY

		INSERT INTO @vAgentHierarchy
		SELECT * 
		FROM  [dbo].[fnGetMyAgents](@prSuperiorId)

		SELECT FullName,
			   TotalAgents = ISNULL(TotalAgents, 0) ,
			   TotalCompleted = ISNULL(TotalCompleted, 0),
			   TotalInProgress = ISNULL(TotalInProgress, 0)
		FROM @vAgentHierarchy h
		OUTER APPLY
		(
			SELECT TotalAgents = COUNT(DISTINCT ah.AgentId) - 1,
				   TotalCompleted = SUM(CASE WHEN ISNULL(s.Status, '') = 'Post Complete' THEN 1 ELSE 0 END),
				   TotalInProgress = SUM(CASE WHEN NOT s.AppStatusId IS NULL AND 
				                                   NOT ISNULL(s.Status, '') IN ('Cancel','KIV', 'Post Complete') THEN 1 ELSE 0 END)
			FROM @vAgentHierarchy ah
			LEFT JOIN CustomerApplication ca ON ca.Agent = ah.AgentUsername 
			LEFT JOIN ApplicationStatus s ON ca.AppStatusId = s.AppStatusId
			WHERE ah.RootSuperiorId = h.AgentId
			GROUP BY ah.RootSuperiorId
		) s
		WHERE h. AgentLevel = 1

		SELECT  @oTotalAllAgents = ISNULL(SUM(CASE WHEN AgentLevel >= 1 THEN 1 ELSE 0 END),0)
		FROM @vAgentHierarchy

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END