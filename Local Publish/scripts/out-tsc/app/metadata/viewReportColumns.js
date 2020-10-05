"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewAgentSubmissionStatusColumns = /** @class */ (function () {
    function ViewAgentSubmissionStatusColumns() {
    }
    ViewAgentSubmissionStatusColumns.fields = [
        {
            "fieldName": "agentId",
            "headerText": "Id",
            "displayType": "text",
            "keyField": true,
            "colWidth": "cell-width-3"
        },
        {
            "fieldName": "agentLogin",
            "headerText": "Agent Login",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-10"
        },
        {
            "fieldName": "agentName",
            "headerText": "Agent Name",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-15"
        },
        {
            "fieldName": "agentLevel",
            "headerText": "Agent Level",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-3"
        },
        {
            "fieldName": "superiorId",
            "headerText": "Superior Id",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-5"
        },
        {
            "fieldName": "superiorLogin",
            "headerText": "Superior Login",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-10"
        },
        {
            "fieldName": "superiorName",
            "headerText": "Superior Name",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-15"
        },
        {
            "fieldName": "totalCompleted",
            "headerText": "TotalCompleted",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-5"
        },
        {
            "fieldName": "totalInProgress",
            "headerText": "Total InProgress",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-5"
        },
    ];
    return ViewAgentSubmissionStatusColumns;
}());
exports.ViewAgentSubmissionStatusColumns = ViewAgentSubmissionStatusColumns;
var ViewAgentWithdrawalColumns = /** @class */ (function () {
    function ViewAgentWithdrawalColumns() {
    }
    ViewAgentWithdrawalColumns.fields = [
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
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-10"
        },
        {
            "fieldName": "withdrawAmount",
            "headerText": "Withdraw Amount",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-5"
        },
        {
            "fieldName": "submittedOn",
            "headerText": "Submitted On",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-5"
        },
        {
            "fieldName": "approvedOn",
            "headerText": "Approved On",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-5"
        },
        {
            "fieldName": "applicationId",
            "headerText": "Application Id",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-3"
        },
        {
            "fieldName": "transactionDetails",
            "headerText": "Transaction Details",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-15"
        },
        {
            "fieldName": "packageName",
            "headerText": "Package Name",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-10"
        },
        {
            "fieldName": "packageComm",
            "headerText": "Package Comm",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-5"
        },
        {
            "fieldName": "agentComm",
            "headerText": "Agent Comm",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-5"
        },
        {
            "fieldName": "claimAmount",
            "headerText": "Claim Amount",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-5"
        },
        {
            "fieldName": "deductAmount",
            "headerText": "Deduct Amount",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-5"
        },
        {
            "fieldName": "transactionType",
            "headerText": "Transaction Type",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-5"
        },
        {
            "fieldName": "transactionDate",
            "headerText": "Transaction Date",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-5"
        },
    ];
    return ViewAgentWithdrawalColumns;
}());
exports.ViewAgentWithdrawalColumns = ViewAgentWithdrawalColumns;
//    , ClaimAmount
//    , DeductAmount
//    , TransactionType
//    , TransactionDate
//# sourceMappingURL=viewReportColumns.js.map