"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var DateRange = /** @class */ (function () {
    function DateRange() {
        this.startDate = moment().subtract(30, 'days');
        this.endDate = moment();
        //constructor(dateRangeOption: DateRangeOption) {
        //    if (dateRangeOption === DateRangeOption.WithoutDefaultDate) {
        //        this.startDate = null,
        //            this.endDate = null
        //    }
        //}
    }
    return DateRange;
}());
exports.DateRange = DateRange;
var ReportSource = /** @class */ (function () {
    function ReportSource() {
        this.selectedDate = new DateRange(); //any = { startDate: moment, endDate: moment };
        this.dataItems = [];
    }
    return ReportSource;
}());
exports.ReportSource = ReportSource;
//# sourceMappingURL=report-source.model.js.map