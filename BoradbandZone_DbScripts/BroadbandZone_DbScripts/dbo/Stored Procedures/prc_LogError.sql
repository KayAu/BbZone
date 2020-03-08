CREATE PROCEDURE [dbo].[prc_LogError]
	@prStoreProcName VARCHAR(50),
    @ErrorLogID [int] = 0 OUTPUT 
AS
BEGIN
    SET NOCOUNT ON;

    -- Output parameter value of 0 indicates that error 
    -- information was not logged.
    SET @ErrorLogID = 0;

    BEGIN TRY
        -- Return if there is no error information to log.
        IF ERROR_NUMBER() IS NULL
            RETURN;


    DECLARE 
        @ErrorMessage    NVARCHAR(4000),
        @ErrorNumber     INT,
        @ErrorSeverity   INT,
        @ErrorState      INT,
        @ErrorLine       INT,
        @ErrorProcedure  NVARCHAR(200);

    -- Assign variables to error-handling functions that 
    -- capture information for RAISERROR.
    SELECT 
        @ErrorNumber = ERROR_NUMBER(),
        @ErrorSeverity = ERROR_SEVERITY(),
        @ErrorState = ERROR_STATE(),
        @ErrorLine = ERROR_LINE(),
        @ErrorProcedure = ISNULL(ERROR_PROCEDURE(), '-'),
		@ErrorMessage = ERROR_MESSAGE();
            
    -- Return if inside an uncommittable transaction.
    -- Data insertion/modification is not allowed when 
    -- a transaction is in an uncommittable state.
    IF XACT_STATE() = -1
    BEGIN
        PRINT 'Cannot log error since the current transaction is in an uncommittable state. ' 
            + 'Rollback the transaction before executing uspLogError in order to successfully log error information.';
        RETURN;
    END;

    INSERT [dbo].[SProcErrorLog] 
        (
        [UserName], 
        [StoredProcedure],
        [ErrorNumber], 
        [ErrorSeverity], 
        [ErrorState], 
        [ErrorProcedure], 
        [ErrorLine], 
        [ErrorMessage]
        ) 
    VALUES 
        (
        CONVERT(sysname, CURRENT_USER), 
        @prStoreProcName,
        @ErrorNumber,
        @ErrorSeverity,
        @ErrorState,
        @ErrorProcedure,
        @ErrorLine,
        @ErrorMessage
        );

    -- Raise an error: msg_str parameter of RAISERROR will contain
    -- the original error information.
    RAISERROR 
        (
        @ErrorMessage, 
        @ErrorSeverity, 
        1,               
        @ErrorNumber,    -- parameter: original error number.
        @ErrorSeverity,  -- parameter: original error severity.
        @ErrorState,     -- parameter: original error state.
        @ErrorProcedure, -- parameter: original error procedure name.
        @ErrorLine       -- parameter: original error line number.
        );
        
    -- Pass back the ErrorLogID of the row inserted
    SELECT @ErrorLogID = @@IDENTITY;
    END TRY
    BEGIN CATCH
        PRINT 'An error occurred in ' + @prStoreProcName  + ' : ' + ERROR_MESSAGE();
        --EXECUTE [dbo].[uspPrintError];
        RETURN -1;
    END CATCH
END;
