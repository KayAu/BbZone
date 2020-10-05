CREATE PROCEDURE [dbo].[prc_ReportAgentSubmissionStatusDownload]
	@prSubmittedFrom SMALLDATETIME = NULL,
	@prSubmittedTo SMALLDATETIME = NULL
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID)
	DECLARE @vAgentHierarchy udt_AgentHierarchy

	BEGIN TRY

		INSERT INTO @vAgentHierarchy
		SELECT * 
		FROM  [dbo].[fnGetMyAgents](NULL)

		SELECT 	h.AgentId,
				AgentLogin = h.AgentUsername,
				AgentName = h.FullName,
				h.AgentLevel,
				SuperiorId = CASE WHEN h.SuperiorId = 0 THEN NULL ELSE h.SuperiorId END,
				SuperiorLogin = a.UserLogin,
				SuperiorName = a.Fullname,
				TotalCompleted = ISNULL(TotalCompleted, 0),
				TotalInProgress = ISNULL(TotalInProgress, 0)
		FROM @vAgentHierarchy h
		LEFT JOIN Agent a on h.SuperiorId = a.AgentId
		OUTER APPLY
		(
			SELECT 
				TotalCompleted = SUM(CASE WHEN ISNULL(s.Status, '') = 'Post Complete' THEN 1 ELSE 0 END),
				TotalInProgress = SUM(CASE WHEN NOT s.AppStatusId IS NULL AND 
												NOT ISNULL(s.Status, '') IN ('Cancel','KIV', 'Post Complete') THEN 1 ELSE 0 END)
			FROM CustomerApplication ca  
			LEFT JOIN ApplicationStatus s ON ca.AppStatusId = s.AppStatusId
			WHERE ca.Agent = h.AgentUsername 
			AND  1 = CASE WHEN @prSubmittedFrom IS NULL AND @prSubmittedTo IS NULL THEN 1
					      WHEN ca.CreatedOn BETWEEN @prSubmittedFrom AND @prSubmittedTo THEN 1
						  ELSE 0
					END
			GROUP BY ca.Agent
		)  s

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END