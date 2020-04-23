CREATE TABLE [dbo].[AgentPocket] (
    [AgentPktId]     INT           IDENTITY (1, 1) NOT NULL,
    [Agent]        NVARCHAR (16) NOT NULL,
    [Amount]       MONEY         NOT NULL,
    [Description]  VARCHAR (250) NOT NULL,
    [WithdrawalId] INT           NULL,
	[Flow] CHAR(3) NULL,
    [Cancelled]    BIT           NULL,
    [CreatedOn]    SMALLDATETIME NOT NULL,
    [CreatedBy]    VARCHAR (50)  NOT NULL,
    [ModifiedOn]   SMALLDATETIME NOT NULL,
    [ModifiedBy]   VARCHAR (50)  NOT NULL,
    CONSTRAINT [PK_AgentPocket] PRIMARY KEY CLUSTERED ([AgentPktId] ASC),
    CONSTRAINT [FK_AgentPocket_Withdrawal] FOREIGN KEY ([WithdrawalId]) REFERENCES [dbo].[Withdrawal] ([WithdrawalId])
);

