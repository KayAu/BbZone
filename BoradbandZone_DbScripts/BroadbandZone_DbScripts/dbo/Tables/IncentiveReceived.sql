CREATE TABLE [dbo].[IncentiveReceived] (
    [IncPymntId]    INT           IDENTITY (1000, 1) NOT NULL,
    [ApplicationId] INT           NOT NULL,
    [IncentiveAmt]  MONEY         NOT NULL,
    [IsActive]      BIT           NULL,
    [CreatedOn]     SMALLDATETIME NOT NULL,
    [CreatedBy]     VARCHAR (50)  NOT NULL,
    [ModifiedOn]    SMALLDATETIME NOT NULL,
    [ModifiedBy]    VARCHAR (50)  NOT NULL,
    CONSTRAINT [PK_IncentivePayment] PRIMARY KEY CLUSTERED ([IncPymntId] ASC),
    CONSTRAINT [FK_IncentivePayment_CustomerApplication] FOREIGN KEY ([ApplicationId]) REFERENCES [dbo].[CustomerApplication] ([ApplicationId])
);

