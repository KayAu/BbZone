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
var tablerow_data_mapping_1 = require("src/app/model/tablerow.data.mapping");
var loader_service_1 = require("src/app/loader/loader.service");
var data_service_1 = require("src/app/services/data.service");
var broadcast_service_1 = require("src/app/services/broadcast.service");
var dataDisplayType_1 = require("src/app/enums/dataDisplayType");
var apiController_1 = require("src/app/enums/apiController");
var createWithdrawalColumns_1 = require("../../metadata/createWithdrawalColumns");
var router_1 = require("@angular/router");
var router_2 = require("@angular/router");
var EditWithdrawal = /** @class */ (function () {
    function EditWithdrawal(loaderService, dataService, formEvent, router, route) {
        this.loaderService = loaderService;
        this.dataService = dataService;
        this.formEvent = formEvent;
        this.router = router;
        this.route = route;
        this.dataRowMapper = [];
        this.formRecord = {};
        this.isUpdating = false;
        //super(loaderService, dataService, '', false);
    }
    EditWithdrawal.prototype.ngOnInit = function () {
        this.recordId = this.route.snapshot.params.id;
        this.loadRecord(this.route.snapshot.params.id);
        this.dataRowMapper = this.getTablerowDataMapping();
    };
    EditWithdrawal.prototype.getTablerowDataMapping = function () {
        var columnMappings = createWithdrawalColumns_1.CreateWithdrawalColumns.fields.map(function (o) { return new tablerow_data_mapping_1.TablerowDataMapping(o.fieldName, o.headerText, dataDisplayType_1.DataDisplayType[o.displayType], o.keyField, o.colWidth); });
        return columnMappings;
    };
    EditWithdrawal.prototype.submit = function () {
    };
    EditWithdrawal.prototype.loadRecord = function (recordId) {
        var _this = this;
        this.dataService.get(apiController_1.ApiController.WithdrawalView, recordId).subscribe(function (data) {
            _this.formRecord = data;
        });
    };
    EditWithdrawal = __decorate([
        core_1.Component({
            selector: 'edit-withdrawal',
            templateUrl: './edit-withdrawal.html'
        }),
        __metadata("design:paramtypes", [loader_service_1.LoaderService, data_service_1.DataService, broadcast_service_1.BroadcastService, router_1.Router, router_2.ActivatedRoute])
    ], EditWithdrawal);
    return EditWithdrawal;
}());
exports.EditWithdrawal = EditWithdrawal;
//# sourceMappingURL=edit-withdrawal.js.map