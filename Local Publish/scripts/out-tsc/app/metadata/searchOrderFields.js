"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SearchOrderFields = /** @class */ (function () {
    function SearchOrderFields() {
    }
    SearchOrderFields.fields = [
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
            "fieldName": "residentialType",
            "displayText": "Residential Type",
            "hidden": false,
            "dataFieldControl": {
                "controlName": "residentialType",
                "controlType": "select",
                "required": false,
                "maxLength": 0,
                "datasourceUrl": "GetResidentialType"
            }
        },
        {
            "fieldName": "residentialName",
            "displayText": "Residential Name",
            "hidden": false,
            "dataFieldControl": {
                "controlName": "residentialName",
                "controlType": "textbox",
                "required": false,
                "maxLength": 50
            }
        },
        {
            "fieldName": "agent",
            "displayText": "Agent",
            "hidden": false,
            "dataFieldControl": {
                "controlName": "agent",
                "controlType": "select",
                "required": false,
                "maxLength": 0,
                "datasourceUrl": "GetAgents"
            }
        },
        {
            "fieldName": "appStatusId",
            "displayText": "Status",
            "hidden": false,
            "dataFieldControl": {
                "controlName": "appStatusId",
                "controlType": "select",
                "required": false,
                "maxLength": 0,
                "datasourceUrl": "GetStatus"
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
        }
    ];
    return SearchOrderFields;
}());
exports.SearchOrderFields = SearchOrderFields;
//# sourceMappingURL=searchOrderFields.js.map