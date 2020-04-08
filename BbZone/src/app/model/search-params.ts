import { DateRange } from "./date.range";
import { ApprovalMode } from "../enums/RecordMode";

export class StatusAndKeywordParams {
  constructor(
    public isActive: boolean,
    public keyword: string
  ) { }

}

export class SearchOrderParams {
    constructor(
        public productId: string,
        public productCategoryId: string,
        public productPackageId: string,
        public appStatusId: string,
        public agent: string,
        public submittedDate: DateRange,
        public residentialType: string,
        public residentialName: string
    ) { }

}


export class ApprovalParams {
    constructor(
        public approvalMode: ApprovalMode,
        public keyword: string
    ) { }
}

export class SearchWithdrawalToSubmitParams {
    constructor(
        public keyword: string,
        public submittedDate: DateRange
    ) { }

}


export class SearchWithdrawalViewParams {
    constructor(
        public agent: number,
        public status: string,
        public submittedDate: DateRange,
        public completedDate: DateRange,
    ) { }

}

export class SearchIncentivesParams {
    constructor(
        public keyword: string,
        public productId: number,
        public productCategoryId: number,
        public productPackageId: number,
        public receivedDate: DateRange
    ) { }

}