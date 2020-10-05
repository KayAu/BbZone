CREATE PROCEDURE [dbo].[prc_ReportAgentSubmissionStatus]
	@prCurrentPage INT,
	@prPageSize INT,
	@prSortColumn VARCHAR(50),
	@prSortInAsc BIT,
	@prSubmittedFrom SMALLDATETIME = NULL,
	@prSubmittedTo SMALLDATETIME = NULL,
	@oTotalRecord INT OUTPUT
AS
BEGIN
	IF OBJECT_ID('tempdb..##temp_Table') IS NOT NULL DROP TABLE ##temp_Table

	DECLARE @vAgentHierarchy udt_AgentHierarchy

	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID),
			@vSelectQuery NVARCHAR(MAX),
			@vOrderByQuery NVARCHAR(MAX),
			@vWhereQuery NVARCHAR(MAX) = '',
	        @vFromRow VARCHAR(5),
			@vToRow VARCHAR(5)

	DECLARE @var_Table TABLE
	(
		AgentId INT,
		AgentLogin VARCHAR(16),
		AgentName VARCHAR(50),
		AgentLevel INT,
		SuperiorId INT,
		SuperiorLogin VARCHAR(16),
		SuperiorName VARCHAR(50),
		TotalCompleted INT,
		TotalInProgress INT,
		RowNum INT
	)

	-- get row from and row to based on current page
	SELECT @vSelectQuery =  dbo.fn_GenerateDynamicQuery(@prCurrentPage, @prPageSize, @prSortColumn, @prSortInAsc)

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
		INTO ##temp_Table
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
		 
		-- insert the dynamic query results into temp table
		INSERT INTO @var_Table
		EXEC SP_ExecuteSQL @vSelectQuery

		PRINT @vSelectQuery

		SELECT  AgentId,
				AgentLogin,
				AgentName,
				AgentLevel,
				SuperiorId,
				SuperiorLogin,
				SuperiorName,
				TotalCompleted,
				TotalInProgress
		FROM  @var_Table

		SELECT @oTotalRecord = COUNT(AgentId) FROM ##temp_Table

		DROP TABLE  ##temp_Table

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END