"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var DateRange = /** @class */ (function () {
    function DateRange() {
        this.startDate = moment().subtract(30, 'days');
        this.endDate = moment();
    }
    return DateRange;
}());
exports.DateRange = DateRange;
//# sourceMappingURL=date.range.js.map