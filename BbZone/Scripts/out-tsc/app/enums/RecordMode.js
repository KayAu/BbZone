"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RecordMode;
(function (RecordMode) {
    RecordMode["New"] = "New";
    RecordMode["Edit"] = "Edit";
    RecordMode["View"] = "View";
})(RecordMode = exports.RecordMode || (exports.RecordMode = {}));
var ApprovalMode;
(function (ApprovalMode) {
    ApprovalMode[ApprovalMode["All"] = 0] = "All";
    ApprovalMode[ApprovalMode["Pending"] = 1] = "Pending";
    ApprovalMode[ApprovalMode["Approved"] = 2] = "Approved";
    ApprovalMode[ApprovalMode["Rejected"] = 3] = "Rejected";
})(ApprovalMode = exports.ApprovalMode || (exports.ApprovalMode = {}));
var OrderFilter;
(function (OrderFilter) {
    OrderFilter[OrderFilter["None"] = 0] = "None";
    OrderFilter[OrderFilter["IncomingMessage"] = 1] = "IncomingMessage";
    OrderFilter[OrderFilter["NoCommissionSetup"] = 2] = "NoCommissionSetup";
})(OrderFilter = exports.OrderFilter || (exports.OrderFilter = {}));
//# sourceMappingURL=RecordMode.js.map