 
export class EditOrderFields {

public static fields = [
    {
        "fieldName": "applicationId",
        "displayText": "Application Id",
        "hidden": false,
        "groupName": "application",
        "dataFieldControl": {
            "controlName": "applicationId",
            "controlType": "label",
            "required": false,
            "maxLength": 0
        }
    },
    {
        "fieldName": "status",
        "displayText": "Status",
        "hidden": false,
        "groupName": "application",
        "dataFieldControl": {
            "controlName": "status",
            "controlType": "label",
            "required": false,
            "maxLength": 0,
        }
    },
    {
        "fieldName": "category",
        "displayText": "Product Category",
        "hidden": false,
        "groupName": "application",
        "dataFieldControl": {
            "controlName": "category",
            "controlType": "label",
            "required": false,
            "maxLength": 0,
        }
    },
    {
        "fieldName": "packageName",
        "displayText": "Product Package",
        "hidden": false,
        "groupName": "application",
        "dataFieldControl": {
            "controlName": "packageName",
            "controlType": "label",
            "required": false,
            "maxLength": 0
        }
    },
    {
        "fieldName": "agent",
        "displayText": "Agent Name",
        "hidden": false,
        "groupName": "application",
        "dataFieldControl": {
            "controlName": "agent",
            "controlType": "label",
            "required": false,
            "maxLength": 0,
        }
    },
    {
        "fieldName": "agentEmail",
        "displayText": "Agent Email",
        "hidden": false,
        "groupName": "application",
        "dataFieldControl": {
            "controlName": "agentEmail",
            "controlType": "label",
            "required": false,
            "maxLength": 0,
        }
    },
    {
        "fieldName": "companyName",
        "displayText": "Company Name",
        "hidden": false,
        "groupName": "application",
        "dataFieldControl": {
            "controlName": "companyName",
            "controlType": "textbox",
            "required": false,
            "maxLength": 100
        }
    },
    {
        "fieldName": "companyRegNo",
        "displayText": "Company Reg. No",
        "hidden": false,
        "groupName": "application",
        "dataFieldControl": {
            "controlName": "companyRegNo",
            "controlType": "textbox",
            "required": false,
            "maxLength": 25
        }
    },
    {
        "fieldName": "customerName",
        "displayText": "Customer Name",
        "hidden": false,
        "groupName": "application",
        "dataFieldControl": {
            "controlName": "customerName",
            "controlType": "textbox",
            "required": true,
            "maxLength": 50
        }
    },
    {
        "fieldName": "customerId",
        "displayText": "IC / Passport No.",
        "hidden": false,
        "groupName": "application",
        "dataFieldControl": {
            "controlName": "customerId",
            "controlType": "textbox",
            "required": true,
            "maxLength": 15
        }
    },
    {
        "fieldName": "residentialType",
        "displayText": "Residential Type",
        "hidden": false,
        "groupName": "application",
        "dataFieldControl": {
            "controlName": "residentialType",
            "controlType": "select",
            "required": true,
            "maxLength": 0,
            "datasourceUrl": "GetResidentialType"
        }
    },
    {
        "fieldName": "residentialName",
        "displayText": "Residential Name",
        "hidden": false,
        "groupName": "application",
        "dataFieldControl": {
            "controlName": "residentialName",
            "controlType": "textbox",
            "required": true,
            "maxLength": 50
        }
    },
    {
        "fieldName": "customerAddr",
        "displayText": "Customer Address",
        "hidden": false,
        "groupName": "application",
        "dataFieldControl": {
            "controlName": "customerAddr",
            "controlType": "textarea",
            "required": true,
            "maxLength": 150
        }
    },
    {
        "fieldName": "city",
        "displayText": "City",
        "hidden": false,
        "groupName": "application",
        "dataFieldControl": {
            "controlName": "city",
            "controlType": "textbox",
            "required": true,
            "maxLength": 50
        }
    },
    {
        "fieldName": "postcode",
        "displayText": "Postcode",
        "hidden": false,
        "groupName": "application",
        "dataFieldControl": {
            "controlName": "postcode",
            "controlType": "textbox",
            "required": true,
            "maxLength": 10
        }
    },
    {
        "fieldName": "state",
        "displayText": "State",
        "hidden": false,
        "groupName": "application",
        "dataFieldControl": {
            "controlName": "state",
            "controlType": "select",
            "required": true,
            "maxLength": 25,
            "datasourceUrl":  "GetStates"
        }
    },
    {
        "fieldName": "contactNo",
        "displayText": "Contact No",
        "hidden": false,
        "groupName": "application",
        "dataFieldControl": {
            "controlName": "contactNo",
            "controlType": "textbox",
            "required": true,
            "maxLength": 25
        }
    },
    {
        "fieldName": "email",
        "displayText": "Email",
        "hidden": false,
        "groupName": "application",
        "dataFieldControl": {
            "controlName": "email",
            "controlType": "textbox",
            "required": true,
            "maxLength": 35
        }
    },
    {
        "fieldName": "customerRemarks",
        "displayText": "Admin Remarks",
        "hidden": false,
        "groupName": "orderInfo",
        "dataFieldControl": {
            "controlName": "customerRemarks",
            "controlType": "textarea",
            "required": false,
            "maxLength": 500,
            "adminField": true
        }
    },
    {
        "fieldName": "submitByAgent",
        "displayText": "Submitted By Agent",
        "hidden": false,
        "groupName": "orderInfo",
        "dataFieldControl": {
            "controlName": "submitByAgent",
            "controlType": "checkbox",
            "required": false,
            "maxLength": 0
        }
    },
    {
        "fieldName": "orderNo",
        "displayText": "Order No",
        "hidden": false,
        "groupName": "orderInfo",
        "dataFieldControl": {
            "controlName": "orderNo",
            "controlType": "textbox",
            "required": false,
            "maxLength": 25,
            "datasourceUrl": null,
            "cascadeTo": null,
            "adminField": false
        }
    },
    {
        "fieldName": "userId",
        "displayText": "User Id",
        "hidden": false,
        "groupName": "orderInfo",
        "dataFieldControl": {
            "controlName": "userId",
            "controlType": "textbox",
            "required": false,
            "maxLength": 25,
            "datasourceUrl": null,
            "cascadeTo": null,
            "adminField": false
        }
    },
    {
        "fieldName": "telNo",
        "displayText": "Tel No",
        "hidden": false,
        "groupName": "orderInfo",
        "dataFieldControl": {
            "controlName": "telNo",
            "controlType": "textbox",
            "required": false,
            "maxLength": 25,
            "datasourceUrl": null,
            "cascadeTo": null,
            "adminField": false
        }
    },
    {
        "fieldName": "eForm",
        "displayText": "E-Form",
        "hidden": false,
        "groupName": "orderInfo",
        "dataFieldControl": {
            "controlName": "eForm",
            "controlType": "textbox",
            "required": false,
            "maxLength": 15,
            "datasourceUrl": null,
            "cascadeTo": null,
            "adminField": false
        }
    },
    {
        "fieldName": "documentCompleted",
        "displayText": "Document Completed",
        "hidden": false,
        "groupName": "orderInfo",
        "dataFieldControl": {
            "controlName": "documentCompleted",
            "controlType": "checkbox",
            "required": false,
            "maxLength": 25,
            "datasourceUrl": null,
            "cascadeTo": null,
            "adminField": true
        }
    },
    {
        "fieldName": "appStatusId",
        "displayText": "Status",
        "hidden": false,
        "groupName": "orderInfo",
        "dataFieldControl": {
            "controlName": "appStatusId",
            "controlType": "select",
            "required": false,
            "maxLength": 0,
            "datasourceUrl": "GetStatus",
            "cascadeTo": "",
            "adminField": true
        }
    },
]

}
