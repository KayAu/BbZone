CREATE TABLE [dbo].[Bank] (
    [BankId]   INT           IDENTITY (1, 1) NOT NULL,
    [BankName] VARCHAR (250) NOT NULL,
    CONSTRAINT [PK_Bank] PRIMARY KEY CLUSTERED ([BankId] ASC)
);

