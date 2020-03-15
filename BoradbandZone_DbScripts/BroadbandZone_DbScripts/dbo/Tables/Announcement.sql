CREATE TABLE [dbo].[Announcement] (
    [AnncId]       INT            IDENTITY (1, 1) NOT NULL,
    [Title]        NVARCHAR (200) NOT NULL,
    [Descriptions] NVARCHAR (500) NULL,
    [FilePath]     NVARCHAR (300) NULL,
    [IsActive]     BIT            NULL,
    [CreatedOn]    SMALLDATETIME  NOT NULL,
    [CreatedBy]    VARCHAR (50)   NOT NULL,
    [ModifiedOn]   SMALLDATETIME  NOT NULL,
    [ModifiedBy]   VARCHAR (50)   NOT NULL,
    CONSTRAINT [PK_Announcement] PRIMARY KEY CLUSTERED ([AnncId] ASC)
);

