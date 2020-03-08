"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SearchOrderFields = /** @class */ (function () {
    function SearchOrderFields() {
    }
    SearchOrderFields.fields = [
        {
            "fieldName": "productId",
            "displayText": "Product",
            "readonly": false,
            "dataFieldControl": {
                "controlName": "productId",
                "controlType": "select",
                "required": false,
                "maxLength": 0,
                "datasourceUrl": "GetProducts"
            }
        },
        {
            "fieldName": "productCategoryId",
            "displayText": "Product Category",
            "readonly": false,
            "dataFieldControl": {
                "controlName": "productCategoryId",
                "controlType": "cascadeDropdown",
                "required": false,
                "maxLength": 0,
                "datasourceUrl": "GetCategoriesByProduct"
            }
        },
        {
            "fieldName": "productPackageId",
            "displayText": "Product Package",
            "readonly": false,
            "dataFieldControl": {
                "controlName": "productPackageId",
                "controlType": "cascadeDropdown",
                "required": false,
                "maxLength": 0,
                "datasourceUrl": "GetPackagesByCategory"
            }
        },
        {
            "fieldName": "orderStatusId",
            "displayText": "Status",
            "readonly": false,
            "dataFieldControl": {
                "controlName": "orderStatusId",
                "controlType": "select",
                "required": false,
                "maxLength": 0,
                "datasourceUrl": "GetStatus"
            }
        },
        {
            "fieldName": "agent",
            "displayText": "Agent",
            "readonly": false,
            "dataFieldControl": {
                "controlName": "agent",
                "controlType": "select",
                "required": false,
                "maxLength": 0,
                "datasourceUrl": "GetAgents"
            }
        },
        {
            "fieldName": "submittedDate",
            "displayText": "Submitted Date",
            "readonly": false,
            "dataFieldControl": {
                "controlName": "submittedDate",
                "controlType": "dateRange",
                "required": false,
                "maxLength": 0
            }
        }
    ];
    return SearchOrderFields;
}());
exports.SearchOrderFields = SearchOrderFields;
//# sourceMappingURL=searchOrderFields.js.map