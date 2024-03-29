"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StatusAndKeywordParams = /** @class */ (function () {
    function StatusAndKeywordParams(isActive, keyword) {
        this.isActive = isActive;
        this.keyword = keyword;
    }
    return StatusAndKeywordParams;
}());
exports.StatusAndKeywordParams = StatusAndKeywordParams;
var SearchOrderParams = /** @class */ (function () {
    function SearchOrderParams(productId, productCategoryId, productPackageId, appStatusId, agent, submittedDate, residentialType, residentialName, filterByMode) {
        this.productId = productId;
        this.productCategoryId = productCategoryId;
        this.productPackageId = productPackageId;
        this.appStatusId = appStatusId;
        this.agent = agent;
        this.submittedDate = submittedDate;
        this.residentialType = residentialType;
        this.residentialName = residentialName;
        this.filterByMode = filterByMode;
    }
    return SearchOrderParams;
}());
exports.SearchOrderParams = SearchOrderParams;
var ApprovalParams = /** @class */ (function () {
    function ApprovalParams(approvalMode, keyword) {
        this.approvalMode = approvalMode;
        this.keyword = keyword;
    }
    return ApprovalParams;
}());
exports.ApprovalParams = ApprovalParams;
var SearchWithdrawalToSubmitParams = /** @class */ (function () {
    function SearchWithdrawalToSubmitParams(keyword, submittedDate, agent) {
        this.keyword = keyword;
        this.submittedDate = submittedDate;
        this.agent = agent;
    }
    return SearchWithdrawalToSubmitParams;
}());
exports.SearchWithdrawalToSubmitParams = SearchWithdrawalToSubmitParams;
var SearchClawbackParams = /** @class */ (function () {
    function SearchClawbackParams(isDeducted, keyword) {
        this.isDeducted = isDeducted;
        this.keyword = keyword;
    }
    return SearchClawbackParams;
}());
exports.SearchClawbackParams = SearchClawbackParams;
var SearchWithdrawalViewParams = /** @class */ (function () {
    function SearchWithdrawalViewParams(agent, status, submittedDate, completedDate, isAdmin) {
        this.agent = agent;
        this.status = status;
        this.submittedDate = submittedDate;
        this.completedDate = completedDate;
        this.isAdmin = isAdmin;
    }
    return SearchWithdrawalViewParams;
}());
exports.SearchWithdrawalViewParams = SearchWithdrawalViewParams;
var SearchIncentivesParams = /** @class */ (function () {
    function SearchIncentivesParams(keyword, productId, productCategoryId, productPackageId, receivedDate, paymentReceived) {
        this.keyword = keyword;
        this.productId = productId;
        this.productCategoryId = productCategoryId;
        this.productPackageId = productPackageId;
        this.receivedDate = receivedDate;
        this.paymentReceived = paymentReceived;
    }
    return SearchIncentivesParams;
}());
exports.SearchIncentivesParams = SearchIncentivesParams;
var SearchCompletedOrderParams = /** @class */ (function () {
    function SearchCompletedOrderParams(productId, productCategoryId, productPackageId, agent, activatedDate, paymentDate, documentCompleted, commissionStatus) {
        this.productId = productId;
        this.productCategoryId = productCategoryId;
        this.productPackageId = productPackageId;
        this.agent = agent;
        this.activatedDate = activatedDate;
        this.paymentDate = paymentDate;
        this.documentCompleted = documentCompleted;
        this.commissionStatus = commissionStatus;
    }
    return SearchCompletedOrderParams;
}());
exports.SearchCompletedOrderParams = SearchCompletedOrderParams;
//export class SearchByDateParams {
//    constructor(
//        public productId: string,
//        public productCategoryId: string,
//        public productPackageId: string,
//        public agent: string,
//        public activatedDate: DateRange,
//        public paymentDate: DateRange,
//        public documentCompleted: boolean,
//        public commissionStatus: string,
//    ) { }
//}
//# sourceMappingURL=search-params.js.map