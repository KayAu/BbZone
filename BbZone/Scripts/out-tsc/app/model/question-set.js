"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QuestionMapping = /** @class */ (function () {
    function QuestionMapping(question, mapToField, controlType, required, maxLength, choices, minValue) {
        this.question = question;
        this.mapToField = mapToField;
        this.controlType = controlType;
        this.required = required;
        this.maxLength = maxLength;
        this.choices = choices;
        this.minValue = minValue;
        if (choices) {
            this.options = choices.split(',');
        }
    }
    return QuestionMapping;
}());
exports.QuestionMapping = QuestionMapping;
var PatientDetailsPoll = /** @class */ (function () {
    function PatientDetailsPoll() {
    }
    PatientDetailsPoll.questionares = [
        //{
        //    "question": "Patient email",
        //    "fieldname": "email",
        //    "controltype": "text",
        //    "required": false,
        //    "maxLength": 50,
        //},
        {
            "question": "Patient alternate phone#",
            "fieldname": "altPhone",
            "controltype": "text",
            "required": false,
            "maxLength": 50
        },
        {
            "question": "Patient Phone number working?",
            "fieldname": "phoneWorking",
            "controltype": "radio",
            "required": false
        },
        {
            "question": "Contact Info Update (Physical Address)",
            "fieldname": "addressUpdated",
            "controltype": "text",
            "required": false,
            "maxLength": 150
        },
        {
            "question": "Patient Verification Completed (PHI)?",
            "fieldname": "verificationCompleted",
            "controltype": "radio",
            "required": false
        },
        {
            "question": "Permission to call record?",
            "fieldname": "agreeToCallRecord",
            "controltype": "radio",
            "required": false
        },
        {
            "question": "Permission to utilize record?",
            "fieldname": "agreeToUtilizeRecord",
            "controltype": "radio",
            "required": false
        },
        {
            "question": "Caregiver Consent?",
            "fieldname": "caregiverConsent",
            "controltype": "radio",
            "required": false
        },
        {
            "question": "Caregiver Name",
            "fieldname": "caregiverName",
            "controltype": "text",
            "required": false,
            "maxLength": 150
        },
        {
            "question": "Clinical Specialist Name",
            "fieldname": "clinicalSpecialist",
            "controltype": "text",
            "required": false,
            "maxLength": 150
        },
        {
            "question": "Clinical Specialist Phone#",
            "fieldname": "clinicalSpecialistPhone",
            "controltype": "text",
            "required": false,
            "maxLength": 50
        },
        {
            "question": "Region",
            "fieldname": "region",
            "controltype": "text",
            "required": false,
            "maxLength": 10
        },
        {
            "question": "Declined Product support?",
            "fieldname": "declinedProductSupport",
            "controltype": "radio",
            "required": false
        },
        //{
        //    "question": "Managing Physician Name",
        //    "fieldname": "mngePhyscianName",
        //    "controltype": "text",
        //    "required": false,
        //    "maxLength": 150
        //},
        //{
        //    "question": "Managing Physician Phone#",
        //    "fieldname": "mngePhyscianPhone",
        //    "controltype": "text",
        //    "required": false,
        //    "maxLength": 50
        //},
        //{
        //    "question": "Do Not Call",
        //    "fieldname": "doNotCall",
        //    "controltype": "radio",
        //    "required": false
        //},
        {
            "question": "Do Not Call",
            "fieldname": "doNotCall",
            "controltype": "dropdown",
            "required": false,
            "options": "Patient/Contact request,Wrong/Bad Phone Number,Patient deceased,Legal/Claims,Other"
        }
    ];
    return PatientDetailsPoll;
}());
exports.PatientDetailsPoll = PatientDetailsPoll;
var PatientDeceasedPoll = /** @class */ (function () {
    function PatientDeceasedPoll() {
    }
    PatientDeceasedPoll.questionares = [
        {
            "question": "Date of Death",
            "fieldname": "dateOfDeath",
            "controltype": "date",
            "required": false,
        },
        {
            "question": "Cause Of Death",
            "fieldname": "causeOfDeath",
            "controltype": "text",
            "required": false,
            "maxLength": 250
        },
        {
            "question": "Relationship To Patient",
            "fieldname": "relationshipToPatient",
            "controltype": "text",
            "required": false,
            "maxLength": 250
        },
    ];
    return PatientDeceasedPoll;
}());
exports.PatientDeceasedPoll = PatientDeceasedPoll;
var InitialCallPoll = /** @class */ (function () {
    function InitialCallPoll() {
    }
    InitialCallPoll.questionaires = [
        {
            "question": "Initial call date",
            "fieldname": "initCallDate",
            "controltype": "date",
            "required": true
        },
        {
            "question": "Initial call outcome",
            "fieldname": "initCallOutcome",
            "controltype": "dropdown",
            "required": true,
            "options": "Busy Call Back,Busy Signal,LM,No Answer,Other,Outreach Successful,Patient deceased,Patient declined services,Patient not available call back,Spanish Call,VM (2nd call do not leave a vm),VM-GM,Voicemail full,Wrong/Bad Phone Number"
        },
        {
            "question": "Initial call associate name",
            "fieldname": "initCallAssocName",
            "controltype": "userselect",
            "required": true,
            "maxLength": 50
        },
        {
            "question": "Initial call resolution",
            "fieldname": "initCallRes",
            "controltype": "dropdown",
            "required": false,
            "options": "Busy Signal,Explanted - Patient does not have any Abbott devices,LM,No Answer,Outreach Successful,Patient deceased,Patient declined services,Patient not available,Spanish Call,VM (2nd call do not leave a vm),Transferred to Pain Clinic-Warm,Transferred to Tech Support,Voicemail full,Wrong/Bad Phone Number,Other"
        },
        {
            "question": "Attempt 2 Date",
            "fieldname": "initCallAttempt1Date",
            "controltype": "date",
            "required": false
        },
        {
            "question": "Attempt 2 Outcome",
            "fieldname": "initCallAttempt1Outcome",
            "controltype": "dropdown",
            "required": false,
            "options": "Busy Call Back,Busy Signal,LM,No Answer,Other,Outreach Successful,Patient deceased,Patient declined services,Patient not available call back,Spanish Call,VM (2nd call do not leave a vm),VM-GM,Voicemail full,Wrong/Bad Phone Number"
        },
        {
            "question": "Attempt 2 Associate",
            "fieldname": "initCallAttempt1AssocName",
            "controltype": "userselect",
            "required": false,
            "maxLength": 50
        },
        {
            "question": "Attempt 3 Date",
            "fieldname": "initCallAttempt2Date",
            "controltype": "date",
            "required": false
        },
        {
            "question": "Attempt 3 Outcome",
            "fieldname": "initCallAttempt2Outcome",
            "controltype": "dropdown",
            "required": false,
            "options": "Busy Call Back,Busy Signal,LM,No Answer,Other,Outreach Successful,Patient deceased,Patient declined services,Patient not available call back,Spanish Call,VM (2nd call do not leave a vm),VM-GM,Voicemail full,Wrong/Bad Phone Number"
        },
        {
            "question": "Attempt 3 Associate",
            "fieldname": "initCallAttempt2AssocName",
            "controltype": "userselect",
            "required": false,
            "maxLength": 50
        },
        //{
        //    "question": "Initial call attempts",
        //    "fieldname": "callAttempts",
        //    "controltype": "callAttempt",
        //    "required": false
        //},
        //{
        //    "question": "Initial call notes",
        //    "fieldname": "initCallNotes",
        //    "controltype": "textarea",
        //    "required": false,
        //    "maxLength": 500
        //},
        {
            "question": "Initial call completed",
            "fieldname": "initCallCompleted",
            "controltype": "radio",
            "required": false
        },
        {
            "question": "Best time frame to reach patient?",
            "fieldname": "bestTimeToCall",
            "controltype": "text",
            "required": false,
            "maxLength": 500
        },
        {
            "question": "Date to start 1 week follow up call",
            "fieldname": "nextFollowUpDate",
            "controltype": "date",
            "required": false
        }
        //{
        //    "question": "Call Notes",
        //    "fieldname": "callNotes",
        //    "controltype": "textarea",
        //    "required": false,
        //    "maxLength": 500
        //},
        //{
        //    "question": "Permission to leave VM on follow-up call?",
        //    "fieldname": "PermissiontoLVM",
        //    "controltype": "radio",
        //    "required": false
        //},
        //{
        //    "question": "Permission to call record?",
        //    "fieldname": "agreeToCallRec",
        //    "controltype": "radio",
        //    "required": false
        //},
        //{
        //    "question": "Patient able to obtain assistance from center; all questions answered?",
        //    "fieldname": "allQuestionsAns",
        //    "controltype": "radio",
        //    "required": false
        //},
        //{
        //    "question": "Initial call completed",
        //    "fieldname": "initCallCompleted",
        //    "controltype": "radio",
        //    "required": false
        //},
        //{
        //    "question": "Date to start 1 week follow up call",
        //    "fieldname": "followUpDate",
        //    "controltype": "date",
        //    "required": false
        //}
    ];
    return InitialCallPoll;
}());
exports.InitialCallPoll = InitialCallPoll;
var PatientCallOutcomePoll = /** @class */ (function () {
    function PatientCallOutcomePoll() {
    }
    PatientCallOutcomePoll.questionaires = [
        {
            "question": "Call summary Notes",
            "fieldname": "callNotes",
            "controltype": "textarea",
            "required": false,
            "maxLength": 3500
        },
    ];
    return PatientCallOutcomePoll;
}());
exports.PatientCallOutcomePoll = PatientCallOutcomePoll;
var FollowUpCallPoll = /** @class */ (function () {
    function FollowUpCallPoll() {
    }
    FollowUpCallPoll.questionaires = [
        {
            "question": "Follow up date",
            "fieldname": "followUpDate",
            "controltype": "date",
            "required": false
        },
        {
            "question": "Follow up call outcome",
            "fieldname": "followUpOutcome",
            "controltype": "dropdown",
            "required": false,
            "options": "Busy Call Back,Busy Signal,LM,No Answer,Other,Outreach Successful,Patient deceased,Patient declined services,Patient not available call back,Spanish Call,VM (2nd call do not leave a vm),VM-GM,Voicemail full,Wrong/Bad Phone Number"
        },
        {
            "question": "Follow up associate name",
            "fieldname": "followUpAssocName",
            "controltype": "userselect",
            "required": false,
            "maxLength": 50
        },
        {
            "question": "Follow up call resolution",
            "fieldname": "followUpRes",
            "controltype": "dropdown",
            "required": false,
            "options": "Busy Signal,Explanted - Patient does not have any Abbott devices,LM,No Answer,Outreach Successful,Patient deceased,Patient declined services,Patient not available,Spanish Call,Transferred to Pain Clinic - VM,Transferred to Pain Clinic-Warm,Transferred to Tech Support,Voicemail full,Wrong/Bad Phone Number,Other"
        },
        //{
        //    "question": "Follow up call attempts",
        //    "fieldname": "callAttempts",
        //    "controltype": "callAttempt",
        //    "required": false
        //},
        {
            "question": "Attempt 2 Date",
            "fieldname": "followUpAttempt1Date",
            "controltype": "date",
            "required": false
        },
        {
            "question": "Attempt 2 Outcome ",
            "fieldname": "followUpAttempt1Outcome",
            "controltype": "dropdown",
            "required": false,
            "options": "Busy Call Back,Busy Signal,LM,No Answer,Other,Outreach Successful,Patient deceased,Patient declined services,Patient not available call back,Spanish Call,VM (2nd call do not leave a vm),VM-GM,Voicemail full,Wrong/Bad Phone Number"
        },
        {
            "question": "Attempt 2 Associate Name",
            "fieldname": "followUpAttempt1AssocName",
            "controltype": "userselect",
            "required": false,
            "maxLength": 50
        },
        {
            "question": "Attempt 3 Date",
            "fieldname": "followUpAttempt2Date",
            "controltype": "date",
            "required": false
        },
        {
            "question": "Attempt 3 Outcome ",
            "fieldname": "followUpAttempt2Outcome",
            "controltype": "dropdown",
            "required": false,
            "options": "Busy Call Back,Busy Signal,LM,No Answer,Other,Outreach Successful,Patient deceased,Patient declined services,Patient not available call back,Spanish Call,VM (2nd call do not leave a vm),VM-GM,Voicemail full,Wrong/Bad Phone Number"
        },
        {
            "question": "Attempt 3 Associate Name",
            "fieldname": "followUpAttempt2AssocName",
            "controltype": "userselect",
            "required": false,
            "maxLength": 50
        },
        //{
        //    "question": "Follow up call notes",
        //    "fieldname": "followUpCallNotes",
        //    "controltype": "textarea",
        //    "required": false,
        //    "maxLength": 500
        //},
        {
            "question": "Patient able to obtain assistance from center; all questions answered?",
            "fieldname": "allQuestionsAns",
            "controltype": "radio",
            "required": false
        },
        {
            "question": "Permission to leave VM on follow-up call?",
            "fieldname": "permissiontoLVM",
            "controltype": "radio",
            "required": false
        },
        {
            "question": "Permission to call record?",
            "fieldname": "agreeToCallRec",
            "controltype": "radio",
            "required": false
        },
        {
            "question": "Follow up call completed",
            "fieldname": "followUpCompleted",
            "controltype": "radio",
            "required": false
        }
    ];
    return FollowUpCallPoll;
}());
exports.FollowUpCallPoll = FollowUpCallPoll;
var CompleteCallPoll = /** @class */ (function () {
    function CompleteCallPoll() {
    }
    CompleteCallPoll.questionaires = [
        {
            "question": "Call Resolution",
            "fieldname": "callRes",
            "controltype": "dropdown",
            "required": true,
            "options": "Busy Signal,Explanted - Patient does not have any Abbott devices,LM,No Answer,Outreach Successful,Patient deceased,Patient declined services,Patient not available,Spanish Call,Transferred to Pain Clinic - VM,Transferred to Pain Clinic-Warm,Transferred to Tech Support,Voicemail full,Wrong/Bad Phone Number,Other"
        },
        {
            "question": "Future follow up date",
            "fieldname": "futureFollowUpDate",
            "controltype": "date",
            "required": false,
            "minValue": "today"
        },
        {
            "question": "Completed",
            "fieldname": "completed",
            "controltype": "checkbox",
            "required": false
        }
    ];
    return CompleteCallPoll;
}());
exports.CompleteCallPoll = CompleteCallPoll;
var InitialCallAttempt = /** @class */ (function () {
    function InitialCallAttempt() {
    }
    InitialCallAttempt.questionaires = [
        [{
                "question": "Attempt 2 Date",
                "fieldname": "initCallAttempt1Date",
                "controltype": "date",
                "required": false
            },
            {
                "question": "Attempt 2 Outcome ",
                "fieldname": "initCallAttempt1Outcome",
                "controltype": "textarea",
                "required": false,
                "maxLength": 500
            },
            {
                "question": "Attempt 2 Associate Name",
                "fieldname": "initCallAttempt1AssocName",
                "controltype": "text",
                "required": false,
                "maxLength": 50
            }],
        [{
                "question": "Attempt 3 Date",
                "fieldname": "initCallAttempt2Date",
                "controltype": "date",
                "required": false
            },
            {
                "question": "Attempt 3 Outcome ",
                "fieldname": "initCallAttempt2Outcome",
                "controltype": "textarea",
                "required": false,
                "maxLength": 500
            },
            {
                "question": "Attempt 3 Associate Name",
                "fieldname": "initCallAttempt2AssocName",
                "controltype": "text",
                "required": false,
                "maxLength": 50
            }],
        [{
                "question": "Attempt 3 Date",
                "fieldname": "initCallAttempt3Date",
                "controltype": "date",
                "required": false
            },
            {
                "question": "Attempt 3 Outcome ",
                "fieldname": "initCallAttempt3Outcome",
                "controltype": "textarea",
                "required": false,
                "maxLength": 500
            },
            {
                "question": "Attempt 3 Associate Name",
                "fieldname": "initCallAttempt3AssocName",
                "controltype": "text",
                "required": false,
                "maxLength": 50
            }]
    ];
    return InitialCallAttempt;
}());
exports.InitialCallAttempt = InitialCallAttempt;
var FollowUpCallAttempt = /** @class */ (function () {
    function FollowUpCallAttempt() {
    }
    FollowUpCallAttempt.questionaires = [
        [{
                "question": "Attempt 2 Date",
                "fieldname": "followUpAttempt1Date",
                "controltype": "date",
                "required": false
            },
            {
                "question": "Attempt 1Outcome ",
                "fieldname": "followUpAttempt1Outcome",
                "controltype": "textarea",
                "required": false,
                "maxLength": 500
            },
            {
                "question": "Attempt 2 Associate Name",
                "fieldname": "followUpAttempt1AssocName",
                "controltype": "text",
                "required": false,
                "maxLength": 50
            }],
        [{
                "question": "Attempt 3 Date",
                "fieldname": "followUpAttempt2Date",
                "controltype": "date",
                "required": false
            },
            {
                "question": "Attempt 2Outcome ",
                "fieldname": "followUpAttempt2Outcome",
                "controltype": "textarea",
                "required": false,
                "maxLength": 500
            },
            {
                "question": "Attempt 3 Associate Name",
                "fieldname": "followUpAttempt2AssocName",
                "controltype": "text",
                "required": false,
                "maxLength": 50
            }],
        [{
                "question": "Attempt 3 Date",
                "fieldname": "followUpAttempt3Date",
                "controltype": "date",
                "required": false
            },
            {
                "question": "Attempt 3 Outcome ",
                "fieldname": "followUpAttempt3Outcome",
                "controltype": "textarea",
                "required": false,
                "maxLength": 500
            },
            {
                "question": "Attempt 3 Associate Name",
                "fieldname": "followUpAttempt3AssocName",
                "controltype": "text",
                "required": false,
                "maxLength": 50
            }]
    ];
    return FollowUpCallAttempt;
}());
exports.FollowUpCallAttempt = FollowUpCallAttempt;
//# sourceMappingURL=question-set.js.map