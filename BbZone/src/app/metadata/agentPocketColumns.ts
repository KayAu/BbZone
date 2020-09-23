

export class AgentPocketColumns {

    public static fields = [
        {
            "fieldName": "agentPktId",
            "headerText": "Id",
            "displayType": "text",
            "keyField": true,
            "colWidth": "cell-width-1",
            "dataFieldControl": {
                "controlName": "agentPktId",
                "controlType": "label",
                "required": false,
                "maxLength": 0
            }
        },
        {
            "fieldName": "agent",
            "headerText": "Agent",
            "displayType": "text",
            "keyField": false,
            "colWidth": "",
            "dataFieldControl": {
                "controlName": "agent",
                "controlType": "select",
                "required": true,
                "maxLength": 0,
                "datasourceUrl": "GetAgents"
            }
        },
        {
            "fieldName": "description",
            "headerText": "Description",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-25",
            "dataFieldControl": {
                "controlName": "description",
                "controlType": "textbox",
                "required": true,
                "maxLength": 250
            }
        },
        {
            "fieldName": "amount",
            "headerText": "Amount (RM)",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-10",
            "dataFieldControl": {
                "controlName": "amount",
                "controlType": "number",
                "required": true,
                "maxLength": 10
            }
        },
        {
            "fieldName": "flow",
            "headerText": "Transaction Type",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-10",
            "dataFieldControl": {
                "controlName": "flow",
                "controlType": "select",
                "required": true,
                "maxLength": 25,
                "datasourceUrl": "GetAgentPocketFlow"
            }
        },
        {
            "fieldName": "withdrawalId",
            "headerText": "Withdrawal Ref. No",
            "displayType": "text",
            "keyField": false,
            "colWidth": "",
            "dataFieldControl": {
                "controlName": "withdrawalId",
                "controlType": "number",
                "required": false,
                "maxLength": 5
            }
        },
        {
            "fieldName": "cancelled",
            "headerText": "Cancelled",
            "displayType": "tick",
            "keyField": false,
            "colWidth": "cell-width-1",
            "dataFieldControl": {
                "controlName": "cancelled",
                "controlType": "checkbox",
                "required": false,
                "maxLength": 0
            }
        },
        {
            "fieldName": "modifiedOn",
            "headerText": "Last Modified",
            "displayType": "date",
            "keyField": false,
            "colWidth": "cell-width-15",
            "dataFieldControl": {
                "controlName": "modifiedOn",
                "controlType": "date",
                "required": false,
                "maxLength": 0
            }
        },

    ]
}
