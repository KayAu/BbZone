import { DateRange } from "./date.range";
import { ApprovalMode, OrderFilter } from "../enums/RecordMode";

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
        public residentialName: string,
        public filterByMode: OrderFilter
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
        public submittedDate: DateRange,
        public agent: string,
    ) { }

}

export class SearchClawbackParams {
    constructor(
        public isDeducted: boolean,
        public keyword: string
    ) { }
}

export class SearchWithdrawalViewParams {
    constructor(
        public agent: number,
        public status: string,
        public submittedDate: DateRange,
        public completedDate: DateRange,
        public isAdmin: boolean
    ) { }

}

export class SearchIncentivesParams {
    constructor(
        public keyword: string,
        public productId: number,
        public productCategoryId: number,
        public productPackageId: number,
        public receivedDate: DateRange,
        public paymentReceived: boolean,
    ) { }
}

export class SearchCompletedOrderParams {
    constructor(
        public productId: string,
        public productCategoryId: string,
        public productPackageId: string,
        public agent: string,
        public activatedDate: DateRange,
        public paymentDate: DateRange,
        public documentCompleted: boolean,
        public commissionStatus: string,
    ) { }
}


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
