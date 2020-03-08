CREATE PROCEDURE [dbo].[prc_ActivateAgent]
	@prActivationCode VARCHAR(100)
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID),
			@vRegId INT, 
			@vActivated BIT = 0

	BEGIN TRY

		DECLARE @updatedTbl TABLE(  
			RegId INT NULL
		);  
  
		UPDATE Registration
		SET ActivatedOn = GETDATE()  
		OUTPUT inserted.RegId
			INTO @updatedTbl
		FROM Registration
		WHERE ActivationCode = @prActivationCode
		AND IsApproved = 1
		AND ActivatedOn IS NULL


		IF EXISTS(SELECT RegId FROM @updatedTbl)
		BEGIN
			SET @vActivated = 1

			-- add the activated account to Agent table
			INSERT INTO Agent
			SELECT Fullname
				  ,Email
				  ,Nric
				  ,CompanyName
				  ,CompanyRegNo
				  ,Address
				  ,City
				  ,State
				  ,Postcode
				  ,Country
				  ,MobileNo
				  ,TelNo
				  ,null
				  ,null
				  ,UserLogin
				  ,PasswordHash
				  ,SuperiorId
				  ,1
				  ,ActivatedOn
				  ,'System'
				  ,ActivatedOn
				  ,'System'
		  FROM Registration r
		  INNER JOIN @updatedTbl u ON r.RegId = u.RegId
		END

		SELECT CAST(@vActivated AS BIT)

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END