CREATE TABLE [dbo].[Agent] (
    [AgentId]      INT             IDENTITY (1000, 1) NOT NULL,
    [Fullname]     VARCHAR (50)    NOT NULL,
    [Email]        VARCHAR (25)    NULL,
    [Nric]         VARCHAR (12)    NULL,
    [CompanyName]  VARCHAR (50)    NULL,
    [CompanyRegNo] VARCHAR (25)    NULL,
    [Address]      VARCHAR (150)   NULL,
    [City]         VARCHAR (50)    NULL,
    [State]        VARCHAR (25)    NULL,
    [Postcode]     CHAR (10)       NULL,
    [Country]      VARCHAR (25)    NULL,
    [MobileNo]     VARCHAR (15)    NULL,
    [TelNo]        VARCHAR (15)    NULL,
    [BankName]     VARCHAR (30)    NULL,
    [BankAccNo]    VARCHAR (20)    NULL,
    [UserLogin]    NVARCHAR (16)   NULL,
    [PasswordHash] VARBINARY (200) NULL,
    [SuperiorId]   INT             NULL,
    [IsActive]     BIT             NULL,
    [CreatedOn]    SMALLDATETIME   NULL,
    [CreatedBy]    VARCHAR (50)    NULL,
    [ModifiedOn]   SMALLDATETIME   NULL,
    [ModifiedBy]   VARCHAR (50)    NULL,
    CONSTRAINT [PK__tmp_ms_x__9AC3BFF1E7663EAE] PRIMARY KEY CLUSTERED ([AgentId] ASC)
);






