CREATE PROCEDURE [dbo].[prc_SendActivationCode]
	@prRegistrationId INT,
	@prEmail VARCHAR(25)
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

		--IF NOT @prEmail IS NULL
		--	BEGIN
		----		-- Get email settings
		----		SELECT @vEmailContent = EmailBody,
		----				@vEmailLink = HomeUrl,
		----				@vProfileName = ProfilerName
		----		FROM EmailSettings
		----		WHERE DbServer = @@SERVERNAME

		----		-- Generate email title
		----		SET @vEmailTitle = 'Overdue OLI Approvals'

		----		-- Generate email content
		----		SET @vEmailBody = N'<body>
		----							<p>Please be advised that your approvals for OLI  submission or team rewards claim is overdue. Click the link below to view the items pending for your action</p>
		----							<div><a href="' + @vEmailLink + '">View..</a></div>
		----							<center> *** This is an automatically generated email, please do not reply ***</center>
		----							</body>';
							   
		----		SELECT @vEmailContent = REPLACE(@vEmailContent, '<body></body>', @vEmailBody)
	
		--		-- Send email out
		--		--EXEC msdb.dbo.sp_send_dbmail  
		--		--	@profile_name= @vProfileName,
		--		--	@recipients = @vReceiverEmail,  
		--		--	@blind_copy_recipients = @vAdminEmail,
		--		--	@body = @vEmailContent,  
		--		--	@body_format = 'HTML' ,
		--		--	@subject = @vEmailTitle;		
		--	END
		--END

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END