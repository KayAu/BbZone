
CREATE FUNCTION [dbo].[fn_GenerateOrderByQuery]
(

	@prSortColumn VARCHAR(50),
	@prSortInAsc BIT
)
RETURNS VARCHAR(500)
AS
BEGIN
	DECLARE @vSelectQuery NVARCHAR(500)


	SELECT @prSortColumn = CASE WHEN ISNULL(@prSortColumn, '') = '' THEN 'CreatedOn' ELSE @prSortColumn END
	SELECT @prSortColumn = @prSortColumn + SPACE(1) + CASE WHEN @prSortInAsc = 1 THEN 'ASC' ELSE 'DESC' END

	--SELECT @vSelectQuery =  'SELECT *
	--						 FROM (SELECT *,
	--							   ROW_NUMBER() OVER (ORDER BY ' + @prSortColumn + ') AS RowNum FROM ##temp_Table) t
	--						 WHERE RowNum BETWEEN' + SPACE(1) + @vFromRow + SPACE(1) + 'AND' + SPACE(1) + @vToRow

	-- Return @vSelectQuerythe result of the function
	RETURN @prSortColumn

END