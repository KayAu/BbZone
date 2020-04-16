
CREATE PROCEDURE [dbo].[prc_GetMyEntireTeam]
	@prSuperiorId INT = NULL
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID)

	BEGIN TRY

	    -- check if this agent has commission set for the product selected
		SELECT UserLogin,
			   FullName,
			   AgentId
		FROM Agent
		WHERE AgentId = @prSuperiorId
		UNION ALL
		SELECT AgentUsername AS UserLogin,
			   FullName,
			   AgentId
		FROM  [dbo].[fnGetMyAgents](@prSuperiorId)

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END