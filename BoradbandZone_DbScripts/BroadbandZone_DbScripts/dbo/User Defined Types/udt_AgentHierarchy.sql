CREATE TYPE [dbo].[udt_AgentHierarchy] AS TABLE (
    [AgentId]        INT           NULL,
    [AgentUsername]  NVARCHAR (16) NULL,
    [FullName]       VARCHAR (50)  NULL,
    [RootSuperiorId] INT           NULL,
    [SuperiorId]     INT           NULL,
    [AgentLevel]     INT           NULL);

