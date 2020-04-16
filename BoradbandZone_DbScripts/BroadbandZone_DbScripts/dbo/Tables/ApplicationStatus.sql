CREATE TABLE [dbo].[ApplicationStatus] (
    [AppStatusId] INT          IDENTITY (1, 1) NOT NULL,
    [Status]      VARCHAR (35) NOT NULL,
    [AllowEdit]   BIT          NOT NULL,
    CONSTRAINT [PK_ApplicationStatus] PRIMARY KEY CLUSTERED ([AppStatusId] ASC)
);





