CREATE TABLE [dbo].[Registration] (
    [RegId]          INT             IDENTITY (1, 1) NOT NULL,
    [Fullname]       VARCHAR (50)    NOT NULL,
    [Email]          VARCHAR (25)    NOT NULL,
    [Nric]           VARCHAR (12)    NOT NULL,
    [CompanyName]    VARCHAR (50)    NULL,
    [CompanyRegNo]   VARCHAR (25)    NULL,
    [Address]        VARCHAR (150)   NOT NULL,
    [City]           VARCHAR (50)    NOT NULL,
    [State]          VARCHAR (25)    NOT NULL,
    [Postcode]       CHAR (10)       NOT NULL,
    [Country]        VARCHAR (25)    NOT NULL,
    [MobileNo]       VARCHAR (15)    NOT NULL,
    [TelNo]          VARCHAR (15)    NULL,
    [UserLogin]      NVARCHAR (16)   NOT NULL,
    [PasswordHash]   VARBINARY (200) NOT NULL,
    [SuperiorId]     INT             NULL,
    [ActivationCode] VARCHAR (100)   NULL,
    [ActivatedOn]    SMALLDATETIME   NULL,
    [IsApproved]     BIT             NULL,
    [ApprovalDate]   SMALLDATETIME   NULL,
    [ApprovedBy]     VARCHAR (50)    NULL,
    [CreatedOn]      SMALLDATETIME   NULL,
    CONSTRAINT [PK__Registra__2C6822F899376830] PRIMARY KEY CLUSTERED ([RegId] ASC)
);




