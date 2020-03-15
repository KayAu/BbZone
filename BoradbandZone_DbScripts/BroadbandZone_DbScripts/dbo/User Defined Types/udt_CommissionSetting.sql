CREATE TYPE [dbo].[udt_CommissionSetting] AS TABLE (
    [CategoryId]         INT          NULL,
    [Category]           VARCHAR (50) NULL,
    [SupCommission]      MONEY        NULL,
    [AgentCommissionPer] SMALLINT     NULL);

