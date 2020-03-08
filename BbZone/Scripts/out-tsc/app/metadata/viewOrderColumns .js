"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewOrderColumns = /** @class */ (function () {
    function ViewOrderColumns() {
    }
    ViewOrderColumns.fields = [
        {
            "fieldName": "applicationId",
            "headerText": "Id",
            "displayType": "text",
            "keyField": true,
            "readonly": true,
            "colWidth": "cell-width-1"
        },
        {
            "fieldName": "customerName",
            "headerText": "Customer Name",
            "displayType": "text",
            "keyField": false,
            "readonly": false,
            "colWidth": "cell-width-30"
        },
        {
            "fieldName": "packageName",
            "headerText": "Product Package",
            "displayType": "text",
            "keyField": false,
            "readonly": false,
            "colWidth": "cell-width-30"
        },
        {
            "fieldName": "category",
            "headerText": "Category",
            "displayType": "text",
            "keyField": false,
            "readonly": false,
            "colWidth": ""
        },
        {
            "fieldName": "agent",
            "headerText": "Agent",
            "displayType": "text",
            "keyField": false,
            "readonly": false,
            "colWidth": "cell-width-10"
        },
        {
            "fieldName": "submittedOn",
            "headerText": "Submitted On",
            "displayType": "text",
            "keyField": false,
            "readonly": false,
            "colWidth": "cell-width-5"
        },
        {
            "fieldName": "status",
            "headerText": "Status",
            "displayType": "text",
            "keyField": false,
            "readonly": false,
            "colWidth": "cell-width-10"
        }
    ];
    return ViewOrderColumns;
}());
exports.ViewOrderColumns = ViewOrderColumns;
//# sourceMappingURL=viewOrderColumns .js.map