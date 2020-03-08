CREATE TABLE [dbo].[Table]
(
	[CategoryId] INT NOT NULL PRIMARY KEY IDENTITY, 
    [Category] VARCHAR(50) NULL,
	[DefaultCommission] DOUBLE ,
	IsActive BIT NULL

)
