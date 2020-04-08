
CREATE PROCEDURE [dbo].[prc_InsertIncentives]
	@prIncentivePayment udt_IncentivePayment READONLY,
	@prAdmin NVARCHAR(16)
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID)
	DECLARE @vIncentives TABLE
	(
		ApplicationId INT,
		CustomerName VARCHAR(100),
		OrderNo VARCHAR(25),
		Incentive MONEY
	)

	BEGIN TRY
		-- Try get matching customer application based on the uploaded incentives
		INSERT INTO @vIncentives
		SELECT ca.ApplicationId,
		       i.CustomerName,
			   i.OrderNo,
			   i.Incentive
		FROM @prIncentivePayment i
		LEFT JOIN CustomerApplication ca  ON ca.OrderNo = i.OrderNo

		-- Insert the matching customer application
		INSERT INTO IncentiveReceived
		SELECT  vi.ApplicationId,
				vi.Incentive,
				1,
				GETDATE(),
				@prAdmin,
				GETDATE(),
				@prAdmin
		FROM @vIncentives vi
		LEFT JOIN IncentiveReceived ir ON vi.ApplicationId = ir.ApplicationId AND ir.IsActive = 1
		WHERE NOT vi.ApplicationId IS NULL
		AND ir.ApplicationId IS NULL -- the incentive has not been updated yet

		-- Return the non matching customer application
		SELECT * 
		FROM @vIncentives
		WHERE ApplicationId IS NULL

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END