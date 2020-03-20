"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SearchWithdrawalFields = /** @class */ (function () {
    function SearchWithdrawalFields() {
    }
    SearchWithdrawalFields.fields = [
        {
            "fieldName": "agent",
            "displayText": "Agent",
            "hidden": false,
            "fieldForAdmin": true,
            "dataFieldControl": {
                "controlName": "agent",
                "controlType": "select",
                "required": false,
                "maxLength": 0,
                "datasourceUrl": "GetAgents",
            }
        },
        {
            "fieldName": "status",
            "displayText": "Status",
            "hidden": false,
            "dataFieldControl": {
                "controlName": "status",
                "controlType": "select",
                "required": false,
                "maxLength": 0,
                "datasourceUrl": "GetWithdrwalStatus"
            }
        },
        {
            "fieldName": "submittedDate",
            "displayText": "Submitted Date",
            "hidden": false,
            "dataFieldControl": {
                "controlName": "submittedDate",
                "controlType": "dateRange",
                "required": false,
                "maxLength": 0
            }
        },
        {
            "fieldName": "completedDate",
            "displayText": "Completed Date",
            "hidden": false,
            "dataFieldControl": {
                "controlName": "completedDate",
                "controlType": "dateRange",
                "required": false,
                "maxLength": 0
            }
        }
    ];
    return SearchWithdrawalFields;
}());
exports.SearchWithdrawalFields = SearchWithdrawalFields;
//# sourceMappingURL=searchWithdrawalFields.js.map