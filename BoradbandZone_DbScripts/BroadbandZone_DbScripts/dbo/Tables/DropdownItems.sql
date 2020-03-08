CREATE TABLE [dbo].[DropdownItems] (
    [RecId]     INT           IDENTITY (1, 1) NOT NULL,
    [FieldName] VARCHAR (25)  NOT NULL,
    [Options]   VARCHAR (250) NOT NULL,
    CONSTRAINT [PK_DropdownItems] PRIMARY KEY CLUSTERED ([RecId] ASC)
);

