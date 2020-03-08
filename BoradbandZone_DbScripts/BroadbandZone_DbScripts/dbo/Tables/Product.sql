CREATE TABLE [dbo].[Product] (
    [ProductId]   INT           IDENTITY (1, 1) NOT NULL,
    [ProductName] VARCHAR (150) NOT NULL,
    [IsActive]    BIT           DEFAULT ((1)) NULL,
    [CreatedOn]   SMALLDATETIME NOT NULL,
    [CreatedBy]   VARCHAR (50)  NOT NULL,
    [ModifiedOn]  SMALLDATETIME NOT NULL,
    [ModifiedBy]  VARCHAR (50)  NOT NULL,
    PRIMARY KEY CLUSTERED ([ProductId] ASC),

);

