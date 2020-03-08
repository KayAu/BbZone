"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GridDataMapping = /** @class */ (function () {
    function GridDataMapping(headerName, fieldName, headerCss, displayAsBadge, sortable) {
        this.headerName = headerName;
        this.fieldName = fieldName;
        this.headerCss = headerCss;
        this.displayAsBadge = displayAsBadge;
        this.sortable = sortable;
    }
    return GridDataMapping;
}());
exports.GridDataMapping = GridDataMapping;
var NewAssignedPatient = /** @class */ (function () {
    function NewAssignedPatient() {
    }
    NewAssignedPatient.gridData = [
        {
            "headerName": "Patient#",
            "fieldname": "patientKey",
            "headerCss": "cell-width-10",
        },
        {
            "headerName": "Patient Name",
            "fieldname": "fullname",
            "headerCss": "cell-width-50"
        },
        {
            "headerName": "State",
            "fieldname": "state",
            "headerCss": ""
        },
        {
            "headerName": "Region",
            "fieldname": "region",
            "headerCss": ""
        },
    ];
    return NewAssignedPatient;
}());
exports.NewAssignedPatient = NewAssignedPatient;
var UpdateAssignedPatient = /** @class */ (function () {
    function UpdateAssignedPatient() {
    }
    UpdateAssignedPatient.gridData = [
        {
            "headerName": "Patient#",
            "fieldname": "patientKey",
            "headerCss": "cell-width-10",
            "displayAsBadge": false,
            "sortable": true
        },
        {
            "headerName": "Patient Name",
            "fieldname": "fullname",
            "headerCss": "cell-width-30",
            "displayAsBadge": false,
            "sortable": true
        },
        {
            "headerName": "State",
            "fieldname": "state",
            "headerCss": "",
            "displayAsBadge": false,
            "sortable": true
        },
        {
            "headerName": "Region",
            "fieldname": "region",
            "headerCss": "",
            "displayAsBadge": false,
            "sortable": true
        },
        {
            "headerName": "Assigned On",
            "fieldname": "taskDate",
            "headerCss": "",
            "displayAsBadge": false,
            "sortable": true
        },
        {
            "headerName": "Init Call Status",
            "fieldname": "initCall",
            "headerCss": "",
            "displayAsBadge": true,
            "sortable": true
        },
        {
            "headerName": "Follow-Up On",
            "fieldname": "nextFollowUpDate",
            "headerCss": "",
            "displayAsBadge": false,
            "sortable": true
        },
        {
            "headerName": "Follow Up Status",
            "fieldname": "followUp",
            "headerCss": "",
            "displayAsBadge": true,
            "sortable": true
        }
    ];
    return UpdateAssignedPatient;
}());
exports.UpdateAssignedPatient = UpdateAssignedPatient;
//# sourceMappingURL=grid-data.js.map