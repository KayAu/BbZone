CREATE TABLE [dbo].[ApplicationRemark] (
    [RemarkId]      INT           IDENTITY (1, 1) NOT NULL,
    [ApplicationId] INT           NOT NULL,
    [CreatedOn]     SMALLDATETIME NOT NULL,
    [CreatedBy]     VARCHAR (50)  NOT NULL,
    [RemarkText]    VARCHAR (500) NOT NULL,
    PRIMARY KEY CLUSTERED ([RemarkId] ASC),
    CONSTRAINT [FK_ApplicationRemark_CustomerApplication] FOREIGN KEY ([ApplicationId]) REFERENCES [dbo].[CustomerApplication] ([ApplicationId])
);

