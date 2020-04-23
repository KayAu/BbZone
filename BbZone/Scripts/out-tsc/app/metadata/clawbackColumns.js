"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClawbackColumns = /** @class */ (function () {
    function ClawbackColumns() {
    }
    ClawbackColumns.fields = [
        {
            "fieldName": "clawbackId",
            "headerText": "Id",
            "displayType": "text",
            "keyField": true,
            "colWidth": "cell-width-1",
            "dataFieldControl": {
                "controlName": "ClawbackId",
                "controlType": "label",
                "required": false,
                "maxLength": 0
            }
        },
        {
            "fieldName": "customerName",
            "headerText": "Customer Name",
            "displayType": "text",
            "keyField": false,
            "colWidth": "col-width-20",
            "dataFieldControl": {
                "controlName": "customerName",
                "controlType": "customerFinder",
                "required": true,
                "maxLength": 50
            }
        },
        {
            "fieldName": "orderNo",
            "headerText": "OrderNo",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-10",
            "dataFieldControl": {
                "controlName": "orderNo",
                "controlType": "label",
                "required": false,
                "maxLength": 25
            }
        },
        {
            "fieldName": "agent",
            "headerText": "Agent",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-10",
            "dataFieldControl": {
                "controlName": "agent",
                "controlType": "label",
                "required": false,
                "maxLength": 25
            }
        },
        {
            "fieldName": "remarks",
            "headerText": "Remarks",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-45",
            "dataFieldControl": {
                "controlName": "remarks",
                "controlType": "textbox",
                "required": true,
                "maxLength": 200
            }
        },
        {
            "fieldName": "deductedOn",
            "headerText": "DeductedOn",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-10",
            "dataFieldControl": {
                "controlName": "deductedOn",
                "controlType": "label",
                "required": false,
                "maxLength": 20
            }
        }
    ];
    return ClawbackColumns;
}());
exports.ClawbackColumns = ClawbackColumns;
//# sourceMappingURL=clawbackColumns.js.map