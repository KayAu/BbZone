CREATE PROCEDURE [dbo].[prc_AuthenticateUser]
	@prLogin NVARCHAR(16),
	@prPassword VARCHAR(16),
	@prIsAdmin BIT,
	@prImpersonate BIT
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID),
			@vEncrypt VARBINARY(200)  

	BEGIN TRY

		IF @prIsAdmin = 1 
		BEGIN
			SELECT  Username = UserLogin,
					[Password] = '',
					Fullname,
					[Role] = CASE WHEN HasFullControl = 1 THEN ' Super Admin' ELSE 'Admin' END,
					IsAuthenticated = CAST(1 AS BIT),
					IsImpersonated  = @prImpersonate,
					IsAdmin = CAST(1 AS BIT)
			FROM AdminUser
			WHERE @prLogin = UserLogin 
			AND @prPassword = CONVERT(VARCHAR(100),DECRYPTBYPASSPHRASE('key', PasswordHash ))
		END
		ELSE
		BEGIN
			SELECT  Username = UserLogin,
					[Password] = '',
					Fullname,
					[Role] = 'Agent',
					IsAuthenticated = CAST(1 AS BIT),
					IsImpersonated  = @prImpersonate,
					IsAdmin = CAST(0 AS BIT)
			FROM Agent
			WHERE @prLogin = UserLogin 
			AND @prPassword = CONVERT(VARCHAR(100),DECRYPTBYPASSPHRASE('key', PasswordHash ))
		END


	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END