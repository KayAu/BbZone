CREATE PROCEDURE [dbo].[prc_DboardMonthlyApplications]
	@prSuperiorId INT = NULL
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID),
			@vFromDate DATE,
            @vToDate DATE

	DECLARE @vTeamMembers TABLE 
	(	
		AgentUsername NVARCHAR(16),
		FullName VARCHAR(50),
		AgentId INT,
		SuperiorId INT,
		AgentLevel INT
	)

	INSERT INTO @vTeamMembers
	EXEC prc_GetMyEntireTeam @prSuperiorId

	BEGIN TRY
		SELECT @vToDate = CONVERT(DATE,DATEADD(MONTH,  DATEDIFF(MONTH, 0, GETDATE()), 0)),
			   @vFromDate = CONVERT(DATE,DATEADD(MONTH,  DATEDIFF(MONTH, 0, GETDATE()) - 12, 0));

		WITH Last12Mths(DateValue)AS
		(
			SELECT @vFromDate
			UNION ALL
			SELECT CONVERT(DATE, DATEADD(M,1,DateValue)) FROM Last12Mths WHERE DateValue < @vToDate
		),
		cteApplications
		AS
		(
			SELECT 
				l.DateValue,
				TotalApplications =SUM(CASE wHEN @prSuperiorId IS NULL AND NOT ca.ApplicationId IS NULL THEN 1
										    WHEN NOT @prSuperiorId IS NULL AND ca.Agent = tm.AgentUsername THEN 1
										    ELSE 0
									   END)
				--TotalApplications = COUNT(ca.ApplicationId)
			FROM Last12Mths l 
			LEFT JOIN CustomerApplication ca ON DATEADD(MONTH,  DATEDIFF(MONTH, 0,ca.CreatedOn), 0) = l.DateValue
			LEFT JOIN ApplicationStatus s ON ca.AppStatusId = s.AppStatusId AND NOT s.Status IN ('Cancel', 'KIV')
			LEFT JOIN @vTeamMembers tm ON ca.Agent = tm.AgentUsername
			GROUP BY l.DateValue
		)

		SELECT 
			Mth = FORMAT(DATEADD(MONTH , MONTH(DateValue) , -1 ) ,'MMM') + '''' + RIGHT(CAST(YEAR(DateValue) AS VARCHAR(4)),2) ,
			TotalApplications = ISNULL(TotalApplications, 0)
		FROM cteApplications
		ORDER BY  DateValue

	END TRY
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;

END