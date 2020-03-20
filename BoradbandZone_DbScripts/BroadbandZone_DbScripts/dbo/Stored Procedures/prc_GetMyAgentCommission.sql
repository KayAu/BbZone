CREATE PROCEDURE [dbo].[prc_GetMyAgentCommission]
	@prProductId INT,
	@prSuperiorId INT
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID),
			@vCols AS NVARCHAR(MAX),
			@query AS NVARCHAR(MAX);

	BEGIN TRY
		IF OBJECT_ID('tempdb..##temp_AgentComm') IS NOT NULL DROP TABLE ##temp_AgentComm

		SELECT 
			ac.AgentId
			,a1.Fullname AS AgentName
			,pc.Category
			,ac.AgentCommission
		INTO ##temp_AgentComm
		FROM AgentCommission ac
		INNER JOIN ProductCategory pc ON ac.CategoryId = pc.CategoryId
		INNER JOIN Agent a1 ON ac.AgentId = a1.AgentId
		--INNER JOIN Agent a2 ON a2.AgentId = a1.SuperiorId
		WHERE pc.ProductId = @prProductId
		AND a1.SuperiorId = @prSuperiorId
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