CREATE PROCEDURE [dbo].[prc_GetDropdownItems]
	@prFieldName VARCHAR(25)
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID),
	        @vDropdownItems VARCHAR(250)
	
	BEGIN TRY
		SELECT @vDropdownItems = Options
		FROM DropdownItems
		WHERE FieldName = @prFieldName

		SELECT Item = ExtractedText
		FROM [dbo].[fnSplit](@vDropdownItems,'|')
	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END