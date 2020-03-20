CREATE TABLE [dbo].[AdminUser] (
    [Id]             INT             IDENTITY (1, 1) NOT NULL,
    [Fullname]       VARCHAR (50)    NOT NULL,
    [UserLogin]      VARCHAR (16)    NOT NULL,
    [PasswordHash]   VARBINARY (200) NOT NULL,
    [HasFullControl] BIT             NOT NULL,
    [CreatedOn]      SMALLDATETIME   NULL,
    [CreatedBy]      VARCHAR (50)    NULL,
    CONSTRAINT [PK_AdminUser] PRIMARY KEY CLUSTERED ([Id] ASC)
);



