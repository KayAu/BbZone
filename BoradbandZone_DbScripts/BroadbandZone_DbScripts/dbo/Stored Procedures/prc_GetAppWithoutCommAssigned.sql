CREATE PROCEDURE [dbo].[prc_GetAppWithoutCommAssigned]
	@prAgentId INT
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID)
	BEGIN TRY
	
		DECLARE @vTeamMembers TABLE 
		(	
			AgentUsername NVARCHAR(16),
			FullName VARCHAR(50),
			AgentId INT,
			SuperiorId INT,
			AgentLevel INT
		)

		INSERT INTO @vTeamMembers
		EXEC prc_GetMyEntireTeam @prAgentId

		SELECT tm.AgentUsername AS [AgentName],
			   a.UserLogin AS [SuperiorName],
			   pc.Category,
			   ac.CommId,
			   CAST(1 AS BIT) AS DirectAgent
		FROM CustomerApplication ca
		INNER JOIN ProductCategory pc ON ca.CategoryId = pc.CategoryId
		INNER JOIN @vTeamMembers tm ON ca.Agent = tm.AgentUsername
		LEFT JOIN Agent a ON a.AgentId = tm.SuperiorId
		LEFT JOIN AgentCommission ac ON ac.AgentId = tm.AgentId AND ac.CategoryId = ca.CategoryId
		WHERE ac.CommId IS NULL
		AND 1 = CASE WHEN tm.SuperiorId IS NULL AND @prAgentId IS NULL THEN 1 
					 WHEN tm.SuperiorId = @prAgentId THEN 1
					 ELSE 0
				END
		ORDER BY pc.Category, a.UserLogin
	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END