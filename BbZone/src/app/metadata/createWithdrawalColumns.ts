﻿//SELECT ApplicationId,
//    CustomerName,
//    PackageName,
//    Category,
//    SubmittedOn = FORMAT(SubmittedOn, 'MM/dd/yyyy'),
//    ClaimAmount
 
export class CreateWithdrawalColumns {

  public static fields = [
    //{
    //  "fieldName": "applicationId",
    //  "headerText": "Id",
    //  "displayType": "text",
    //  "keyField": true,
    //  "hidden": true,
    //  "colWidth": "cell-width-1"
    //},
    {
      "fieldName": "customerName",
      "headerText": "Customer Name",
      "displayType": "text",
      "keyField": false,
      "colWidth": "cell-width-30"
    },
    {
      "fieldName": "packageName",
      "headerText": "Product Package",
      "displayType": "text",
      "keyField": false,
      "colWidth": "cell-width-25"
    },
    {
        "fieldName": "category",
        "headerText": "Category",
        "displayType": "text",
        "keyField": false,
        "colWidth": "cell-width-15"
    },
    {
        "fieldName": "submittedOn",
        "headerText": "Submitted On",
        "displayType": "text",
        "keyField": false,
        "colWidth": "cell-width-15"
    },
    {
        "fieldName": "claimAmount",
        "headerText": "Claim Amount",
        "displayType": "text",
        "keyField": false,
        "colWidth": ""
    }
  ]

}
