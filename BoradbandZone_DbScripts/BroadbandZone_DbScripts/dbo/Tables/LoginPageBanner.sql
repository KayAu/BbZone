CREATE TABLE [dbo].[LoginPageBanner] (
    [BannerId]  INT            IDENTITY (1, 1) NOT NULL,
    [FilePath]  NVARCHAR (300) NOT NULL,
    [FileName]  VARCHAR (150)  NOT NULL,
    [CreatedOn] SMALLDATETIME  NOT NULL,
    [CreatedBy] VARCHAR (50)   NOT NULL,
    CONSTRAINT [PK_LoginPageBanner] PRIMARY KEY CLUSTERED ([BannerId] ASC)
);

