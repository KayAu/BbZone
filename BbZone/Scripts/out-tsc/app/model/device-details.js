"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QuestionMapping = /** @class */ (function () {
    function QuestionMapping(question, mapToField, controlType, required) {
        this.question = question;
        this.mapToField = mapToField;
        this.controlType = controlType;
    }
    return QuestionMapping;
}());
exports.QuestionMapping = QuestionMapping;
var DeviceDetails = /** @class */ (function () {
    function DeviceDetails() {
    }
    DeviceDetails.questionares = [
        {
            "question": "Using Stimulator?",
            "fieldname": "usingStimulator",
            "controltype": "checkbox",
            "required": false
        },
        {
            "question": "Reason patient is not using Stimulator",
            "fieldname": "stimulatorNotUseReason",
            "controltype": "text",
            "required": false
        },
        {
            "question": "If not using stimulator ~last timeframe used",
            "fieldname": "stimulatorNonUsageMths",
            "controltype": "text",
            "required": false
        },
        {
            "question": "Getting effective therapy from device?",
            "fieldname": "isTherapyEffective",
            "controltype": "checkbox",
            "required": false
        },
        {
            "question": "Device Explanted?",
            "fieldname": "devExplanted",
            "controltype": "checkbox",
            "required": false
        },
        {
            "question": "Explant Date",
            "fieldname": "explantDate",
            "controltype": "text",
            "required": false
        },
        {
            "question": "Device replaced by Abbott",
            "fieldname": "devReplacedByAbt",
            "controltype": "checkbox",
            "required": false
        },
        {
            "question": "Device replacement name",
            "fieldname": "devReplacementName",
            "controltype": "text",
            "required": false
        },
        {
            "question": "Device replaced by competitor",
            "fieldname": "devReplacedByCompe",
            "controltype": "checkbox",
            "required": false
        },
        {
            "question": "Device replacement name by competitor",
            "fieldname": "devReplacementNameCompe",
            "controltype": "text",
            "required": false
        },
        {
            "question": "IPG Low Battery?",
            "fieldname": "lowBatt",
            "controltype": "checkbox",
            "required": false
        },
        {
            "question": "Software update needed?",
            "fieldname": "sofrUpdateNeeded",
            "controltype": "checkbox",
            "required": false
        },
        {
            "question": "Reprogramming needed?",
            "fieldname": "reprogNeeded",
            "controltype": "checkbox",
            "required": false
        },
        {
            "question": "Receive educational emails?",
            "fieldname": "receiveEduEmails",
            "controltype": "checkbox",
            "required": false
        },
        {
            "question": "Transfer to pain center?",
            "fieldname": "transferedToPainCtr",
            "controltype": "checkbox",
            "required": false
        },
        {
            "question": "Permission to LVM?",
            "fieldname": "agreeToLVM",
            "controltype": "checkbox",
            "required": false
        },
        {
            "question": "Center Selected",
            "fieldname": "ctrSelected",
            "controltype": "text",
            "required": false
        },
        {
            "question": "Consent to provide info to Abbott representative?",
            "fieldname": "agreeToProvInfoToAbtRep",
            "controltype": "checkbox",
            "required": false
        },
        {
            "question": "Name of Representative at center",
            "fieldname": "repName",
            "controltype": "text",
            "required": false
        },
        {
            "question": "Agreed to 1 week follow up call?",
            "fieldname": "agreeToFollowUp",
            "controltype": "checkbox",
            "required": false
        },
        {
            "question": "Best time of day to call back?",
            "fieldname": "bestTimeToCallback",
            "controltype": "text",
            "required": false
        },
        {
            "question": "Transfer to tech support?",
            "fieldname": "transtoTechSupport",
            "controltype": "checkbox",
            "required": false
        },
        {
            "question": "Reason for call transfer",
            "fieldname": "transReason",
            "controltype": "text",
            "required": false
        },
        {
            "question": "Call transfer outcome",
            "fieldname": "transOutcome",
            "controltype": "text",
            "required": false
        }
    ];
    return DeviceDetails;
}());
exports.DeviceDetails = DeviceDetails;
//# sourceMappingURL=device-details.js.map