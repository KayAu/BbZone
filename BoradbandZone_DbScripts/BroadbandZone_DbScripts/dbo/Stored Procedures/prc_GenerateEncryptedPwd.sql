CREATE PROCEDURE [dbo].[prc_GenerateEncryptedPwd]
	@prUserLogin VARCHAR(16)

AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID),
			@vEncrypt VARBINARY(200)  

	BEGIN TRY
		SELECT @vEncrypt = EncryptByPassPhrase('key', LTRIM(RTRIM(@prUserLogin)))
		SELECT @vEncrypt 
	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END