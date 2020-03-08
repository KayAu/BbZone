CREATE TABLE [dbo].[ProductPackage] (
    [ProdPkgId]   INT           IDENTITY (1, 1) NOT NULL,
    [CategoryId]  INT           NOT NULL,
    [PackageName] VARCHAR (150) NOT NULL,
    [Description] VARCHAR (300) NOT NULL,
    [Commission]  MONEY         NOT NULL,
    [IsActive]    BIT           DEFAULT ((1)) NULL,
    [CreatedOn]   SMALLDATETIME NOT NULL,
    [CreatedBy]   VARCHAR (50)  NOT NULL,
    [ModifiedOn]  SMALLDATETIME NOT NULL,
    [ModifiedBy]  VARCHAR (50)  NOT NULL,
    PRIMARY KEY CLUSTERED ([ProdPkgId] ASC),
    CONSTRAINT [FK_Product_ProductCategory] FOREIGN KEY ([CategoryId]) REFERENCES [dbo].[ProductCategory] ([CategoryId])
);

