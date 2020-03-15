export class NewAnnouncementFields {
    public static fields = [
        {
            "fieldName": "title",
            "displayText": "Title",
            "readonly": false,
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
            "readonly": false,
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
            "readonly": false,
            "dataFieldControl": {
                "controlName": "isActive",
                "controlType": "checkbox",
                "required": false
            }
        },


    ]
}

export class ViewAnnouncementColumns {
    public static fields = [
        {
            "fieldName": "anncId",
            "headerText": "Annc Id",
            "displayType": "text",
            "keyField": true,
            "readonly": false,
            "colWidth": "cell-width-1"
        },
        {
            "fieldName": "title",
            "headerText": "Title",
            "displayType": "text",
            "keyField": false,
            "readonly": false,
            "colWidth": "cell-width-50"
        },
        {
            "fieldName": "isActive",
            "headerText": "Is Active",
            "displayType": "tick",
            "keyField": false,
            "readonly": false,
            "colWidth": "cell-width-10"
        },
        {
            "fieldName": "modifiedOn",
            "headerText": "Modified On",
            "displayType": "text",
            "keyField": false,
            "readonly": false,
            "colWidth": ""
        },
        {
            "fieldName": "modifiedBy",
            "headerText": "Modified By",
            "displayType": "text",
            "keyField": false,
            "readonly": false,
            "colWidth": ""
        }
    ]
}

export class EditAnnouncementFields {
    public static fields = [
        {
            "fieldName": "anncId",
            "displayText": "Id",
            "readonly": true,
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
            "readonly": false,
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
            "readonly": false,
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
            "readonly": false,
            "dataFieldControl": {
                "controlName": "isActive",
                "controlType": "checkbox",
                "required": false
            }
        }

    ]
}
