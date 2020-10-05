
CREATE PROCEDURE [dbo].[prc_GetMyEntireTeam]
	@prSuperiorId INT = NULL
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID)

	BEGIN TRY

	    -- check if this agent has commission set for the product selected
		SELECT UserLogin,
			   FullName,
			   AgentId,
			   SuperiorId,
			   AgentLevel = 0
		FROM Agent 
		WHERE AgentId = @prSuperiorId
		AND IsActive = 1
		UNION ALL
		SELECT AgentUsername AS UserLogin,
			   FullName,
			   AgentId,
			   SuperiorId,
			   AgentLevel = CASE WHEN @prSuperiorId IS NULL THEN AgentLevel - 1 ELSE AgentLevel END
		FROM  [dbo].[fnGetMyAgents](@prSuperiorId)

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END