CREATE TABLE [dbo].[ApplicationStatus] (
    [AppStatusId] INT          IDENTITY (1, 1) NOT NULL,
    [Status]   VARCHAR (25) NOT NULL,
    CONSTRAINT [PK_ApplicationStatus] PRIMARY KEY CLUSTERED ([AppStatusId] ASC)
);

