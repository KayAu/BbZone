"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var data_service_1 = require("../../../../services/data.service");
var loader_service_1 = require("../../../../loader/loader.service");
var question_set_1 = require("../../../../model/question-set");
var patientPoll_1 = require("../../../../interfaces/patientPoll");
var apiController_1 = require("src/app/enums/apiController");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var DeviceInspection = /** @class */ (function (_super) {
    __extends(DeviceInspection, _super);
    function DeviceInspection(loaderService, dataService, location, router) {
        var _this = _super.call(this) || this;
        _this.loaderService = loaderService;
        _this.dataService = dataService;
        _this.location = location;
        _this.router = router;
        _this.devices = [];
        _this.selectedDevices = [];
        _this.onEdit = true;
        _this.viewOnly = false;
        return _this;
    }
    Object.defineProperty(DeviceInspection.prototype, "callRecordId", {
        set: function (id) {
            this.callId = id;
            this.reset();
            if (id !== 0)
                this.loadDevices(id);
        },
        enumerable: true,
        configurable: true
    });
    DeviceInspection.prototype.selectDevice = function (deviceIndex) {
        this.clearDeviceSelection();
        if (this.devices[deviceIndex].inspectionCompleted) {
            this.deviceInspection = Object.assign({}, this.devices[deviceIndex]);
            this.devices[deviceIndex].isSelected = true;
        }
    };
    DeviceInspection.prototype.update = function () {
        var _this = this;
        this.deviceInspection.isUpdating = true;
        this.dataService.update(apiController_1.ApiController.DeviceInspection, this.callId, this.getUpdatedItems()).subscribe(function (data) {
            _this.devices = data;
            _this.deviceInspection.isUpdating = false;
        });
    };
    DeviceInspection.prototype.showCopyFromDevices = function () {
        return this.devices.some(function (d) { return d.inspectionCompleted || d.isSelected; });
    };
    DeviceInspection.prototype.copyDataFromDevice = function (deviceIndex) {
        if (!this.devices)
            return;
        this.deviceInspection = Object.assign({}, this.devices[deviceIndex]);
    };
    DeviceInspection.prototype.isUpdateDisabled = function () {
        if (!this.devices.some(function (d) { return d.isSelected; })) {
            return true;
        }
        else {
            return this.deviceInspection.isUpdating ? true : false;
        }
    };
    DeviceInspection.prototype.reset = function () {
        if (!this.deviceInspection)
            return;
        this.devices = [];
        for (var _i = 0, _a = Object.keys(this.deviceInspection); _i < _a.length; _i++) {
            var key = _a[_i];
            this.deviceInspection[key] = null;
        }
    };
    DeviceInspection.prototype.create = function () { };
    DeviceInspection.prototype.setEditMode = function () { };
    DeviceInspection.prototype.loadDevices = function (callId) {
        var _this = this;
        this.dataService.getListData(apiController_1.ApiController.DeviceInspection + "/Get/" + callId).subscribe(function (data) {
            _this.questionsMapper = data.questions.map(function (o) { return new question_set_1.QuestionMapping(o.question, o.fieldName.charAt(0).toLowerCase() + o.fieldName.slice(1), o.controlType, o.required, o.maxLength, o.options); });
            _this.devices = data.inspectionAnswers;
            _this.showSelectedDeviceInspection();
        });
    };
    DeviceInspection.prototype.getUpdatedItems = function () {
        var updateItems = [];
        for (var _i = 0, _a = this.devices; _i < _a.length; _i++) {
            var dev = _a[_i];
            if (dev.isSelected) {
                var inspection = Object.assign({}, this.deviceInspection);
                inspection.devExamId = dev.devExamId;
                inspection.deviceId = dev.deviceId;
                updateItems.push(inspection);
            }
        }
        return updateItems;
    };
    DeviceInspection.prototype.clearDeviceSelection = function () {
        this.devices.forEach(function (device, index) {
            if (this[index].inspectionCompleted) {
                this[index].isSelected = false;
            }
        }, this.devices);
    };
    DeviceInspection.prototype.showSelectedDeviceInspection = function () {
        for (var _i = 0, _a = this.devices; _i < _a.length; _i++) {
            var dev = _a[_i];
            if (dev.isSelected) {
                this.deviceInspection = dev;
                break;
            }
        }
        if (!this.deviceInspection) {
            this.devices[0].isSelected = true;
            this.copyDataFromDevice(0);
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DeviceInspection.prototype, "onEdit", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DeviceInspection.prototype, "viewOnly", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], DeviceInspection.prototype, "callRecordId", null);
    DeviceInspection = __decorate([
        core_1.Component({
            selector: 'device-inspection',
            templateUrl: './device-inspection.html'
        }),
        __metadata("design:paramtypes", [loader_service_1.LoaderService, data_service_1.DataService, common_1.Location, router_1.Router])
    ], DeviceInspection);
    return DeviceInspection;
}(patientPoll_1.PatientPoll));
exports.DeviceInspection = DeviceInspection;
//# sourceMappingURL=device-inspection.js.map