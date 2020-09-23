"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataDisplayType;
(function (DataDisplayType) {
    DataDisplayType[DataDisplayType["text"] = 0] = "text";
    DataDisplayType[DataDisplayType["badge"] = 1] = "badge";
    DataDisplayType[DataDisplayType["tick"] = 2] = "tick";
    DataDisplayType[DataDisplayType["date"] = 3] = "date";
})(DataDisplayType = exports.DataDisplayType || (exports.DataDisplayType = {}));
var ControlType;
(function (ControlType) {
    ControlType[ControlType["label"] = 0] = "label";
    ControlType[ControlType["date"] = 1] = "date";
    ControlType[ControlType["textbox"] = 2] = "textbox";
    ControlType[ControlType["textarea"] = 3] = "textarea";
    ControlType[ControlType["select"] = 4] = "select";
    ControlType[ControlType["checkbox"] = 5] = "checkbox";
    ControlType[ControlType["editabledropdown"] = 6] = "editabledropdown";
    ControlType[ControlType["cascadeDropdown"] = 7] = "cascadeDropdown";
    ControlType[ControlType["dateRange"] = 8] = "dateRange";
    ControlType[ControlType["password"] = 9] = "password";
    ControlType[ControlType["number"] = 10] = "number";
    ControlType[ControlType["customerFinder"] = 11] = "customerFinder";
})(ControlType = exports.ControlType || (exports.ControlType = {}));
var CustomerSearchType;
(function (CustomerSearchType) {
    CustomerSearchType[CustomerSearchType["completed"] = 0] = "completed";
    CustomerSearchType[CustomerSearchType["commissionClaimed"] = 1] = "commissionClaimed";
})(CustomerSearchType = exports.CustomerSearchType || (exports.CustomerSearchType = {}));
var CommissionTableDisplay;
(function (CommissionTableDisplay) {
    CommissionTableDisplay[CommissionTableDisplay["currentAgent"] = 0] = "currentAgent";
    CommissionTableDisplay[CommissionTableDisplay["allAgents"] = 1] = "allAgents";
})(CommissionTableDisplay = exports.CommissionTableDisplay || (exports.CommissionTableDisplay = {}));
var CustomerOrderDataGroup;
(function (CustomerOrderDataGroup) {
    CustomerOrderDataGroup[CustomerOrderDataGroup["application"] = 0] = "application";
    CustomerOrderDataGroup[CustomerOrderDataGroup["orderInfo"] = 1] = "orderInfo";
})(CustomerOrderDataGroup = exports.CustomerOrderDataGroup || (exports.CustomerOrderDataGroup = {}));
//# sourceMappingURL=dataDisplayType.js.map