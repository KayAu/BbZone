

CREATE PROCEDURE [dbo].[prc_UpdateMyPasswordAgent]
	@prAgentId INT,
	@prOldPassword VARCHAR(15),
	@prNewPassword VARCHAR(16),
	@oValidUpdate BIT OUTPUT
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID),
			@vIsValidUpdate BIT = 0,
			@vEncrypt VARBINARY(200)  

	BEGIN TRY

		SELECT @vIsValidUpdate = 1
		FROM Agent
		WHERE AgentId = @prAgentId
		AND @prOldPassword = CONVERT(VARCHAR(100),DECRYPTBYPASSPHRASE('key', PasswordHash ))

		IF @vIsValidUpdate = 1 
		BEGIN
			SELECT @vEncrypt = EncryptByPassPhrase('key', LTRIM(RTRIM(@prNewPassword)))

			UPDATE Agent
			SET PasswordHash = @vEncrypt
			WHERE AgentId = @prAgentId
		END
		
		SELECT @oValidUpdate = @vIsValidUpdate
	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END