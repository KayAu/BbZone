CREATE TABLE [dbo].[AnnouncementDocument] (
    [DocId]  INT            IDENTITY (1, 1) NOT NULL,
    [AnncId] INT            NOT NULL,
    [Name]   NVARCHAR (350) NOT NULL,
    [Size]   FLOAT (53)     NULL,
    CONSTRAINT [PK_AnnouncementDocument] PRIMARY KEY CLUSTERED ([DocId] ASC),
    CONSTRAINT [FK_AnnouncementDocument_Announcement] FOREIGN KEY ([AnncId]) REFERENCES [dbo].[Announcement] ([AnncId])
);

