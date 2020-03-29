﻿CREATE TABLE [dbo].[ClaimableCommission] (
    [ClaimCommId]          INT           IDENTITY (1, 1) NOT NULL,
    [ApplicationId]        INT           NOT NULL,
    [AgentId]              INT           NOT NULL,
    [PackageCommOnDate]    MONEY         NOT NULL,
    [AgentCommOnDate]      SMALLINT      NOT NULL,
    [IsOverride]           BIT           NULL,
    [ClaimWithdrawalId]    INT           NULL,
    [DeductedWithdrawalId] INT           NULL,
    [DeductedOn]    SMALLDATETIME NULL,
    [CreatedOn]            SMALLDATETIME NOT NULL,
    [CreatedBy]            VARCHAR (50)  NOT NULL,
    CONSTRAINT [PK_ClaimableCommission] PRIMARY KEY CLUSTERED ([ClaimCommId] ASC),
    CONSTRAINT [FK_ClaimableCommission_ClaimableCommission] FOREIGN KEY ([ApplicationId]) REFERENCES [dbo].[CustomerApplication] ([ApplicationId])
);

