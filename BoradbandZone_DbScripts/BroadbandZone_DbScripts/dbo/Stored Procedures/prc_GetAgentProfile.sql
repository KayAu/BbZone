
CREATE PROCEDURE [dbo].[prc_GetAgentProfile]
	@prUsername VARCHAR(16) = NULL,
	@prAgentId INT = NULL
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID),
			@vSelectQuery NVARCHAR(MAX)
	
	BEGIN TRY
		SELECT  a1.AgentId
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
			  ,UserLogin = NULL
			  ,PasswordHash = NULL
			  ,a1.SuperiorId
			  ,a1.IsActive
			  ,a1.CreatedOn
			  ,a1.CreatedBy
			  ,a1.ModifiedOn
			  ,a1.ModifiedBy
		      ,SuperiorName = CASE WHEN NOT a1.SuperiorId IS NULL THEN LTRIM(RTRIM(CAST(a1.SuperiorId AS CHAR(4)))) + ' - ' + a2.Fullname ELSE NULL END
		FROM Agent a1
		LEFT JOIN Agent a2 ON a1.SuperiorId = a2.AgentId
		WHERE 1 = CASE WHEN NOT @prUsername IS NULL AND a1.UserLogin = @prUsername THEN 1
					   WHEN NOT @prAgentId IS NULL AND a1.AgentId = @prAgentId THEN 1
					   ELSE 0 
				  END
	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END