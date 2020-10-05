
CREATE FUNCTION [dbo].[fn_GenerateDynamicQuery]
(
	@prCurrentPage INT,
	@prPageSize INT,
	@prSortColumn VARCHAR(50),
	@prSortInAsc BIT
)
RETURNS VARCHAR(500)
AS
BEGIN
	DECLARE @vFromRow VARCHAR(5),
			@vToRow VARCHAR(5),
			@vSelectQuery NVARCHAR(500)

	SELECT @vFromRow = CAST(((@prCurrentPage - 1) * @prPageSize) + 1 AS VARCHAR(5))
	SELECT @vToRow = CAST(CASE WHEN @prCurrentPage = 1 THEN @prPageSize 
	                          ELSE (((@prCurrentPage - 1) * @prPageSize)) + @prPageSize 
						  END AS VARCHAR(5))
	SELECT @prSortColumn = CASE WHEN ISNULL(@prSortColumn, '') = '' THEN 'CreatedOn' ELSE @prSortColumn END
	SELECT @prSortColumn = @prSortColumn + SPACE(1) + CASE WHEN @prSortInAsc = 1 THEN 'ASC' ELSE 'DESC' END

	SELECT @vSelectQuery =  'SELECT *
							 FROM (SELECT *,
								   ROW_NUMBER() OVER (ORDER BY ' + @prSortColumn + ') AS RowNum FROM ##temp_Table) t
							 WHERE RowNum BETWEEN' + SPACE(1) + @vFromRow + SPACE(1) + 'AND' + SPACE(1) + @vToRow

	-- Return the result of the function
	RETURN @vSelectQuery

END
