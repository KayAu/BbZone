"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ManageWithdrawal = /** @class */ (function () {
    function ManageWithdrawal() {
    }
    ManageWithdrawal.prototype.ngOnInit = function () {
        this.loadData();
    };
    ManageWithdrawal.prototype.loadData = function () {
        this.withdrawals = [
            {
                "withdrawalID": 1465,
                "agent": "amirulannuar87",
                "amount": "RM600.00",
                "dateSubmitted": "27 Jan 2020",
                "giroFee": "RM2.00",
                "completed": false,
                "completedOn": "",
                "refNo": ""
            },
            {
                "withdrawalID": 1464,
                "agent": "danielho",
                "amount": "RM1,900.00",
                "dateSubmitted": "27 Jan 2020",
                "giroFee": "RM0",
                "completed": false,
                "completedOn": "",
                "refNo": ""
            },
            {
                "withdrawalID": 1463,
                "agent": "samlee2234",
                "amount": "RM928.70",
                "dateSubmitted": "27 Jan 2020",
                "giroFee": "RM0",
                "completed": false,
                "completedOn": "",
                "refNo": ""
            },
            {
                "withdrawalID": 1462,
                "agent": "sayang",
                "amount": "RM2,207.90",
                "dateSubmitted": "24 Jan 2020",
                "giroFee": "RM0",
                "completed": true,
                "completedOn": "24 Jan 2020",
                "refNo": "7308836054"
            },
            {
                "withdrawalID": 1461,
                "agent": "BIG-WAN",
                "amount": "RM159.00",
                "dateSubmitted": "23 Jan 2020",
                "giroFee": "RM2.00",
                "completed": true,
                "completedOn": "24 Jan 2020",
                "refNo": "7308840034"
            },
            {
                "withdrawalID": 1459,
                "agent": "BIG-KUSYAFIQ",
                "amount": "RM1,100.00",
                "dateSubmitted": "23 Jan 2020",
                "giroFee": "RM0",
                "completed": true,
                "completedOn": "24 Jan 2020",
                "refNo": "7308833218"
            },
            {
                "withdrawalID": 1458,
                "agent": "ZEN",
                "amount": "RM174.70",
                "dateSubmitted": "23 Jan 2020",
                "giroFee": "RM2.00",
                "completed": true,
                "completedOn": "24 Jan 2020",
                "refNo": "7308843640"
            },
            {
                "withdrawalID": 1457,
                "agent": "mryandao",
                "amount": "RM5,785.10",
                "dateSubmitted": "22 Jan 2020",
                "giroFee": "RM0",
                "completed": false,
                "completedOn": "",
                "refNo": ""
            },
            {
                "withdrawalID": 1456,
                "agent": "BIG-APEK",
                "amount": "RM150.00",
                "dateSubmitted": "22 Jan 2020",
                "giroFee": "RM0",
                "completed": true,
                "completedOn": "24 Jan 2020",
                "refNo": "7308829116"
            },
            {
                "withdrawalID": 1455,
                "agent": "carol8788",
                "amount": "RM5,411.80",
                "dateSubmitted": "22 Jan 2020",
                "giroFee": "RM2.00",
                "completed": false,
                "completedOn": "",
                "refNo": ""
            },
            {
                "withdrawalID": 1454,
                "agent": "BIG-MAZLAN",
                "amount": "RM206.70",
                "dateSubmitted": "22 Jan 2020",
                "giroFee": "RM0",
                "completed": true,
                "completedOn": "24 Jan 2020",
                "refNo": "7308825816"
            },
            {
                "withdrawalID": 1452,
                "agent": "miri-chee hao",
                "amount": "RM3,000.00",
                "dateSubmitted": "22 Jan 2020",
                "giroFee": "RM0",
                "completed": true,
                "completedOn": "24 Jan 2020",
                "refNo": "7308888709"
            },
            {
                "withdrawalID": 1451,
                "agent": "kalyn90",
                "amount": "RM118.80",
                "dateSubmitted": "22 Jan 2020",
                "giroFee": "RM0",
                "completed": true,
                "completedOn": "24 Jan 2020",
                "refNo": "7308891548"
            },
            {
                "withdrawalID": 1450,
                "agent": "bbchee",
                "amount": "RM302.10",
                "dateSubmitted": "22 Jan 2020",
                "giroFee": "RM0",
                "completed": true,
                "completedOn": "24 Jan 2020",
                "refNo": "7308893883"
            },
            {
                "withdrawalID": 1449,
                "agent": "MSKL-JCCH",
                "amount": "RM356.40",
                "dateSubmitted": "22 Jan 2020",
                "giroFee": "RM0",
                "completed": true,
                "completedOn": "24 Jan 2020",
                "refNo": "7311006791"
            }
        ];
    };
    ManageWithdrawal.prototype.editRow = function (rowIndex) {
    };
    ManageWithdrawal = __decorate([
        core_1.Component({
            selector: 'manage-withdrawal',
            templateUrl: './manage-withdrawal.html'
        }),
        __metadata("design:paramtypes", [])
    ], ManageWithdrawal);
    return ManageWithdrawal;
}());
exports.ManageWithdrawal = ManageWithdrawal;
//# sourceMappingURL=manage-withdrawal.js.map