CREATE TABLE [dbo].[ErrorCategoryLog] (
    [ErrorCategoryLogID] INT IDENTITY (1, 1) NOT NULL,
    [CategoryID]         INT NOT NULL,
    [LogID]              INT NOT NULL,
    CONSTRAINT [PK_ErrorCategoryLog] PRIMARY KEY CLUSTERED ([ErrorCategoryLogID] ASC),
    CONSTRAINT [FK_ErrorCategoryLog_AppErrorLog] FOREIGN KEY ([LogID]) REFERENCES [dbo].[AppErrorLog] ([LogID]) ON DELETE CASCADE
);

