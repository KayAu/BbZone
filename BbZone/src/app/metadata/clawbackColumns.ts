

export class ClawbackColumns {

    public static fields = [
        {
            "fieldName": "clawbackId",
            "headerText": "Id",
            "displayType": "text",
            "keyField": true,
            "colWidth": "cell-width-1",
            "dataFieldControl": {
                "controlName": "ClawbackId",
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
            "fieldName": "agent",
            "headerText": "Agent",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-10",
            "dataFieldControl": {
                "controlName": "agent",
                "controlType": "label",
                "required": false,
                "maxLength": 25
            }
        },
        {
            "fieldName": "transactionType",
            "headerText": "Transaction Type",
            "displayType": "badge",
            "keyField": false,
            "colWidth": "cell-width-10",
            "dataFieldControl": {
                "controlName": "transactionType",
                "controlType": "label",
                "required": false,
                "maxLength": 25
            }
        },
        {
            "fieldName": "remarks",
            "headerText": "Remarks",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-15",
            "dataFieldControl": {
                "controlName": "remarks",
                "controlType": "textbox",
                "required": true,
                "maxLength": 200
            }
        },
        {
            "fieldName": "deductAmount",
            "headerText": "Deduction Amount",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-10",
            "dataFieldControl": {
                "controlName": "deductedOn",
                "controlType": "label",
                "required": false,
                "maxLength": 20
            }
        },
        {
            "fieldName": "isDeducted",
            "headerText": "Deducted",
            "displayType": "tick",
            "keyField": false,
            "colWidth": "cell-width-5",
            "dataFieldControl": {
                "controlName": "isDeducted",
                "controlType": "label",
                "required": false,
                "maxLength": 20
            }
        },
        {
            "fieldName": "deductedOn",
            "headerText": "Deducted On",
            "displayType": "text",
            "keyField": false,
            "colWidth": "cell-width-7",
            "dataFieldControl": {
                "controlName": "deductedOn",
                "controlType": "label",
                "required": false,
                "maxLength": 20
            }
        },
        {
            "fieldName": "cancelled",
            "headerText": "Cancelled",
            "displayType": "tick",
            "keyField": false,
            "colWidth": "cell-width-5",
            "dataFieldControl": {
                "controlName": "cancelled",
                "controlType": "checkbox",
                "required": false,
                "maxLength": 0
            }
        },
        {
            "fieldName": "modifiedOn",
            "headerText": "Last Modified",
            "displayType": "date",
            "keyField": false,
            "colWidth": "cell-width-5",
            "dataFieldControl": {
                "controlName": "modifiedOn",
                "controlType": "date",
                "required": false,
                "maxLength": 20
            }
        }

     ]
}
