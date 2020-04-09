CREATE TABLE [dbo].[Communication] (
    [CommId]        INT            IDENTITY (1, 1) NOT NULL,
    [ApplicationId] INT            NOT NULL,
    [Message]       NVARCHAR (MAX) NOT NULL,
    [Role]          CHAR (2)       NOT NULL,
    [MsgRead]       BIT            NOT NULL,
    [CreatedOn]     SMALLDATETIME  NOT NULL,
    [CreatedBy]     VARCHAR (50)   NOT NULL,
    CONSTRAINT [PK_Communication] PRIMARY KEY CLUSTERED ([CommId] ASC),
    CONSTRAINT [FK_Communication_CustomerApplication] FOREIGN KEY ([ApplicationId]) REFERENCES [dbo].[CustomerApplication] ([ApplicationId])
);



