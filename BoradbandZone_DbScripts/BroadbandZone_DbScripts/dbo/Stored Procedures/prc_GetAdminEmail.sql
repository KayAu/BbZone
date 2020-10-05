CREATE PROCEDURE [dbo].[prc_GetAdminEmail]
	@oEmails VARCHAR(8000)  OUTPUT
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID)
			--@vEmails VARCHAR(8000) 

	BEGIN TRY

	SELECT @oEmails = COALESCE(@oEmails + '; ', '') + Email 
	FROM AdminUser
	WHERE NOT Email IS NULL
	AND IsActive = 1

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END