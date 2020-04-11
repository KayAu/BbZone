CREATE TABLE [dbo].[ProductCategory] (
    [CategoryId]        INT           IDENTITY (1, 1) NOT NULL,
    [ProductId]         INT           NULL,
    [Category]          VARCHAR (50)  NOT NULL,
    [DefaultCommission] MONEY         NULL,
    [CommissionPercent] SMALLINT      NULL,
    [CategoryType]      VARCHAR (25)  NULL,
    [IsActive]          BIT           CONSTRAINT [DF__tmp_ms_xx__IsAct__72C60C4A] DEFAULT ((1)) NULL,
    [CreatedOn]         SMALLDATETIME NOT NULL,
    [CreatedBy]         VARCHAR (50)  NOT NULL,
    [ModifiedOn]        SMALLDATETIME NOT NULL,
    [ModifiedBy]        VARCHAR (50)  NOT NULL,
    CONSTRAINT [PK__tmp_ms_x__19093A0B771480CF] PRIMARY KEY CLUSTERED ([CategoryId] ASC),
    CONSTRAINT [FK_ProductCategory_Product] FOREIGN KEY ([ProductId]) REFERENCES [dbo].[Product] ([ProductId])
);





