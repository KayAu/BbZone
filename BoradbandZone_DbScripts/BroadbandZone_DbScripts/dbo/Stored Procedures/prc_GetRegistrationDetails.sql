
CREATE PROCEDURE [dbo].[prc_GetRegistrationDetails]
	@prRegId INT
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID)
	
	BEGIN TRY
		SELECT r.RegId
			  ,r.Fullname
			  ,r.Email
			  ,r.Nric
			  ,r.CompanyName
			  ,r.CompanyRegNo
			  ,r.Address
			  ,r.City
			  ,r.State
			  ,r.Postcode
			  ,r.Country
			  ,r.MobileNo
			  ,r.TelNo
			  ,r.BankName
			  ,r.BankAccNo
			  ,r.UserLogin
			  ,r.PasswordHash
			  ,r.SuperiorId
			  ,r.ActivationCode
			  ,r.ActivatedOn
			  ,r.IsApproved
			  ,r.ApprovalDate
			  ,r.ApprovedBy
			  ,r.CreatedOn
		      ,a.Fullname AS SuperiorName
		FROM Registration r
		LEFT JOIN Agent a ON r.SuperiorId = a.AgentId
		WHERE r.RegId = @prRegId

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END