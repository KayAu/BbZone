CREATE TABLE [dbo].[SProcErrorLog]
(
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [varchar](50) NULL,
	[StoredProcedure] [varchar](50) NULL,
	[ErrorNumber] [int] NULL,
	[ErrorSeverity] [int] NULL,
	[ErrorState] [varchar](150) NULL,
	[ErrorProcedure] [varchar](500) NULL,
	[ErrorLine] [int] NULL,
	[ErrorMessage] [text] NULL,
	[ErrorDate] [smalldatetime] NULL
)
