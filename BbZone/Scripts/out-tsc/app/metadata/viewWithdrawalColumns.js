"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewWithdrawalColumns = /** @class */ (function () {
    function ViewWithdrawalColumns() {
    }
    ViewWithdrawalColumns.fields = [
        {
            "fieldName": "withdrawalId",
            "headerText": "Id",
            "displayType": "text",
            "keyField": true,
            "colWidth": "cell-width-3"
        },
        {
            "fieldName": "agent",
            "headerText": "Agent",
            "displayType": "amount",
            "keyField": false,
            "colWidth": "cell-width-30"
        },
        {
            "fieldName": "amount",
            "headerText": "Amount",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-15"
        },
        {
            "fieldName": "status",
            "headerText": "Status",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-10"
        },
        {
            "fieldName": "referenceNo",
            "headerText": "Reference No",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-10"
        },
        {
            "fieldName": "createdOn",
            "headerText": "Submitted On",
            "displayType": "text",
            "keyField": false,
            "colWidth": ""
        },
        {
            "fieldName": "completedOn",
            "headerText": "Completed On",
            "displayType": "text",
            "keyField": false,
            "colWidth": ""
        },
    ];
    return ViewWithdrawalColumns;
}());
exports.ViewWithdrawalColumns = ViewWithdrawalColumns;
//# sourceMappingURL=viewWithdrawalColumns.js.map