CREATE PROCEDURE [dbo].[prc_GetAnnouncement]
	@prCurrentPage INT,
	@prPageSize INT,
	@prSortColumn VARCHAR(50),
	@prSortInAsc BIT,
	@prTitle VARCHAR(200),
	@prIsActive BIT = NULL,
	@oTotalRecord INT OUTPUT

AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID),
			@vSelectQuery NVARCHAR(MAX)

	DECLARE @var_Table TABLE(
		AnncId INT,
		Title VARCHAR(200),
		IsActive BIT,
		ModifiedBy  VARCHAR(50),
		ModifiedON SMALLDATETIME,
		RowNum INT
	)

	BEGIN TRY
		IF OBJECT_ID('tempdb..##temp_Table') IS NOT NULL DROP TABLE ##temp_Table

		-- get row from and row to based on current page
		IF @prSortColumn IS NULL  SET @prSortColumn= 'ModifiedOn'
		SELECT @vSelectQuery =  dbo.fn_GenerateDynamicQuery(@prCurrentPage, @prPageSize, @prSortColumn, @prSortInAsc)

		SELECT 
		     AnncId,
			 Title,
			 IsActive,
			 ModifiedBy,
			 ModifiedOn
		INTO ##temp_Table
		FROM Announcement
		WHERE 1 = CASE WHEN @prTitle IS NULL THEN 1
					   WHEN Title like '%' + @prTitle + '%' THEN 1
					   ELSE 0
				  END
		AND 1 = CASE WHEN @prIsActive IS NULL THEN 1
					   WHEN IsActive = @prIsActive THEN 1
					   ELSE 0
				  END
	
	
		PRINT @vSelectQuery

		-- insert the dynamic query results into temp table
		INSERT INTO @var_Table
		EXEC SP_ExecuteSQL @vSelectQuery


		SELECT AnncId,
			   Title,
			   IsActive,
			   ModifiedBy,
			   ModifiedOn = FORMAT(ModifiedOn, 'MM/dd/yyyy')
		FROM  @var_Table

		SELECT @oTotalRecord = COUNT(AnncId) FROM ##temp_Table

		DROP TABLE  ##temp_Table
	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END