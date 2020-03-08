"use strict";
//export class PatientSearchParams {
//    //public currentPage: number;
//    //public pageSize: number;
//    //public sortBy: string;
//    //public isAscOrder: boolean;
//    public keyword: string;
//    public state: string;
//    public city: string;
//    public callAgent: string;
//    public implantedFrom: Date;
//    public implantedTo: Date;
//    public device: string;
Object.defineProperty(exports, "__esModule", { value: true });
//}
var PatientSearchParams = /** @class */ (function () {
    function PatientSearchParams(keyword, state, region, callAgent, implantedFrom, implantedTo, device, agreeToCall, futureFUFrom, futureFUTo) {
        this.keyword = keyword;
        this.state = state;
        this.region = region;
        this.callAgent = callAgent;
        this.implantedFrom = implantedFrom;
        this.implantedTo = implantedTo;
        this.device = device;
        this.agreeToCall = agreeToCall;
        this.futureFUFrom = futureFUFrom;
        this.futureFUTo = futureFUTo;
    }
    return PatientSearchParams;
}());
exports.PatientSearchParams = PatientSearchParams;
//# sourceMappingURL=patient.search.params.js.map