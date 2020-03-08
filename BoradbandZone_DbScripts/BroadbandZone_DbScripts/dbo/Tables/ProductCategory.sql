CREATE TABLE [dbo].[ProductCategory] (
    [CategoryId]        INT           IDENTITY (1, 1) NOT NULL,
	[ProductId]	INT,
    [Category]          VARCHAR (50)  NOT NULL,
    [DefaultCommission] MONEY         NULL,
    [IsActive]          BIT           DEFAULT ((1)) NULL,
    [CreatedOn]         SMALLDATETIME NOT NULL,
    [CreatedBy]         VARCHAR (50)  NOT NULL,
    [ModifiedOn]        SMALLDATETIME NOT NULL,
    [ModifiedBy]        VARCHAR (50)  NOT NULL,
    PRIMARY KEY CLUSTERED ([CategoryId] ASC), 
    CONSTRAINT [FK_ProductCategory_Product] FOREIGN KEY ([ProductId]) REFERENCES [Product]([ProductId]) 
);

