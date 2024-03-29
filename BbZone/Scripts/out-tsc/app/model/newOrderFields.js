"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NewOrderFields = /** @class */ (function () {
    function NewOrderFields() {
    }
    NewOrderFields.fields = [
        //{
        //    "fieldName": "orderId",
        //    "displayText": "Id",
        //    "readonly": true,
        //    "dataFieldControl": {
        //        "controlName": "orderId ",
        //        "controlType": "label",
        //        "required": false,
        //        "maxLength": 0
        //    }
        //},
        {
            "fieldName": "ProdPkgId",
            "displayText": "Product Package",
            "readonly": false,
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
            "readonly": false,
            "dataFieldControl": {
                "controlName": "agent",
                "controlType": "select",
                "required": true,
                "maxLength": 0,
                "datasourceUrl": "GetAgents"
            }
        },
        {
            "fieldName": "customerName",
            "displayText": "Customer Name",
            "readonly": false,
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
            "readonly": false,
            "dataFieldControl": {
                "controlName": "customerId",
                "controlType": "textbox",
                "required": true,
                "maxLength": 15
            }
        },
        {
            "fieldName": "customerAddr",
            "displayText": "Customer Address",
            "readonly": false,
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
            "readonly": false,
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
            "readonly": false,
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
            "fieldName": "contactNo",
            "displayText": "Contact No",
            "readonly": false,
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
            "readonly": false,
            "dataFieldControl": {
                "controlName": "Email",
                "controlType": "textbox",
                "required": true,
                "maxLength": 35
            }
        },
        {
            "fieldName": "customerRemarks",
            "displayText": "Remarks",
            "readonly": false,
            "dataFieldControl": {
                "controlName": "customerRemarks",
                "controlType": "textarea",
                "required": true,
                "maxLength": 500
            }
        },
        {
            "fieldName": "submitByAgent",
            "displayText": "Submitted By Agent",
            "readonly": false,
            "dataFieldControl": {
                "controlName": "submitByAgent",
                "controlType": "checkbox",
                "required": false,
                "maxLength": 0
            }
        },
    ];
    return NewOrderFields;
}());
exports.NewOrderFields = NewOrderFields;
//# sourceMappingURL=newOrderFields.js.map