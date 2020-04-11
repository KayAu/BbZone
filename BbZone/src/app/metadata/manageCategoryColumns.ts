

export class ManageCategoryColumns {

    public static fields = [
        {
            "fieldName": "categoryId",
            "headerText": "Id",
            "displayType": "text",
            "keyField": true,
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
            "colWidth": "cell-width-40",
            "dataFieldControl": {
                "controlName": "category",
                "controlType": "textbox",
                "required": true,
                "maxLength": 150
            }
        },
        {
            "fieldName": "categoryType",
            "headerText": "Category Type",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-10",
            "dataFieldControl": {
                "controlName": "categoryType",
                "controlType": "select",
                "required": true,
                "maxLength": 0,
                "datasourceUrl": "GetCategoryType"
            }
        },
        {
            "fieldName": "defaultCommission",
            "headerText": "Default Commission (RM)",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-15",
            "dataFieldControl": {
                "controlName": "defaultCommission",
                "controlType": "number",
                "required": true,
                "maxLength": 10
            }
        },
        {
            "fieldName": "commissionPercent",
            "headerText": "Commission (%)",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-10",
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
            "colWidth": "cell-width-5",
            "dataFieldControl": {
                "controlName": "isActive",
                "controlType": "checkbox",
                "required": false,
                "maxLength": 0
            }
        }]
}
