"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ManagePackageColumns = /** @class */ (function () {
    function ManagePackageColumns() {
    }
    ManagePackageColumns.emptyFieldControl = {
        "controlName": "",
        "controlType": "label",
        "required": false,
        "maxLength": 0
    };
    ManagePackageColumns.fields = [
        {
            "fieldName": "prodPkgId",
            "headerText": "Id",
            "displayType": "text",
            "keyField": true,
            "colWidth": "cell-width-1",
            "dataFieldControl": {
                "controlName": "prodPkgId",
                "controlType": "label",
                "required": false,
                "maxLength": 0
            }
        },
        {
            "fieldName": "packageName",
            "headerText": "Package Name",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-20",
            "dataFieldControl": {
                "controlName": "packageName",
                "controlType": "textbox",
                "required": true,
                "maxLength": 150
            }
        },
        {
            "fieldName": "description",
            "headerText": "Description",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-40",
            "dataFieldControl": {
                "controlName": "description",
                "controlType": "textbox",
                "required": true,
                "maxLength": 300
            }
        },
        {
            "fieldName": "commission",
            "headerText": "Commission",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-10",
            "dataFieldControl": {
                "controlName": "commission",
                "controlType": "textbox",
                "required": true,
                "maxLength": 10
            }
        },
        {
            "fieldName": "category",
            "headerText": "Category",
            "displayType": "text",
            "keyField": false,
            "colWidth": "",
            "dataFieldControl": {
                "controlName": "categoryId",
                "controlType": "select",
                "required": true,
                "maxLength": 0,
                "datasourceUrl": "GetCategories"
            }
        },
        {
            "fieldName": "isActive",
            "headerText": "Active",
            "displayType": "tick",
            "keyField": false,
            "colWidth": "cell-width-1",
            "dataFieldControl": {
                "controlName": "isActive",
                "controlType": "checkbox",
                "required": false,
                "maxLength": 0
            }
        }
    ];
    return ManagePackageColumns;
}());
exports.ManagePackageColumns = ManagePackageColumns;
//# sourceMappingURL=managePackageColumns.js.map