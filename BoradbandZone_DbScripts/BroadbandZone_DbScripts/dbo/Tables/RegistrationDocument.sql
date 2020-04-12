CREATE TABLE [dbo].[RegistrationDocument] (
    [DocId] INT            IDENTITY (1, 1) NOT NULL,
    [RegId] INT            NOT NULL,
    [Name]  NVARCHAR (150) NOT NULL,
    [Path]  NVARCHAR (350) NULL,
    [Size]  FLOAT (53)     NULL,
    CONSTRAINT [PK_RegistrationDocument] PRIMARY KEY CLUSTERED ([DocId] ASC),
    CONSTRAINT [FK_RegistrationDocument_Registration] FOREIGN KEY ([RegId]) REFERENCES [dbo].[Registration] ([RegId])
);

