CREATE PROCEDURE [dbo].[prc_DboardTotalSalesAndCommission]
	@prAgentId INT = NULL,
	@prAgentName VARCHAR(25) = NULL
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID),
			@vFromDate DATE,
            @vToDate DATE,
			@vTotalApplications INT,
			@vTotalCommission MONEY

	BEGIN TRY
		SELECT @vToDate = CONVERT(DATE,DATEADD(MONTH,  DATEDIFF(MONTH, 0, GETDATE()), 0)),
			   @vFromDate = CONVERT(DATE,DATEADD(MONTH,  DATEDIFF(MONTH, 0, GETDATE()) - 12, 0));

		WITH cteMyTeam
		AS
		(
			SELECT @prAgentName AS Agent
			UNION ALL
			SELECT AgentUsername AS Agent
			FROM [dbo].[fnGetMyAgents](@prAgentId)
		)

		SELECT @vTotalApplications = COUNT(ca.applicationId),
			   @vTotalCommission = SUM(pp.Commission)
		FROM CustomerApplication ca
		INNER JOIN ProductPackage pp ON ca.ProdPkgId = pp.ProdPkgId
		INNER JOIN ProductCategory pc ON pc.CategoryId = pp.CategoryId
		INNER JOIN cteMyTeam t ON t.Agent = ca.Agent
		WHERE DATEADD(MONTH,  DATEDIFF(MONTH, 0,ca.CreatedOn), 0) BETWEEN @vFromDate  AND  @vToDate
	
		SELECT @vTotalApplications AS TotalApplications,
		       ISNULL(@vTotalCommission, 0) AS TotalCommission

	END TRY
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;

END