export class ViewIncentiveReceivedColumns {

    public static fields = [{
        "fieldName": "incPymntId",
        "headerText": "Id",
        "displayType": "text",
        "keyField": true,
        "colWidth": "cell-width-1",
        "dataFieldControl": {
                "controlName": "incPymntId",
                "controlType": "label",
                "required": false,
                "maxLength": 0
            }
        },
        {
            "fieldName": "customerName",
            "headerText": "Customer Name",
            "displayType": "text",
            "keyField": false,
            "colWidth": "col-width-20",
            "dataFieldControl": {
                "controlName": "customerName",
                "controlType": "customerFinder",
                "required": true,
                "maxLength": 50
            }
        },
        {
            "fieldName": "orderNo",
            "headerText": "OrderNo",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-10",
            "dataFieldControl": {
                "controlName": "orderNo",
                "controlType": "label",
                "required": false,
                "maxLength": 25
            }
        },
        {
            "fieldName": "packageName",
            "headerText": "Package",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-15",
            "dataFieldControl": {
                "controlName": "packageName",
                "controlType": "label",
                "required": false,
                "maxLength": 150
            }
        },
        {
            "fieldName": "category",
            "headerText": "Category",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-15",
            "dataFieldControl": {
                "controlName": "category",
                "controlType": "label",
                "required": false,
                "maxLength": 50
            }
        },
        {
            "fieldName": "productName",
            "headerText": "Product",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-15",
            "dataFieldControl": {
                "controlName": "productName",
                "controlType": "label",
                "required": false,
                "maxLength": 150
            }
        },
        {
            "fieldName": "incentiveAmt",
            "headerText": "Incentive (RM)",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-10",
            "dataFieldControl": {
                "controlName": "incentiveAmt",
                "controlType": "number",
                "required": true,
                "maxLength": 25
            }
        },
        {
            "fieldName": "createdOn",
            "headerText": "Received On",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-10",
            "dataFieldControl": {
                "controlName": "createdOn",
                "controlType": "label",
                "required": false,
                "maxLength": 25
            }
        }
    ]
}