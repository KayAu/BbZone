CREATE TABLE [dbo].[WithdrawalItems] (
    [WithdrawalItemId]   INT           IDENTITY (1, 1) NOT NULL,
    [WithdrawalId]       INT           NULL,
    [ClaimCommId]        INT           NULL,
    [ApplicationId]      INT           NULL,
    [TransactionDetails] VARCHAR (250) NULL,
    [PackageName]        VARCHAR (150) NULL,
    [PackageComm]        MONEY         NULL,
    [AgentComm]          SMALLINT      NULL,
    [ClaimAmount]        MONEY         NULL,
    [DeductAmount]       MONEY         NULL,
    [TransactionType]    VARCHAR (50)  NULL,
    [TransactionDate]    VARCHAR (12)  NULL,
    CONSTRAINT [PK_WithdrawalItems] PRIMARY KEY CLUSTERED ([WithdrawalItemId] ASC),
    CONSTRAINT [FK_WithdrawalItems_Withdrawal] FOREIGN KEY ([WithdrawalId]) REFERENCES [dbo].[Withdrawal] ([WithdrawalId])
);



