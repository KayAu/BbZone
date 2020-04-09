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
var loader_service_1 = require("src/app/loader/loader.service");
var data_service_1 = require("src/app/services/data.service");
var apiController_1 = require("../../enums/apiController");
var UserCommunication = /** @class */ (function () {
    function UserCommunication(loaderService, dataService) {
        this.loaderService = loaderService;
        this.dataService = dataService;
        this.isUpdating = false;
        this.communications = [];
        this.showCommunicationPanel = false;
    }
    UserCommunication.prototype.ngOnInit = function () {
        //this.currentUser = this.authenticationService.currentUserValue;
        this.loadRecord();
    };
    UserCommunication.prototype.loadRecord = function () {
        var _this = this;
        this.dataService.get("" + apiController_1.ApiController.Communication, this.applicationId).subscribe(function (results) {
            _this.communications = results.communications;
            _this.unreadMessages = results.unreadMessages;
        });
    };
    UserCommunication.prototype.handleCommunication = function () {
        var _this = this;
        this.showCommunicationPanel = !this.showCommunicationPanel;
        if (this.unreadMessages > 0) {
            this.dataService.update("" + apiController_1.ApiController.Communication, this.applicationId, null).subscribe(function (results) {
                _this.unreadMessages = 0;
            });
        }
    };
    UserCommunication.prototype.submit = function () {
        var _this = this;
        if (this.textMessage) {
            var newMessage = { applicationId: this.applicationId, message: this.textMessage };
            this.dataService.add("" + apiController_1.ApiController.Communication, newMessage).subscribe(function (results) {
                if (results) {
                    _this.communications.push(results);
                    _this.textMessage = '';
                }
            });
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], UserCommunication.prototype, "applicationId", void 0);
    UserCommunication = __decorate([
        core_1.Component({
            selector: 'user-communication',
            templateUrl: './user-communication.html',
        }),
        __metadata("design:paramtypes", [loader_service_1.LoaderService,
            data_service_1.DataService])
    ], UserCommunication);
    return UserCommunication;
}());
exports.UserCommunication = UserCommunication;
//# sourceMappingURL=user-communication.js.map