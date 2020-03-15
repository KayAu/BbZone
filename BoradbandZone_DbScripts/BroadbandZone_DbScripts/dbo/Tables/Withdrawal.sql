CREATE TABLE [dbo].[Withdrawal] (
    [WithdrawalId] INT           IDENTITY (1, 1) NOT NULL,
    [Agent]        VARCHAR (25)  NOT NULL,
    [Amount]       MONEY         NOT NULL,
    [GiroFee]      MONEY         NULL,
    [CreatedOn]    SMALLDATETIME NOT NULL,
    [CreatedBy]    VARCHAR (50)  NOT NULL,
    [IsCompleted]  BIT           NOT NULL,
    [CompletedOn]  SMALLDATETIME NULL,
    [CompletedBy]  VARCHAR (50)  NULL,
    [ReferenceNo]  VARCHAR (25)  NULL,
    PRIMARY KEY CLUSTERED ([WithdrawalId] ASC)
);

