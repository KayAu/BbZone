CREATE TABLE [dbo].[Withdrawal] (
    [WithdrawalId]     INT           IDENTITY (1, 1001) NOT NULL,
    [ClaimCommItemsId] VARCHAR (800) NOT NULL,
    [Agent]            NVARCHAR (16) NULL,
    [Amount]           MONEY         NULL,
    [ReferenceNo]      VARCHAR (25)  NULL,
    [Status]           VARCHAR (20)  NULL,
    [Remarks]          VARCHAR (250) NULL,
    [CompletedOn]      SMALLDATETIME NULL,
    [CompletedBy]      VARCHAR (50)  NULL,
    [CreatedOn]        SMALLDATETIME NOT NULL,
    [CreatedBy]        VARCHAR (50)  NOT NULL,
    [ModifiedOn]       SMALLDATETIME NOT NULL,
    [ModifiedBy]       VARCHAR (50)  NOT NULL,
    CONSTRAINT [PK__Withdraw__7C842C6EE2C59B26] PRIMARY KEY CLUSTERED ([WithdrawalId] ASC),
    CONSTRAINT [CK_WithdrawalStatus] CHECK ([Status]='Pending' OR [Status]='Processing' OR [Status]='Terminated' OR [Status]='Completed' OR [Status]='OnHold')
);





