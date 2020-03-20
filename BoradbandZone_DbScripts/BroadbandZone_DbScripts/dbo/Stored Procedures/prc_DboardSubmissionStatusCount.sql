CREATE PROCEDURE [dbo].[prc_DboardSubmissionStatusCount]
	@prSuperiorId INT = NULL,
	@prYear INT = NULL
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID)
	DECLARE @vAgentHierarchy udt_AgentHierarchy

	BEGIN TRY

		IF NOT @prSuperiorId IS NULL
		BEGIN
			INSERT INTO @vAgentHierarchy
			SELECT AgentId, UserLogin, Fullname, AgentId, SuperiorId, 0
			FROM Agent
			WHERE AgentId = @prSuperiorId
		END

		INSERT INTO @vAgentHierarchy
		SELECT * 
		FROM  [dbo].[fnGetMyAgents](@prSuperiorId)

		SELECT
			TotalSubmitted = COUNT(DISTINCT ca.ApplicationId),
			TotalCompleted = ISNULL(SUM(CASE WHEN ISNULL(s.Status, '') = 'Post Complete' THEN 1 ELSE 0 END), 0),
			TotalInProgress = ISNULL(SUM(CASE WHEN NOT ISNULL(s.Status, '') IN ('Cancel','KIV', 'Post Complete') THEN 1 ELSE 0 END), 0),
			TotalCancelled = ISNULL(SUM(CASE WHEN ISNULL(s.Status, '') IN ('Cancel','KIV') THEN 1 ELSE 0 END), 0)
		FROM @vAgentHierarchy ah
		INNER JOIN CustomerApplication ca ON ca.Agent = ah.AgentUsername 
		INNER JOIN ApplicationStatus s ON ca.AppStatusId = s.AppStatusId
		WHERE YEAR(ca.CreatedOn) = @prYear
	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END