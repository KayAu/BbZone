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
var data_service_1 = require("../../services/data.service");
var loader_service_1 = require("src/app/loader/loader.service");
var apiController_1 = require("src/app/enums/apiController");
var TodayTasks = /** @class */ (function () {
    function TodayTasks(loaderService, dataService) {
        this.loaderService = loaderService;
        this.dataService = dataService;
        this.dataSource = [];
        this.daysInMonth = [];
        this.loadDates();
    }
    TodayTasks.prototype.ngOnInit = function () {
        var today = new Date();
        this.loadTasksOnDate(today.toDateString());
    };
    TodayTasks.prototype.ngAfterViewInit = function () {
        var curDateIndex = this.daysInMonth.findIndex(function (d) { return d.currentDate === true; });
        this.taskDate.toArray()[curDateIndex].nativeElement.scrollIntoView({ behavior: "smooth" });
    };
    TodayTasks.prototype.viewTasksOnDate = function (date, selectedItemIdx) {
        $('.date').removeClass('pink-gradient');
        $('.date').eq(selectedItemIdx).addClass('pink-gradient');
        this.loadTasksOnDate(date.toDateString());
    };
    TodayTasks.prototype.loadTasksOnDate = function (date) {
        var _this = this;
        this.dataService.getListData(apiController_1.ApiController.CallAgent + "/GetAssociateTasksOnDate/" + date).subscribe(function (data) {
            _this.dataSource = data;
        });
    };
    TodayTasks.prototype.loadDates = function () {
        var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var today = new Date();
        var totalDays = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
        for (var day = 1; day <= totalDays; day++) {
            var thisDate = new Date(today.getFullYear(), today.getMonth(), day);
            var dateDetails = {
                date: thisDate,
                day: day,
                dayName: days[thisDate.getDay()],
                currentDate: today.toDateString() === thisDate.toDateString() ? true : false
            };
            this.daysInMonth.push(dateDetails);
        }
    };
    __decorate([
        core_1.ViewChildren('taskDate'),
        __metadata("design:type", Object)
    ], TodayTasks.prototype, "taskDate", void 0);
    TodayTasks = __decorate([
        core_1.Component({
            selector: 'today-tasks',
            templateUrl: './today-tasks.html'
        }),
        __metadata("design:paramtypes", [loader_service_1.LoaderService, data_service_1.DataService])
    ], TodayTasks);
    return TodayTasks;
}());
exports.TodayTasks = TodayTasks;
//# sourceMappingURL=today-tasks.js.map