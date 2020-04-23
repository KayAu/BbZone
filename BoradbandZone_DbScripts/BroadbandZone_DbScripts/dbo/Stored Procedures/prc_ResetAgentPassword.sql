
CREATE PROCEDURE [dbo].[prc_ResetAgentPassword]
	@prAgentId VARCHAR(16),
	@prNewPassword VARCHAR(16),
	@prUpdatedBy VARCHAR(50) 
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID),
			@vEncrypt VARBINARY(200)  

	BEGIN TRY
		SELECT @vEncrypt = EncryptByPassPhrase('key', LTRIM(RTRIM(@prNewPassword)))

		UPDATE Agent
		SET PasswordHash = @vEncrypt,
		    ModifiedOn = GETDATE(),
			ModifiedBy = @prUpdatedBy
		WHERE UserLogin = @prAgentId

		SELECT Email, Fullname
		FROM Agent
		WHERE UserLogin = @prAgentId

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END