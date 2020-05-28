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
var ManageLoginBannerColumns_1 = require("../../metadata/ManageLoginBannerColumns");
var tablerow_data_mapping_1 = require("../../model/tablerow.data.mapping");
var dataDisplayType_1 = require("../../enums/dataDisplayType");
var ListDataCrud_1 = require("../../interfaces/ListDataCrud");
var data_service_1 = require("../../services/data.service");
var loader_service_1 = require("../../loader/loader.service");
var apiController_1 = require("../../enums/apiController");
var search_params_1 = require("../../model/search-params");
var ManageLoginBanner = /** @class */ (function (_super) {
    __extends(ManageLoginBanner, _super);
    function ManageLoginBanner(loaderService, dataService) {
        var _this = _super.call(this, loaderService, dataService, 'BannerId') || this;
        _this.loaderService = loaderService;
        _this.dataService = dataService;
        _this.dataRowMapper = [];
        _this.displayType = dataDisplayType_1.DataDisplayType;
        _this.controlType = dataDisplayType_1.ControlType;
        return _this;
    }
    ManageLoginBanner.prototype.ngOnInit = function () {
        this.formName = "tableForm";
        this.controllerName = apiController_1.ApiController.LoginBanner;
        this.dataRowMapper = this.getTablerowDataMapping();
        this.searchParams = new search_params_1.StatusAndKeywordParams(null, null);
        this.initDataRecord(this.dataRowMapper);
    };
    ManageLoginBanner.prototype.getTablerowDataMapping = function () {
        var columnMappings = ManageLoginBannerColumns_1.ManageLoginBannerColumns.fields.map(function (o) { return new tablerow_data_mapping_1.TablerowDataMapping(o.fieldName, o.headerText, dataDisplayType_1.DataDisplayType[o.displayType], o.keyField, o.colWidth); });
        return columnMappings;
    };
    ManageLoginBanner.prototype.clearSelectedFile = function () {
        this.selectedFile = null;
        this.showNewRow = false;
    };
    ManageLoginBanner.prototype.fileSelected = function (file) {
        this.selectedFile = file.files[0];
        console.log(file);
    };
    ManageLoginBanner.prototype.uploadFile = function () {
        var _this = this;
        if (this.selectedFile) {
            var formData = new FormData();
            formData.append("file", this.selectedFile);
            this.uploading = true;
            this.dataService.postForm(apiController_1.ApiController.LoginBanner, formData).subscribe(function (data) {
                _this.uploading = false;
                _this.clearSelectedFile();
                _this.setListDisplay(data);
                _this.resetPageAndColSort();
            });
        }
    };
    ManageLoginBanner = __decorate([
        core_1.Component({
            selector: 'manage-login-banner',
            templateUrl: './manage-login-banner.html'
        }),
        __metadata("design:paramtypes", [loader_service_1.LoaderService, data_service_1.DataService])
    ], ManageLoginBanner);
    return ManageLoginBanner;
}(ListDataCrud_1.ListDataCrud));
exports.ManageLoginBanner = ManageLoginBanner;
//# sourceMappingURL=manage-login-banner.js.map