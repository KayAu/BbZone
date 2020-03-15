"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ManageCategoryColumns = /** @class */ (function () {
    function ManageCategoryColumns() {
    }
    ManageCategoryColumns.fields = [
        {
            "fieldName": "categoryId",
            "headerText": "Id",
            "displayType": "text",
            "keyField": true,
            "readonly": true,
            "colWidth": "cell-width-1",
            "dataFieldControl": {
                "controlName": "categoryId",
                "controlType": "label",
                "required": false,
                "maxLength": 0
            }
        },
        {
            "fieldName": "category",
            "headerText": "Category",
            "displayType": "text",
            "keyField": false,
            "readonly": false,
            "colWidth": "cell-width-70",
            "dataFieldControl": {
                "controlName": "category",
                "controlType": "textbox",
                "required": true,
                "maxLength": 150
            }
        },
        {
            "fieldName": "defaultCommission",
            "headerText": "Default Commission (RM)",
            "displayType": "text",
            "keyField": false,
            "readonly": false,
            "colWidth": "",
            "dataFieldControl": {
                "controlName": "defaultCommission",
                "controlType": "textbox",
                "required": true,
                "maxLength": 10
            }
        },
        {
            "fieldName": "commissionPercent",
            "headerText": "Commission (%)",
            "displayType": "text",
            "keyField": false,
            "readonly": false,
            "colWidth": "",
            "dataFieldControl": {
                "controlName": "commissionPercent",
                "controlType": "number",
                "required": true,
                "maxLength": 5
            }
        },
        {
            "fieldName": "productName",
            "headerText": "Product",
            "displayType": "text",
            "keyField": false,
            "readonly": false,
            "colWidth": "",
            "dataFieldControl": {
                "controlName": "productId",
                "controlType": "select",
                "required": true,
                "maxLength": 0,
                "datasourceUrl": "GetProducts"
            }
        },
        {
            "fieldName": "isActive",
            "headerText": "Active",
            "displayType": "tick",
            "keyField": false,
            "readonly": false,
            "colWidth": "cell-width-1",
            "dataFieldControl": {
                "controlName": "isActive",
                "controlType": "checkbox",
                "required": false,
                "maxLength": 0
            }
        }
    ];
    return ManageCategoryColumns;
}());
exports.ManageCategoryColumns = ManageCategoryColumns;
//# sourceMappingURL=ManageCategoryColumns.js.map