

CREATE FUNCTION [dbo].[fnSplit] (
	@SourceSql VARCHAR(MAX)
	,@StrSeprate VARCHAR(10)
	)
RETURNS @temp TABLE (ExtractedText VARCHAR(8000))

BEGIN
	DECLARE @i INT

	SET @SourceSql = rtrim(ltrim(@SourceSql))
	SET @i = charindex(@StrSeprate, @SourceSql)

	WHILE @i >= 1
	BEGIN
		INSERT @temp
		VALUES (left(@SourceSql, @i - 1))

		SET @SourceSql = substring(@SourceSql, @i + 1, len(@SourceSql) - @i)
		SET @SourceSql = rtrim(ltrim(@SourceSql))
		SET @i = charindex(@StrSeprate, @SourceSql)
	END

	IF @SourceSql <> '\'
		INSERT @temp
		VALUES (@SourceSql)

	RETURN
END