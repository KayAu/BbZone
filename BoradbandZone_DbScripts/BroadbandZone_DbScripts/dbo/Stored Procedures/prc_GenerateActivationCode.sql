

CREATE PROCEDURE [dbo].[prc_GenerateActivationCode]
	@prRegistrationId INT,
	@oActivationCode VARCHAR(100) OUTPUT
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID),
	        @vActivationCode VARCHAR(100)

	BEGIN TRY
		SET @vActivationCode =  CONVERT(VARCHAR(100), NEWID()) 
		WHILE EXISTS(SELECT 1 FROM Registration WHERE ActivationCode = @vActivationCode)
		BEGIN
			SET @vActivationCode =  CONVERT(VARCHAR(100), NEWID()) 
		END

		UPDATE Registration
		SET ActivationCode = @vActivationCode
		WHERE RegId = @prRegistrationId

		SELECT @oActivationCode = @vActivationCode
	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END