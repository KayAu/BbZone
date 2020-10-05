CREATE PROCEDURE [dbo].[prc_GetAgentsForDownload]
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID)

	BEGIN TRY

		SELECT a1.AgentId
			  ,a1.Fullname
			  ,a1.Email
			  ,a1.Nric
			  ,a1.CompanyName
			  ,a1.CompanyRegNo
			  ,a1.Address
			  ,a1.City
			  ,a1.State
			  ,a1.Postcode
			  ,a1.Country
			  ,a1.MobileNo
			  ,a1.TelNo
			  ,a1.BankName
			  ,a1.BankAccNo
			  ,a1.UserLogin
			  ,a1.SuperiorId
			  ,l.LastLoginOn	
			  ,a2.Fullname AS SuperiorName
			  ,a2.UserLogin AS SuperiorLogin
		FROM Agent a1
		LEFT JOIN Agent a2 ON a2.AgentId = a1.SuperiorId
		CROSS APPLY
		(
			SELECT TOP 1 LastLoginOn = FORMAT(LoginDate, 'MM/dd/yyyy')
			FROM LoginTrail
			WHERE AgentId = a1.AgentId
			ORDER BY LoginDate DESC
		) l

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END