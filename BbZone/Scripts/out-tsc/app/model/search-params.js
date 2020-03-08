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
    function SearchOrderParams(productId, productCategoryId, productPackageId, orderStatusId, agent, submittedDate) {
        this.productId = productId;
        this.productCategoryId = productCategoryId;
        this.productPackageId = productPackageId;
        this.orderStatusId = orderStatusId;
        this.agent = agent;
        this.submittedDate = submittedDate;
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
//# sourceMappingURL=search-params.js.map