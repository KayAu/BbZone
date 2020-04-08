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
var forms_1 = require("@angular/forms");
var file_download_1 = require("src/app/services/file-download");
var data_service_1 = require("../../services/data.service");
var FileUploader = /** @class */ (function () {
    function FileUploader(el, dataService) {
        this.el = el;
        this.dataService = dataService;
        this.uploadedFiles = [];
        this.propagateChange = function () { };
    }
    FileUploader_1 = FileUploader;
    FileUploader.prototype.clear = function () {
        this.uploadedFiles = null;
        this.propagateChange(null);
    };
    FileUploader.prototype.writeValue = function (files) {
        if (!files)
            return;
        this.uploadedFiles = files;
    };
    FileUploader.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    FileUploader.prototype.setChangedValue = function (value) {
        this.propagateChange(value);
    };
    FileUploader.prototype.uploadFile = function (files) {
        if (files.length === 0)
            return;
        Array.prototype.push.apply(this.uploadedFiles, files);
        this.propagateChange(this.uploadedFiles);
    };
    FileUploader.prototype.downloadFile = function (fileUrl, fileName) {
        if (!fileUrl)
            return;
        // Process the file downloaded
        this.dataService.download(fileUrl).subscribe(function (res) {
            //let fileName = getFileNameFromResponseContentDisposition(res);
            file_download_1.saveFile(res.blob, fileName);
        });
    };
    FileUploader.prototype.removeFile = function (fileNo) {
        this.uploadedFiles[fileNo].deleted = true;
        this.propagateChange(this.uploadedFiles);
    };
    FileUploader.prototype.getFileSize = function (filesize) {
        return Math.floor(filesize / 1000);
    };
    FileUploader.prototype.registerOnTouched = function () { };
    FileUploader.prototype.setDisabledState = function () { };
    var FileUploader_1;
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], FileUploader.prototype, "filePath", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], FileUploader.prototype, "propagateChange", void 0);
    FileUploader = FileUploader_1 = __decorate([
        core_1.Component({
            selector: 'file-uploader',
            templateUrl: './file-uploader.html',
            styleUrls: ['./file-uploader.css'],
            providers: [
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return FileUploader_1; }),
                    multi: true
                }
            ]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, data_service_1.DataService])
    ], FileUploader);
    return FileUploader;
}());
exports.FileUploader = FileUploader;
//# sourceMappingURL=file-uploader.js.map