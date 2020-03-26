"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AgentChargesColumns = /** @class */ (function () {
    function AgentChargesColumns() {
    }
    AgentChargesColumns.fields = [
        {
            "fieldName": "chargeId",
            "headerText": "Id",
            "displayType": "text",
            "keyField": true,
            "colWidth": "cell-width-1",
            "dataFieldControl": {
                "controlName": "chargeId",
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
            "colWidth": "cell-width-30",
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
        }
    ];
    return AgentChargesColumns;
}());
exports.AgentChargesColumns = AgentChargesColumns;
//# sourceMappingURL=agentChargesColumns.js.map