CREATE PROCEDURE [dbo].[prc_GetMyAgentCommission]
	@prProductId INT,
	@prSuperiorId INT = NULL
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID),
	        @vIsAdmin BIT = 0,
			@vCols AS NVARCHAR(MAX),
			@query AS NVARCHAR(MAX);

	BEGIN TRY
		IF OBJECT_ID('tempdb..##temp_AgentComm') IS NOT NULL DROP TABLE ##temp_AgentComm

		IF @prSuperiorId IS NULL
		SET @vIsAdmin = 1

		SELECT 
			 ac.AgentId
			,a1.Fullname AS AgentName
			,pc.Category
			,ac.AgentCommission
		INTO ##temp_AgentComm
		FROM AgentCommission ac
		INNER JOIN ProductCategory pc ON ac.CategoryId = pc.CategoryId
		INNER JOIN Agent a1 ON ac.AgentId = a1.AgentId
		WHERE pc.ProductId = @prProductId
		AND 1 = CASE WHEN @vIsAdmin = 1 AND a1.SuperiorId IS NULL THEN 1
		             WHEN a1.SuperiorId = @prSuperiorId THEN 1
					 ELSE 0
				END
		ORDER BY pc.Category

		SELECT @vCols = STUFF((SELECT DISTINCT ',' + QUOTENAME(c.category) 
							  FROM ##temp_AgentComm c
							  FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)') 
						,1,1,'')

		SET @query = 'SELECT AgentId, AgentName,' + @vCols + ' FROM 
					 (
						SELECT AgentId, 
							   AgentName,
							   Category,
							   AgentCommission
						FROM ##temp_AgentComm
						) x
						PIVOT 
						(
							MAX(AgentCommission)
						    FOR Category in (' + @vCols + ')
					 ) p '

		EXECUTE(@query)

		DROP TABLE  ##temp_AgentComm
	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END