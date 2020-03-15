CREATE TABLE [dbo].[AgentCommission] (
    [CommId]             INT           IDENTITY (1, 1) NOT NULL,
    [AgentId]            INT           NOT NULL,
    [CategoryId]         INT           NOT NULL,
    [AgentCommission]    SMALLINT      NOT NULL,
    [SuperiorCommission] SMALLINT      NOT NULL,
    [CreatedOn]          SMALLDATETIME NOT NULL,
    [CreatedBy]          VARCHAR (50)  NOT NULL,
    [ModifiedOn]         SMALLDATETIME NOT NULL,
    [ModifiedBy]         VARCHAR (50)  NOT NULL,
    CONSTRAINT [FK_AgentCommission_Agent] FOREIGN KEY ([AgentId]) REFERENCES [dbo].[Agent] ([AgentId]),
    CONSTRAINT [FK_AgentCommission_ProductCategory] FOREIGN KEY ([CategoryId]) REFERENCES [dbo].[ProductCategory] ([CategoryId])
);

