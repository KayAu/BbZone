CREATE PROCEDURE [dbo].[prc_GetUnreadMessagesCount]
	@prAppId INT,
	@prIsAdmin BIT
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID),
	        @total INT = NULL
	BEGIN TRY

		SELECT @total = COUNT(CommId)
		FROM Communication
		WHERE ApplicationId = @prAppId
		AND [Role] = CASE WHEN @prIsAdmin = 1 THEN 'AG' ELSE 'AD' END
		AND MsgRead = 0

		SELECT ISNULL(@total, 0)
	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END