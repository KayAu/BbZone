 
export class EditOrderFields {

public static fields = [
    {
        "fieldName": "applicationId",
        "displayText": "Application Id",
        "hidden": true,
        "dataFieldControl": {
            "controlName": "applicationId",
            "controlType": "label",
            "required": false,
            "maxLength": 0
        }
    },
    {
        "fieldName": "categoryId",
        "displayText": "Product Category",
        "hidden": false,
        "dataFieldControl": {
            "controlName": "categoryId",
            "controlType": "select",
            "required": true,
            "maxLength": 0,
            "datasourceUrl": "GetCategories",
            "cascadeTo": "prodPkgId"
        }
    },
    {
        "fieldName": "prodPkgId",
        "displayText": "Product Package",
        "hidden": false,
        "dataFieldControl": {
            "controlName": "prodPkgId",
            "controlType": "cascadeDropdown",
            "required": true,
            "maxLength": 0,
            "datasourceUrl": "GetPackagesByCategory"
        }
    },
    {
        "fieldName": "agent",
        "displayText": "Agent Name",
        "hidden": false,
        "dataFieldControl": {
            "controlName": "agent",
            "controlType": "select",
            "required": true,
            "maxLength": 0,
            "datasourceUrl": "GetAgents"
        }
    },
    {
        "fieldName": "companyName",
        "displayText": "Company Name",
        "hidden": false,
        "dataFieldControl": {
            "controlName": "companyName",
            "controlType": "textbox",
            "required": false,
            "maxLength": 100
        }
    },
    {
        "fieldName": "companyRegNo",
        "displayText": "Company Registration No.",
        "hidden": false,
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
        "dataFieldControl": {
            "controlName": "customerName",
            "controlType": "textbox",
            "required": true,
            "maxLength": 50
        }
    },
    {
        "fieldName": "customerId",
        "displayText": "Customer IC / Passport No.",
        "hidden": false,
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
        "dataFieldControl": {
            "controlName": "customerAddr",
            "controlType": "textbox",
            "required": true,
            "maxLength": 150
        }
    },
    {
        "fieldName": "city",
        "displayText": "City",
        "hidden": false,
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
        "dataFieldControl": {
            "controlName": "email",
            "controlType": "textbox",
            "required": true,
            "maxLength": 35
        }
    },
    {
        "fieldName": "customerRemarks",
        "displayText": "Remarks",
        "hidden": false,
        "dataFieldControl": {
            "controlName": "customerRemarks",
            "controlType": "textarea",
            "required": false,
            "maxLength": 500
        }
    },
    {
        "fieldName": "submitByAgent",
        "displayText": "Submitted By Agent",
        "hidden": false,
        "dataFieldControl": {
            "controlName": "submitByAgent",
            "controlType": "checkbox",
            "required": false,
            "maxLength": 0
        }
    },
    {
        "fieldName": "appStatusId",
        "displayText": "Status",
        "hidden": false,
        "dataFieldControl": {
            "controlName": "appStatusId",
            "controlType": "select",
            "required": false,
            "maxLength": 0,
            "datasourceUrl": "GetStatus"
        }
    },
    {
        "fieldName": "orderNo",
        "displayText": "Order No",
        "hidden": false,
        "dataFieldControl": {
            "controlName": "orderNo",
            "controlType": "textbox",
            "required": false,
            "maxLength": 25
        }
    },
    {
        "fieldName": "userId",
        "displayText": "User Id",
        "hidden": false,
        "dataFieldControl": {
            "controlName": "userId",
            "controlType": "textbox",
            "required": false,
            "maxLength": 25
        }
    },
    {
        "fieldName": "telNo",
        "displayText": "Tel No",
        "hidden": false,
        "dataFieldControl": {
            "controlName": "userId",
            "controlType": "textbox",
            "required": false,
            "maxLength": 25
        }
    },
]

}
