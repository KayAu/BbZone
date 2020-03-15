
CREATE PROCEDURE [dbo].[prc_GetMyAgents]
	@prUsername VARCHAR(16) = NULL,
	@oAllowCommConfig BIT OUTPUT
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID),
			@vSuperiorId INT

	BEGIN TRY
		SELECT @vSuperiorId = a.AgentId
			   ,@oAllowCommConfig = CAST(CASE WHEN NOT ac.AgentId IS NULL AND COUNT(a.AgentId) > 0 THEN 1
			                                  ELSE 0 END AS BIT)
		FROM Agent a 
		LEFT JOIN AgentCommission ac ON ac.AgentId = a.AgentId
		WHERE a.UserLogin = @prUsername 
		GROUP BY a.AgentId, ac.AgentId

		SELECT a1.AgentId AS [DisplayValue] 
			  ,a1.Fullname AS [DisplayText]
			  ,CAST(0 AS BIT) AS Selected
		FROM Agent a1
		LEFT JOIN AgentCommission ac ON a1.AgentId = ac.AgentId
		WHERE a1.SuperiorId = @vSuperiorId
		AND ac.CommId IS NULL

		--SELECT a1.AgentId AS [DisplayValue] 
		--	  ,a1.Fullname AS [DisplayText]
		--	  ,CAST(0 AS BIT) AS Selected
		--FROM Agent a1
		--LEFT JOIN Agent a2 ON a1.SuperiorId = a2.AgentId
		--LEFT JOIN AgentCommission ac ON a1.AgentId = ac.AgentId
		--WHERE a2.UserLogin = @prUsername
		--AND ac.CommId IS NULL

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END