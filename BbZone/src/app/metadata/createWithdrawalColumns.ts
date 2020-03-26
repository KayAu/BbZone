//SELECT ApplicationId,
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
        "fieldName": "transactionDetails",
        "headerText": "Transaction Details",
        "displayType": "text",
        "keyField": false,
        "colWidth": "cell-width-25"
    },
    {
        "fieldName": "packageName",
        "headerText": "Product Package",
        "displayType": "text",
        "keyField": false,
        "colWidth": "cell-width-20"
    },
    {
        "fieldName": "category",
        "headerText": "Category",
        "displayType": "text",
        "keyField": false,
        "colWidth": "cell-width-15"
    },
    {
        "fieldName": "date",
        "headerText": "Date",
        "displayType": "text",
        "keyField": false,
        "colWidth": "cell-width-10"
    },
    {
        "fieldName": "claimAmount",
        "headerText": "Claim Amount (RM)",
        "displayType": "text",
        "keyField": false,
        "colWidth": "cell-width-10"
      },
      {
          "fieldName": "deductAmount",
          "headerText": "Deduct Amount (RM)",
          "displayType": "text",
          "keyField": false,
          "colWidth": "cell-width-10"
      }
  ]

}
