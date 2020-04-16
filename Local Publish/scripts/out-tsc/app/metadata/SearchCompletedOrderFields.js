"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SearchCompletedOrderFields = /** @class */ (function () {
    function SearchCompletedOrderFields() {
    }
    SearchCompletedOrderFields.fields = [
        {
            "fieldName": "productId",
            "displayText": "Product",
            "width": "col-sm-2",
            "dataFieldControl": {
                "controlName": "productId",
                "controlType": "select",
                "maxLength": 0,
                "datasourceUrl": "GetProducts",
                "cascadeTo": "productCategoryId"
            }
        },
        {
            "fieldName": "productCategoryId",
            "displayText": "Product Category",
            "width": "col-sm-2",
            "dataFieldControl": {
                "controlName": "productCategoryId",
                "controlType": "cascadeDropdown",
                "maxLength": 0,
                "datasourceUrl": "GetCategoriesByProduct",
                "cascadeTo": "productPackageId"
            }
        },
        {
            "fieldName": "productPackageId",
            "displayText": "Product Package",
            "width": "col-sm-2",
            "dataFieldControl": {
                "controlName": "productPackageId",
                "controlType": "cascadeDropdown",
                "maxLength": 0,
                "datasourceUrl": "GetPackagesByCategory"
            }
        },
        {
            "fieldName": "agent",
            "displayText": "Agent",
            "width": "col-sm-2",
            "dataFieldControl": {
                "controlName": "agent",
                "controlType": "select",
                "maxLength": 0,
                "datasourceUrl": "GetAgents"
            }
        },
        {
            "fieldName": "activatedDate",
            "displayText": "Activated Date",
            "width": "col-sm-2",
            "dataFieldControl": {
                "controlName": "activatedDate",
                "controlType": "dateRange",
                "maxLength": 0
            }
        },
        {
            "fieldName": "paymentDate",
            "displayText": "Payment Date",
            "width": "col-sm-2",
            "dataFieldControl": {
                "controlName": "paymentDate",
                "controlType": "dateRange",
                "maxLength": 0
            }
        },
        {
            "fieldName": "keyword",
            "displayText": "Keyword",
            "width": "col-sm-4",
            "dataFieldControl": {
                "controlName": "keyword",
                "controlType": "textbox",
                "maxLength": 100,
                "placeholder": "Customer name, residential name or order no"
            }
        },
        {
            "fieldName": "documentCompleted",
            "displayText": "Doc. Completed",
            "width": "col-sm-2",
            "dataFieldControl": {
                "controlName": "documentCompleted",
                "controlType": "select",
                "maxLength": 0,
                "datasourceUrl": "GetDocStatus"
            }
        },
        {
            "fieldName": "commissionStatus",
            "displayText": "Commission Status",
            "width": "col-sm-2",
            "dataFieldControl": {
                "controlName": "commissionStatus",
                "controlType": "select",
                "maxLength": 0,
                "datasourceUrl": "GetCommissionStatus"
            }
        }
    ];
    return SearchCompletedOrderFields;
}());
exports.SearchCompletedOrderFields = SearchCompletedOrderFields;
//# sourceMappingURL=SearchCompletedOrderFields.js.map