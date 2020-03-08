CREATE TABLE [dbo].[ProductCategory]
(
	[CategoryId] INT NOT NULL PRIMARY KEY IDENTITY, 
    [Category] VARCHAR(50) NOT NULL,
	[DefaultCommission] MONEY, 
    [IsActive] BIT NULL DEFAULT 1, 
    [CreatedOn] SMALLDATETIME NOT NULL, 
    [CreatedBy] VARCHAR(50) NOT NULL, 
    [ModifiedOn] SMALLDATETIME NOT NULL, 
    [ModifiedBy] VARCHAR(50) NOT NULL 
)
