CREATE TABLE [dbo].[CustomerApplication] (
    [ApplicationId]     INT           IDENTITY (1, 1014) NOT NULL,
    [CategoryId]        INT           NULL,
    [ProdPkgId]         INT           NOT NULL,
    [Agent]             VARCHAR (25)  NOT NULL,
    [CompanyName]       VARCHAR (100) NULL,
    [CompanyRegNo]      VARCHAR (25)  NULL,
    [CustomerName]      VARCHAR (50)  NOT NULL,
    [CustomerId]        VARCHAR (15)  NOT NULL,
    [ResidentialType]   VARCHAR (30)  NULL,
    [ResidentialName]   VARCHAR (50)  NULL,
    [CustomerAddr]      VARCHAR (150) NOT NULL,
    [City]              VARCHAR (50)  NOT NULL,
    [Postcode]          VARCHAR (10)  NOT NULL,
    [State]             VARCHAR (25)  NOT NULL,
    [ContactNo]         VARCHAR (25)  NOT NULL,
    [Email]             VARCHAR (35)  NOT NULL,
    [CustomerRemarks]   VARCHAR (500) NULL,
    [AdminRemarks]      VARCHAR (500) NULL,
    [AppStatusId]       INT           NULL,
    [OrderNo]           VARCHAR (25)  NULL,
    [UserId]            VARCHAR (25)  NULL,
    [TelNo]             VARCHAR (15)  NULL,
    [SubmitByAgent]     BIT           NULL,
    [DocumentCompleted] BIT           NULL,
    [CreatedOn]         SMALLDATETIME NOT NULL,
    [CreatedBy]         VARCHAR (50)  NOT NULL,
    [ModifiedOn]        SMALLDATETIME NOT NULL,
    [ModifiedBy]        VARCHAR (50)  NOT NULL,
    CONSTRAINT [PK_CustomerApplication] PRIMARY KEY CLUSTERED ([ApplicationId] ASC),
    CONSTRAINT [FK_CustomerApplication_ApplicationStatus] FOREIGN KEY ([AppStatusId]) REFERENCES [dbo].[ApplicationStatus] ([AppStatusId]),
    CONSTRAINT [FK_CustomerApplication_ProductPackage] FOREIGN KEY ([ProdPkgId]) REFERENCES [dbo].[ProductPackage] ([ProdPkgId])
);













