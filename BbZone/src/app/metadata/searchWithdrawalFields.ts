
 
export class SearchWithdrawalFields {
    public static fields = [
        {
            "fieldName": "agent",
            "displayText": "Agent",
            "hidden": false,
            "fieldForAdmin": true,
            "dataFieldControl": {
                "controlName": "agent",
                "controlType": "select",
                "required": false,
                "maxLength": 0,
                "datasourceUrl": "GetAgents",
            }
        },
        {
            "fieldName": "status",
            "displayText": "Status",
            "hidden": false,
            "dataFieldControl": {
                "controlName": "status",
                "controlType": "select",
                "required": false,
                "maxLength": 0,
                "datasourceUrl": "GetWithdrawalStatus"
            }  
        },
        {
            "fieldName": "submittedDate",
            "displayText": "Submitted Date",
            "hidden": false,
            "dataFieldControl": {
                "controlName": "submittedDate",
                "controlType": "dateRange",
                "required": false,
                "maxLength": 0
            }
        },
        {
            "fieldName": "completedDate",
            "displayText": "Completed Date",
            "hidden": false,
            "dataFieldControl": {
                "controlName": "completedDate",
                "controlType": "dateRange",
                "required": false,
                "maxLength": 0
            }
        }
    ]
}
