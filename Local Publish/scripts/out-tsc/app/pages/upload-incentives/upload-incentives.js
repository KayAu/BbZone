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
var apiController_1 = require("src/app/enums/apiController");
var ngx_toastr_1 = require("ngx-toastr");
var UploadIncentives = /** @class */ (function () {
    function UploadIncentives(loaderService, dataService, toastr) {
        this.loaderService = loaderService;
        this.dataService = dataService;
        this.toastr = toastr;
    }
    UploadIncentives.prototype.ngOnInit = function () { };
    UploadIncentives.prototype.fileSelected = function (file) {
        this.selectedFile = file.files[0];
        console.log(file);
    };
    UploadIncentives.prototype.uploadFile = function () {
        var _this = this;
        if (this.selectedFile) {
            var formData = new FormData();
            formData.append("file", this.selectedFile);
            this.uploading = true;
            this.dataService.postForm(apiController_1.ApiController.IncentivesUpload, formData).subscribe(function (data) {
                _this.uploading = false;
                _this.incentivesNotUpdated = data;
                if (!_this.incentivesNotUpdated) {
                    _this.toastr.success('The payment incentives is updated successfully', 'Record Updated', { positionClass: 'toast-bottom-full-width' });
                }
            });
        }
    };
    UploadIncentives = __decorate([
        core_1.Component({
            selector: 'upload-incentives',
            templateUrl: './upload-incentives.html'
        }),
        __metadata("design:paramtypes", [loader_service_1.LoaderService, data_service_1.DataService, ngx_toastr_1.ToastrService])
    ], UploadIncentives);
    return UploadIncentives;
}());
exports.UploadIncentives = UploadIncentives;
//# sourceMappingURL=upload-incentives.js.map