"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AgentRegistrationFields = /** @class */ (function () {
    function AgentRegistrationFields() {
    }
    AgentRegistrationFields.fields = [
        {
            "fieldName": "fullname",
            "displayText": "Full Name",
            "readonly": true,
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
            "readonly": true,
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
            "readonly": true,
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
            "readonly": true,
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
            "readonly": true,
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
            "readonly": true,
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
            "readonly": true,
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
            "readonly": true,
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
            "readonly": true,
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
            "readonly": true,
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
            "readonly": true,
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
            "readonly": true,
            "dataFieldControl": {
                "controlName": "telNo",
                "controlType": "textbox",
                "required": false,
                "maxLength": 15
            }
        },
        {
            "fieldName": "superiorId",
            "displayText": "Superior Id",
            "readonly": false,
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
            "readonly": true,
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
            "readonly": true,
            "dataFieldControl": {
                "controlName": "password",
                "controlType": "password",
                "required": false,
                "maxLength": 64
            }
        }
    ];
    return AgentRegistrationFields;
}());
exports.AgentRegistrationFields = AgentRegistrationFields;
var AgentRegistrationColumns = /** @class */ (function () {
    function AgentRegistrationColumns() {
    }
    AgentRegistrationColumns.fields = [
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
    ];
    return AgentRegistrationColumns;
}());
exports.AgentRegistrationColumns = AgentRegistrationColumns;
var AgentRegistrationViewFields = /** @class */ (function () {
    function AgentRegistrationViewFields() {
    }
    AgentRegistrationViewFields.fields = [
        {
            "fieldName": "fullname",
            "displayText": "Full Name",
            "readonly": true,
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
            "readonly": true,
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
            "readonly": true,
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
            "readonly": true,
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
            "readonly": true,
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
            "readonly": true,
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
            "readonly": true,
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
            "readonly": true,
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
            "readonly": true,
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
            "readonly": true,
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
            "readonly": true,
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
            "readonly": true,
            "dataFieldControl": {
                "controlName": "telNo",
                "controlType": "textbox",
                "required": false,
                "maxLength": 15
            }
        },
        {
            "fieldName": "superiorName",
            "displayText": "Superior/Upline",
            "readonly": true,
            "dataFieldControl": {
                "controlName": "superiorName",
                "controlType": "textbox",
                "required": false,
                "maxLength": 50
            }
        }
    ];
    return AgentRegistrationViewFields;
}());
exports.AgentRegistrationViewFields = AgentRegistrationViewFields;
var AgentProfileFields = /** @class */ (function () {
    function AgentProfileFields() {
    }
    AgentProfileFields.keyField = "agentId";
    AgentProfileFields.fields = [
        {
            "fieldName": "agentId",
            "displayText": "Agent Id",
            "readonly": true,
            "dataFieldControl": {
                "controlName": "agentId",
                "controlType": "label",
                "required": true,
                "maxLength": 50
            }
        },
        {
            "fieldName": "fullname",
            "displayText": "Full Name",
            "readonly": false,
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
            "readonly": false,
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
            "readonly": false,
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
            "readonly": false,
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
            "readonly": false,
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
            "readonly": false,
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
            "readonly": false,
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
            "readonly": false,
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
            "readonly": false,
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
            "readonly": false,
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
            "readonly": false,
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
            "readonly": false,
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
            "readonly": false,
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
            "readonly": true,
            "dataFieldControl": {
                "controlName": "bankAccNo",
                "controlType": "textbox",
                "required": true,
                "maxLength": 20
            }
        },
    ];
    return AgentProfileFields;
}());
exports.AgentProfileFields = AgentProfileFields;
var AgentMaintenanceColumns = /** @class */ (function () {
    function AgentMaintenanceColumns() {
    }
    AgentMaintenanceColumns.fields = [
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
    ];
    return AgentMaintenanceColumns;
}());
exports.AgentMaintenanceColumns = AgentMaintenanceColumns;
//# sourceMappingURL=agentFields.js.map