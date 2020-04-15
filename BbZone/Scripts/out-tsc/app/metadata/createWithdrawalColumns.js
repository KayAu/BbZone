"use strict";
//SELECT ApplicationId,
//    CustomerName,
//    PackageName,
//    Category,
//    SubmittedOn = FORMAT(SubmittedOn, 'MM/dd/yyyy'),
//    ClaimAmount
Object.defineProperty(exports, "__esModule", { value: true });
var CreateWithdrawalColumns = /** @class */ (function () {
    function CreateWithdrawalColumns() {
    }
    CreateWithdrawalColumns.fields = [
        //{
        //  "fieldName": "applicationId",
        //  "headerText": "Id",
        //  "displayType": "text",
        //  "keyField": true,
        //  "hidden": true,
        //  "colWidth": "cell-width-1"
        //},
        {
            "fieldName": "transactionDetails",
            "headerText": "Transaction Details",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-30"
        },
        {
            "fieldName": "packageName",
            "headerText": "Product Package",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-25"
        },
        {
            "fieldName": "date",
            "headerText": "Date",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-10"
        },
        {
            "fieldName": "transactionType",
            "headerText": "Transaction Type",
            "displayType": "badge",
            "keyField": false,
            "colWidth": "cell-width-15"
        },
        {
            "fieldName": "claimAmount",
            "headerText": "Claim Amount (RM)",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-10"
        },
        {
            "fieldName": "deductAmount",
            "headerText": "Deduct Amount (RM)",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-10"
        }
    ];
    return CreateWithdrawalColumns;
}());
exports.CreateWithdrawalColumns = CreateWithdrawalColumns;
//# sourceMappingURL=createWithdrawalColumns.js.map