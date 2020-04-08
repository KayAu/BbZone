"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SearchIncentiveFields = /** @class */ (function () {
    function SearchIncentiveFields() {
    }
    SearchIncentiveFields.fields = [
        {
            "fieldName": "keyword",
            "displayText": "Customer Name or Order No",
            "hidden": false,
            "dataFieldControl": {
                "controlName": "keyword",
                "controlType": "textbox",
                "required": false,
                "maxLength": 50
            }
        },
        {
            "fieldName": "productId",
            "displayText": "Product",
            "hidden": false,
            "dataFieldControl": {
                "controlName": "productId",
                "controlType": "select",
                "required": false,
                "maxLength": 0,
                "datasourceUrl": "GetProducts",
                "cascadeTo": "productCategoryId"
            }
        },
        {
            "fieldName": "productCategoryId",
            "displayText": "Product Category",
            "hidden": false,
            "dataFieldControl": {
                "controlName": "productCategoryId",
                "controlType": "cascadeDropdown",
                "required": false,
                "maxLength": 0,
                "datasourceUrl": "GetCategoriesByProduct",
                "cascadeTo": "productPackageId"
            }
        },
        {
            "fieldName": "productPackageId",
            "displayText": "Product Package",
            "hidden": false,
            "dataFieldControl": {
                "controlName": "productPackageId",
                "controlType": "cascadeDropdown",
                "required": false,
                "maxLength": 0,
                "datasourceUrl": "GetPackagesByCategory"
            }
        },
        {
            "fieldName": "receivedDate",
            "displayText": "Received Date",
            "hidden": false,
            "dataFieldControl": {
                "controlName": "receivedDate",
                "controlType": "dateRange",
                "required": false,
                "maxLength": 0
            }
        }
    ];
    return SearchIncentiveFields;
}());
exports.SearchIncentiveFields = SearchIncentiveFields;
//# sourceMappingURL=searchIncentiveFields.js.map