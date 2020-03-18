
 
export class ViewOrderColumns {

  public static fields = [
    {
      "fieldName": "applicationId",
      "headerText": "Id",
      "displayType": "text",
      "keyField": true,
      "readonly": true,
      "colWidth": "cell-width-1"
    },
    {
      "fieldName": "customerName",
      "headerText": "Customer Name",
      "displayType": "text",
      "keyField": false,
      "readonly": false,
      "colWidth": "cell-width-20"
    },
    {
        "fieldName": "packageName",
      "headerText": "Product Package",
      "displayType": "text",
      "keyField": false,
      "readonly": false,
      "colWidth": "cell-width-25"
      },
      {
          "fieldName": "category",
          "headerText": "Category",
          "displayType": "text",
          "keyField": false,
          "readonly": false,
          "colWidth": "cell-width-15"
      },
    {
        "fieldName": "agent",
        "headerText": "Agent",
        "displayType": "text",
        "keyField": false,
        "readonly": false,
        "colWidth": "cell-width-10"
    },
    {
      "fieldName": "submittedOn",
      "headerText": "Submitted On",
      "displayType": "text",
      "keyField": false,
      "readonly": false,
      "colWidth": "cell-width-5"
    },
    {
        "fieldName": "status",
        "headerText": "Status",
        "displayType": "text",
        "keyField": false,
        "readonly": false,
        "colWidth": ""
    }
  ]

}
