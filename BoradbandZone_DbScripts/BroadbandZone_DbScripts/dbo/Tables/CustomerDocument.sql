CREATE TABLE [dbo].[CustomerDocument] (
    [DocId]         INT            IDENTITY (1, 1) NOT NULL,
    [ApplicationId] INT            NOT NULL,
    [Name]          NVARCHAR (350) NOT NULL,
    [Size]          FLOAT (53)     NULL,
    CONSTRAINT [PK_CustomerDocument] PRIMARY KEY CLUSTERED ([DocId] ASC),
    CONSTRAINT [FK_CustomerDocument_CustomerApplication] FOREIGN KEY ([ApplicationId]) REFERENCES [dbo].[CustomerApplication] ([ApplicationId])
);





