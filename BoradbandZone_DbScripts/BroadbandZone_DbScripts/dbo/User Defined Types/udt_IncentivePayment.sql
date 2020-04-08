CREATE TYPE [dbo].[udt_IncentivePayment] AS TABLE (
    [CustomerName]  VARCHAR (100) NULL,
    [OrderNo]       VARCHAR (25)  NULL,
    [ActivatedDate] VARCHAR (25)  NULL,
    [Incentive]     MONEY         NULL);

