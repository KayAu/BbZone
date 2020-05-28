"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AdminAccessColumns = /** @class */ (function () {
    function AdminAccessColumns() {
    }
    AdminAccessColumns.fields = [
        {
            "fieldName": "id",
            "headerText": "Id",
            "displayType": "text",
            "keyField": true,
            "colWidth": "cell-width-1",
            "dataFieldControl": {
                "controlName": "id",
                "controlType": "label",
                "required": false,
                "maxLength": 0
            }
        },
        {
            "fieldName": "fullname",
            "headerText": "Fullname",
            "displayType": "text",
            "keyField": false,
            "colWidth": "",
            "dataFieldControl": {
                "controlName": "fullname",
                "controlType": "textbox",
                "required": true,
                "maxLength": 50
            }
        },
        {
            "fieldName": "email",
            "headerText": "Email",
            "displayType": "text",
            "keyField": false,
            "colWidth": "",
            "dataFieldControl": {
                "controlName": "email",
                "controlType": "textbox",
                "required": true,
                "maxLength": 150
            }
        },
        {
            "fieldName": "userLogin",
            "headerText": "User Login",
            "displayType": "text",
            "keyField": false,
            "colWidth": "",
            "dataFieldControl": {
                "controlName": "userLogin",
                "controlType": "textbox",
                "required": true,
                "maxLength": 16
            }
        },
        {
            "fieldName": "password",
            "headerText": "Password",
            "displayType": "text",
            "keyField": false,
            "colWidth": "",
            "dataFieldControl": {
                "controlName": "password",
                "controlType": "textbox",
                "required": true,
                "maxLength": 16
            }
        },
        {
            "fieldName": "hasFullControl",
            "headerText": "Full Control",
            "displayType": "tick",
            "keyField": false,
            "colWidth": "cell-width-5",
            "dataFieldControl": {
                "controlName": "hasFullControl",
                "controlType": "checkbox",
                "required": false,
                "maxLength": 0
            }
        },
        {
            "fieldName": "isActive",
            "headerText": "Active",
            "displayType": "tick",
            "keyField": false,
            "colWidth": "cell-width-5",
            "dataFieldControl": {
                "controlName": "isActive",
                "controlType": "checkbox",
                "required": false,
                "maxLength": 0
            }
        }
    ];
    return AdminAccessColumns;
}());
exports.AdminAccessColumns = AdminAccessColumns;
//# sourceMappingURL=adminAccessColumns.js.map