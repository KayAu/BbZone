"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NewAnnouncementFields = /** @class */ (function () {
    function NewAnnouncementFields() {
    }
    NewAnnouncementFields.fields = [
        {
            "fieldName": "title",
            "displayText": "Title",
            "hidden": false,
            "dataFieldControl": {
                "controlName": "title",
                "controlType": "textbox",
                "required": true,
                "maxLength": 200
            }
        },
        {
            "fieldName": "descriptions",
            "displayText": "Descriptions",
            "hidden": false,
            "dataFieldControl": {
                "controlName": "descriptions",
                "controlType": "textarea",
                "required": false,
                "maxLength": 500
            }
        },
        {
            "fieldName": "isActive",
            "displayText": "Is Active",
            "hidden": false,
            "dataFieldControl": {
                "controlName": "isActive",
                "controlType": "checkbox",
                "required": false
            }
        },
    ];
    return NewAnnouncementFields;
}());
exports.NewAnnouncementFields = NewAnnouncementFields;
var ViewAnnouncementColumns = /** @class */ (function () {
    function ViewAnnouncementColumns() {
    }
    ViewAnnouncementColumns.fields = [
        {
            "fieldName": "anncId",
            "headerText": "Annc Id",
            "displayType": "text",
            "keyField": true,
            "colWidth": "cell-width-1"
        },
        {
            "fieldName": "title",
            "headerText": "Title",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-50"
        },
        {
            "fieldName": "isActive",
            "headerText": "Is Active",
            "displayType": "tick",
            "keyField": false,
            "colWidth": "cell-width-10"
        },
        {
            "fieldName": "modifiedOn",
            "headerText": "Modified On",
            "displayType": "text",
            "keyField": false,
            "colWidth": ""
        },
        {
            "fieldName": "modifiedBy",
            "headerText": "Modified By",
            "displayType": "text",
            "keyField": false,
            "colWidth": ""
        }
    ];
    return ViewAnnouncementColumns;
}());
exports.ViewAnnouncementColumns = ViewAnnouncementColumns;
var EditAnnouncementFields = /** @class */ (function () {
    function EditAnnouncementFields() {
    }
    EditAnnouncementFields.fields = [
        {
            "fieldName": "anncId",
            "displayText": "Id",
            "hidden": false,
            "dataFieldControl": {
                "controlName": "anncId",
                "controlType": "label",
                "required": false,
                "maxLength": 0
            }
        },
        {
            "fieldName": "title",
            "displayText": "Title",
            "hidden": false,
            "dataFieldControl": {
                "controlName": "title",
                "controlType": "textbox",
                "required": true,
                "maxLength": 200
            }
        },
        {
            "fieldName": "descriptions",
            "displayText": "Descriptions",
            "hidden": false,
            "dataFieldControl": {
                "controlName": "descriptions",
                "controlType": "textarea",
                "required": false,
                "maxLength": 500
            }
        },
        {
            "fieldName": "isActive",
            "displayText": "Is Active",
            "hidden": false,
            "dataFieldControl": {
                "controlName": "isActive",
                "controlType": "checkbox",
                "required": false
            }
        }
    ];
    return EditAnnouncementFields;
}());
exports.EditAnnouncementFields = EditAnnouncementFields;
//# sourceMappingURL=announcementFields.js.map