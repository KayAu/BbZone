CREATE PROCEDURE [dbo].[prc_DboardMonthlyApplications]

AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID),
			@vFromDate DATE,
            @vToDate DATE

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
				TotalApplications = COUNT(ca.ApplicationId)
			FROM Last12Mths l 
			LEFT JOIN CustomerApplication ca ON DATEADD(MONTH,  DATEDIFF(MONTH, 0,ca.CreatedOn), 0) = l.DateValue
			LEFT JOIN ApplicationStatus s ON ca.AppStatusId = s.AppStatusId AND NOT s.Status IN ('Cancel', 'KIV')
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