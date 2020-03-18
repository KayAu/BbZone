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
        public productId: number,
        public productCategoryId: number,
        public productPackageId: number,
        public orderStatusId: number,
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
