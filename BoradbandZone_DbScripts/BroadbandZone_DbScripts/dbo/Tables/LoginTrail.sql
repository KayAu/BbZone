CREATE TABLE [dbo].[LoginTrail] (
    [Id]        INT           IDENTITY (1, 1) NOT NULL,
    [AgentId]   INT           NULL,
    [LoginName] NVARCHAR (16) NOT NULL,
    [LoginDate] SMALLDATETIME NOT NULL,
    CONSTRAINT [PK_LoginTrail] PRIMARY KEY CLUSTERED ([Id] ASC)
);

