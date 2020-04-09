CREATE PROCEDURE [dbo].[prc_UpdateMessagesToRead]
	@prAppId INT,
	@prIsAdmin BIT
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID),
	        @total INT = NULL
	BEGIN TRY

		UPDATE Communication
		SET MsgRead = 1
		WHERE ApplicationId = @prAppId
		AND [Role] <> CASE WHEN @prIsAdmin = 1 THEN 'AD' ELSE 'AG' END

		SELECT ISNULL(@total, 0)
	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END