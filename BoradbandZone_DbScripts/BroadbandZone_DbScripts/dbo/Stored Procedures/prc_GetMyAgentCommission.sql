CREATE PROCEDURE [dbo].[prc_GetMyAgentCommission]
	@prProductId INT,
	@prSuperiorId INT = NULL
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID),
	        @vIsAdmin BIT = 0,
			@vCols AS NVARCHAR(MAX),
			@vOrderByCol VARCHAR(150),
			@query AS NVARCHAR(MAX);

	DECLARE @vTeamMembers TABLE 
	(	
		AgentUsername NVARCHAR(16),
		FullName VARCHAR(50),
		AgentId INT,
		SuperiorId INT,
		AgentLevel INT
	)

	BEGIN TRY
		IF OBJECT_ID('tempdb..##temp_AgentComm') IS NOT NULL DROP TABLE ##temp_AgentComm

		INSERT INTO @vTeamMembers
		EXEC prc_GetMyEntireTeam @prSuperiorId

		SELECT 
			 a1.AgentId
			,CASE WHEN a1.AgentLevel = 0  AND NOT @prSuperiorId IS NULL THEN 'My Allocated Commissions' ELSE a1.AgentUsername END AS AgentName
			,ap.Category
			,ac.AgentCommission
			,a1.AgentLevel
		INTO ##temp_AgentComm
		FROM @vTeamMembers a1
		CROSS APPLY (SELECT a1.AgentId, pc.CategoryId, pc.Category
					  FROM ProductCategory pc 
					  WHERE pc.ProductId = @prProductId
					  AND pc.IsActive = 1
					 ) ap
		LEFT JOIN AgentCommission ac ON ac.AgentId = ap.AgentId AND ac.CategoryId = ap.CategoryId
		WHERE 1 = CASE WHEN ISNULL(a1.SuperiorId,0) = 0 AND @prSuperiorId IS NULL THEN 1 
					   WHEN a1.SuperiorId = @prSuperiorId OR a1.AgentLevel = 0 THEN 1
					   ELSE 0
				  END
		ORDER BY a1.AgentLevel, ap.Category
		
		SELECT @vCols = STUFF((SELECT  ',' + QUOTENAME(c.category) 
							  FROM ##temp_AgentComm c
							  GROUP BY Category
							  ORDER BY Category
							  FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)') 
						,1,1,'')

	    SELECT @vOrderByCol =  CASE WHEN CHARINDEX(',', @vCols) > 0 THEN SUBSTRING(@vCols, 1, CHARINDEX(',', @vCols) - 1) ELSE @vCols END
	
		SET @query = 'SELECT AgentId, AgentLevel, AgentName, ' + @vCols + ' FROM 
					 (
						SELECT AgentId, 
							   AgentName,
							   Category,
							   AgentCommission,
							   AgentLevel
						FROM ##temp_AgentComm
						) x
						PIVOT 
						(
							MAX(AgentCommission)
						    FOR Category in (' + @vCols + ')
					 ) p  ORDER BY AgentLevel, ' + @vOrderByCol + ' DESC' 

		EXECUTE(@query)

		DROP TABLE  ##temp_AgentComm
	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END