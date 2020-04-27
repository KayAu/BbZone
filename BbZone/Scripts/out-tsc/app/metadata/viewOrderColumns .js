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
            "colWidth": "cell-width-1"
        },
        {
            "fieldName": "customerName",
            "headerText": "Customer Name",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-20"
        },
        {
            "fieldName": "residentialName",
            "headerText": "Residential Name",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-15"
        },
        {
            "fieldName": "packageName",
            "headerText": "Product Package",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-20"
        },
        {
            "fieldName": "category",
            "headerText": "Category",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-15"
        },
        {
            "fieldName": "orderNo",
            "headerText": "Order No",
            "displayType": "text",
            "keyField": false,
            "colWidth": ""
        },
        {
            "fieldName": "agent",
            "headerText": "Agent",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-10"
        },
        {
            "fieldName": "submittedOn",
            "headerText": "Submitted On",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-5"
        },
        {
            "fieldName": "status",
            "headerText": "Status",
            "displayType": "badge",
            "keyField": false,
            "colWidth": ""
        }
    ];
    return ViewOrderColumns;
}());
exports.ViewOrderColumns = ViewOrderColumns;
//# sourceMappingURL=viewOrderColumns .js.map