
 
export class ManageProductColumns {



public static fields = [
  {
    "fieldName": "productId",
    "headerText": "Id",
    "displayType": "text",
    "keyField": true,
    "readonly": true,
    "colWidth": "cell-width-1",
    "dataFieldControl": {
      "controlName": "productId",
      "controlType": "label",
      "required": false,
      "maxLength": 0
    }
  },
  {
    "fieldName": "productName",
    "headerText": "ProductName",
    "displayType": "text",
    "keyField": false,
    "readonly": false,
    "colWidth": "",
    "dataFieldControl": {
      "controlName": "productName",
      "controlType": "textbox",
      "required": true,
      "maxLength": 150
    }
  },
  {
    "fieldName": "isActive",
    "headerText": "Active",
    "displayType": "tick",
    "keyField": false,
    "readonly": false,
    "colWidth": "cell-width-5", 
    "dataFieldControl": {
      "controlName": "isActive",
      "controlType": "checkbox",
      "required": false,
      "maxLength": 0
    }
  }
]

}
