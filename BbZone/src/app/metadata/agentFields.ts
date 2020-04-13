export class AgentRegistrationFields {
    public static fields =
        [
            {
                "fieldName": "fullname",
                "displayText": "Full Name",
                "hidden": false,
                "dataFieldControl": {
                    "controlName": "fullname",
                    "controlType": "textbox",
                    "required": true,
                    "maxLength": 50
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
                    "maxLength": 25
                }
            },
            {
                "fieldName": "nric",
                "displayText": "NRIC",
                "hidden": false,
                "dataFieldControl": {
                    "controlName": "nric",
                    "controlType": "textbox",
                    "required": true,
                    "maxLength": 12
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
                    "maxLength": 50
                }
            },
            {
                "fieldName": "companyRegNo",
                "displayText": "Company Reg. No",
                "hidden": false,
                "dataFieldControl": {
                    "controlName": "companyRegNo",
                    "controlType": "textbox",
                    "required": false,
                    "maxLength": 25
                }
            },
            {
                "fieldName": "address",
                "displayText": "Address",
                "hidden": false,
                "dataFieldControl": {
                    "controlName": "address",
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
                "fieldName": "state",
                "displayText": "State",
                "hidden": false,
                "dataFieldControl": {
                    "controlName": "state",
                    "controlType": "select",
                    "required": true,
                    "maxLength": 25,
                    "datasourceUrl": "GetStates"
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
                "fieldName": "country",
                "displayText": "Country",
                "hidden": false,
                "dataFieldControl": {
                    "controlName": "country",
                    "controlType": "textbox",
                    "required": true,
                    "maxLength": 25
                }
            },
            {
                "fieldName": "mobileNo",
                "displayText": "Mobile No",
                "hidden": false,
                "dataFieldControl": {
                    "controlName": "mobileNo",
                    "controlType": "textbox",
                    "required": true,
                    "maxLength": 15
                }
            },
            {
                "fieldName": "telNo",
                "displayText": "Tel No",
                "hidden": false,
                "dataFieldControl": {
                    "controlName": "telNo",
                    "controlType": "textbox",
                    "required": false,
                    "maxLength": 15
                }
            },
            {
                "fieldName": "bankName",
                "displayText": "Bank Name",
                "hidden": false,
                "dataFieldControl": {
                    "controlName": "bankName",
                    "controlType": "textbox",
                    "required": true,
                    "maxLength": 30
                }
            },
            {
                "fieldName": "bankAccNo",
                "displayText": "Bank Acc No",
                "hidden": false,
                "dataFieldControl": {
                    "controlName": "bankAccNo",
                    "controlType": "textbox",
                    "required": true,
                    "maxLength": 20
                }
            },
            {
                "fieldName": "superiorId",
                "displayText": "Superior Id",
                "hidden": false,
                "dataFieldControl": {
                    "controlName": "superiorId",
                    "controlType": "number",
                    "required": false,
                    "maxLength": 10
                }
            },
            {
                "fieldName": "userLogin",
                "displayText": "User Login",
                "hidden": false,
                "dataFieldControl": {
                    "controlName": "userLogin",
                    "controlType": "textbox",
                    "required": false,
                    "maxLength": 16
                }
            },
            {
                "fieldName": "password",
                "displayText": "Password",
                "hidden": false,
                "dataFieldControl": {
                    "controlName": "password",
                    "controlType": "password",
                    "required": false,
                    "maxLength": 15
                }
            }
        ]
}

export class AgentRegistrationColumns {
    public static fields = [
        {
            "fieldName": "regId",
            "headerText": "Reg Id",
            "displayType": "text",
            "keyField": true,
            "readonly": true,
            "colWidth": "cell-width-1"
        },
        {
            "fieldName": "fullname",
            "headerText": "Fullname",
            "displayType": "text",
            "keyField": false,
            "readonly": true,
            "colWidth": "cell-width-20"
        },
        {
            "fieldName": "companyName",
            "headerText": "Company Name",
            "displayType": "text",
            "keyField": false,
            "readonly": true,
            "colWidth": "cell-width-20"
        },
        {
            "fieldName": "mobileNo",
            "headerText": "Mobile No",
            "displayType": "text",
            "keyField": false,
            "readonly": true,
            "colWidth": "cell-width-10"
        },
        {
            "fieldName": "telNo",
            "headerText": "Tel No",
            "displayType": "text",
            "keyField": false,
            "readonly": true,
            "colWidth": "cell-width-10"
        },
        {
            "fieldName": "createdOn",
            "headerText": "Registered On",
            "displayType": "text",
            "keyField": false,
            "readonly": true,
            "colWidth": "cell-width-10"
        },
        {
            "fieldName": "isApproved",
            "headerText": "Is Approved",
            "displayType": "tick",
            "keyField": false,
            "readonly": true,
            "colWidth": "cell-width-5"
        },
        {
            "fieldName": "approvalDate",
            "headerText": "Approval Date",
            "displayType": "text",
            "keyField": false,
            "readonly": true,
            "colWidth": "cell-width-10"
        },
        {
            "fieldName": "approvedBy",
            "headerText": "Approved By",
            "displayType": "text",
            "keyField": false,
            "readonly": true,
            "colWidth": "cell-width-10"
        }
    ]
}

export class AgentRegistrationViewFields {
    public static fields =
        [
            {
                "fieldName": "fullname",
                "displayText": "Full Name",
                "hidden": false,
                "dataFieldControl": {
                    "controlName": "fullname",
                    "controlType": "textbox",
                    "required": true,
                    "maxLength": 50
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
                    "maxLength": 25
                }
            },
            {
                "fieldName": "nric",
                "displayText": "NRIC",
                "hidden": false,
                "dataFieldControl": {
                    "controlName": "nric",
                    "controlType": "textbox",
                    "required": true,
                    "maxLength": 12
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
                    "maxLength": 50
                }
            },
            {
                "fieldName": "companyRegNo",
                "displayText": "Company Reg. No",
                "hidden": false,
                "dataFieldControl": {
                    "controlName": "companyRegNo",
                    "controlType": "textbox",
                    "required": false,
                    "maxLength": 25
                }
            },
            {
                "fieldName": "address",
                "displayText": "Address",
                "hidden": false,
                "dataFieldControl": {
                    "controlName": "address",
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
                "fieldName": "state",
                "displayText": "State",
                "hidden": false,
                "dataFieldControl": {
                    "controlName": "state",
                    "controlType": "select",
                    "required": true,
                    "maxLength": 25,
                    "datasourceUrl": "GetStates"
                }
            },
            {
                "fieldName": "postcode",
                "displayText": "Postcode",
                "hidden": false,
                "dataFieldControl": {
                    "controlName": "postcode",
                    "controlType": "number",
                    "required": true,
                    "maxLength": 10
                }
            },
            {
                "fieldName": "country",
                "displayText": "Country",
                "hidden": false,
                "dataFieldControl": {
                    "controlName": "country",
                    "controlType": "textbox",
                    "required": true,
                    "maxLength": 25
                }
            },
            {
                "fieldName": "mobileNo",
                "displayText": "Mobile No",
                "hidden": false,
                "dataFieldControl": {
                    "controlName": "mobileNo",
                    "controlType": "textbox",
                    "required": true,
                    "maxLength": 15
                }
            },
            {
                "fieldName": "telNo",
                "displayText": "Tel No",
                "hidden": false,
                "dataFieldControl": {
                    "controlName": "telNo",
                    "controlType": "textbox",
                    "required": false,
                    "maxLength": 15
                }
            },
            {
                "fieldName": "bankName",
                "displayText": "Bank Name",
                "hidden": false,
                "dataFieldControl": {
                    "controlName": "bankName",
                    "controlType": "textbox",
                    "required": true,
                    "maxLength": 30
                }
            },
            {
                "fieldName": "bankAccNo",
                "displayText": "Bank Acc No",
                "hidden": false,
                "dataFieldControl": {
                    "controlName": "bankAccNo",
                    "controlType": "textbox",
                    "required": true,
                    "maxLength": 20
                }
            },
            {
                "fieldName": "superiorName",
                "displayText": "Superior/Upline",
                "hidden": false,
                "dataFieldControl": {
                    "controlName": "superiorName",
                    "controlType": "textbox",
                    "required": false,
                    "maxLength": 50
                }
            }
        ]
}

export class AgentProfileFields {
    public static keyField = "agentId";
    public static fields =
        [
            {
                "fieldName": "fullname",
                "displayText": "Full Name",
                "hidden": false,

                "dataFieldControl": {
                    "controlName": "fullname",
                    "controlType": "textbox",
                    "required": true,
                    "maxLength": 50
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
                    "maxLength": 25
                }
            },
            {
                "fieldName": "nric",
                "displayText": "NRIC",
                "hidden": false,
                "dataFieldControl": {
                    "controlName": "nric",
                    "controlType": "textbox",
                    "required": true,
                    "maxLength": 12
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
                    "maxLength": 50
                }
            },
            {
                "fieldName": "companyRegNo",
                "displayText": "Company Reg. No",
                "hidden": false,
                "dataFieldControl": {
                    "controlName": "companyRegNo",
                    "controlType": "textbox",
                    "required": false,
                    "maxLength": 25
                }
            },
            {
                "fieldName": "address",
                "displayText": "Address",
                "hidden": false,
                "dataFieldControl": {
                    "controlName": "address",
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
                "fieldName": "state",
                "displayText": "State",
                "hidden": false,
                "dataFieldControl": {
                    "controlName": "state",
                    "controlType": "select",
                    "required": true,
                    "maxLength": 25,
                    "datasourceUrl": "GetStates"
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
                "fieldName": "country",
                "displayText": "Country",
                "hidden": false,
                "dataFieldControl": {
                    "controlName": "country",
                    "controlType": "textbox",
                    "required": true,
                    "maxLength": 25
                }
            },
            {
                "fieldName": "mobileNo",
                "displayText": "Mobile No",
                "hidden": false,
                "dataFieldControl": {
                    "controlName": "mobileNo",
                    "controlType": "textbox",
                    "required": true,
                    "maxLength": 15
                }
            },
            {
                "fieldName": "telNo",
                "displayText": "Tel No",
                "hidden": false,
                "dataFieldControl": {
                    "controlName": "telNo",
                    "controlType": "textbox",
                    "required": false,
                    "maxLength": 15
                }
            },
            {
                "fieldName": "bankName",
                "displayText": "Bank Name",
                "hidden": false,
                "dataFieldControl": {
                    "controlName": "bankName",
                    "controlType": "textbox",
                    "required": true,
                    "maxLength": 30
                }
            },
            {
                "fieldName": "bankAccNo",
                "displayText": "Bank Acc No",
                "hidden": false,
                "dataFieldControl": {
                    "controlName": "bankAccNo",
                    "controlType": "textbox",
                    "required": true,
                    "maxLength": 20
                }
            },
        ]
}

export class AgentMaintenanceColumns {
    public static fields = [
        {
            "fieldName": "agentId",
            "headerText": "Id",
            "displayType": "text",
            "keyField": true,
            "readonly": true,
            "colWidth": "cell-width-1"
        },
        {
            "fieldName": "fullname",
            "headerText": "Fullname",
            "displayType": "text",
            "keyField": false,
            "readonly": true,
            "colWidth": "cell-width-20"
        },
        {
            "fieldName": "superiorName",
            "headerText": "Superior",
            "displayType": "text",
            "keyField": false,
            "readonly": true,
            "colWidth": "cell-width-20"
        },
        {
            "fieldName": "companyName",
            "headerText": "Company Name",
            "displayType": "text",
            "keyField": false,
            "readonly": true,
            "colWidth": "cell-width-20"
        },
        {
            "fieldName": "mobileNo",
            "headerText": "Mobile No",
            "displayType": "text",
            "keyField": false,
            "readonly": true,
            "colWidth": "cell-width-15"
        },
        {
            "fieldName": "telNo",
            "headerText": "Tel No",
            "displayType": "text",
            "keyField": false,
            "readonly": true,
            "colWidth": "cell-width-10"
        },
        {
            "fieldName": "isActive",
            "headerText": "Is Active",
            "displayType": "tick",
            "keyField": false,
            "readonly": true,
            "colWidth": "cell-width-10"
        },
    ]
}
