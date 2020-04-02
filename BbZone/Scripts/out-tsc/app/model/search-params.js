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
    function SearchOrderParams(productId, productCategoryId, productPackageId, orderStatusId, agent, submittedDate, residentialType, residentialName) {
        this.productId = productId;
        this.productCategoryId = productCategoryId;
        this.productPackageId = productPackageId;
        this.orderStatusId = orderStatusId;
        this.agent = agent;
        this.submittedDate = submittedDate;
        this.residentialType = residentialType;
        this.residentialName = residentialName;
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
    function SearchWithdrawalToSubmitParams(keyword, submittedDate) {
        this.keyword = keyword;
        this.submittedDate = submittedDate;
    }
    return SearchWithdrawalToSubmitParams;
}());
exports.SearchWithdrawalToSubmitParams = SearchWithdrawalToSubmitParams;
var SearchWithdrawalViewParams = /** @class */ (function () {
    function SearchWithdrawalViewParams(agent, status, submittedDate, completedDate) {
        this.agent = agent;
        this.status = status;
        this.submittedDate = submittedDate;
        this.completedDate = completedDate;
    }
    return SearchWithdrawalViewParams;
}());
exports.SearchWithdrawalViewParams = SearchWithdrawalViewParams;
var SearchIncentivesParams = /** @class */ (function () {
    function SearchIncentivesParams(keyword, productId, productCategoryId, productPackageId, receivedDate) {
        this.keyword = keyword;
        this.productId = productId;
        this.productCategoryId = productCategoryId;
        this.productPackageId = productPackageId;
        this.receivedDate = receivedDate;
    }
    return SearchIncentivesParams;
}());
exports.SearchIncentivesParams = SearchIncentivesParams;
//# sourceMappingURL=search-params.js.map