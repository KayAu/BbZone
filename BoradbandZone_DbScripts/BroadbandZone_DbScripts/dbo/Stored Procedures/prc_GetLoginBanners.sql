CREATE PROCEDURE [dbo].[prc_GetLoginBanners]
	@prCurrentPage INT,
	@prPageSize INT,
	@prSortColumn VARCHAR(50),
	@prSortInAsc BIT,
	@oTotalRecord INT OUTPUT
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID),
			@vSelectQuery NVARCHAR(MAX)

	DECLARE @var_Table TABLE(
		BannerId INT NOT NULL,
		FileName NVARCHAR(150),
		CreatedOn SMALLDATETIME NULL,
		CreatedBy VARCHAR(50) NULL,
		RowNum INT
	)

	BEGIN TRY
		IF OBJECT_ID('tempdb..##temp_Table') IS NOT NULL DROP TABLE ##temp_Table

		-- get row from and row to based on current page
		SELECT @vSelectQuery =  dbo.fn_GenerateDynamicQuery(@prCurrentPage, @prPageSize, @prSortColumn, @prSortInAsc)

		SELECT BannerId 
			,Filename
			,CreatedOn
			,CreatedBy
		INTO ##temp_Table
		FROM LoginPageBanner

		-- insert the dynamic query results into temp table
		INSERT INTO @var_Table
		EXEC SP_ExecuteSQL @vSelectQuery

		PRINT @vSelectQuery

		SELECT BannerId ,
				FileName,
				CreatedOn = FORMAT(CreatedOn, 'MM/dd/yyyy') ,
				CreatedBy
		FROM  @var_Table

		SELECT @oTotalRecord = COUNT(CreatedOn) FROM ##temp_Table

		DROP TABLE  ##temp_Table

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END