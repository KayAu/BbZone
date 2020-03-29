CREATE TABLE [dbo].[Clawback] (
    [ClawbackId]    INT           IDENTITY (1, 1) NOT NULL,
    [ApplicationId] INT           NOT NULL,
    [Remarks]       VARCHAR (200) NOT NULL,
    --[WithdrawalId]  INT           NULL,
    --[DeductedOn]    SMALLDATETIME NULL,
    [CreatedOn]     SMALLDATETIME NOT NULL,
    [CreatedBy]     VARCHAR (50)  NOT NULL,
    [ModifiedOn]    SMALLDATETIME NOT NULL,
    [ModifiedBy]    VARCHAR (50)  NOT NULL,
    CONSTRAINT [PK_Clawback] PRIMARY KEY CLUSTERED ([ClawbackId] ASC),
    CONSTRAINT [FK_Clawback_CustomerApplication] FOREIGN KEY ([ApplicationId]) REFERENCES [dbo].[CustomerApplication] ([ApplicationId])
);

