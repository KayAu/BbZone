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
var ImageUploader = /** @class */ (function () {
    function ImageUploader() {
        this.errorMessage = null;
        this.imageChange = new core_1.EventEmitter();
    }
    ImageUploader.prototype.ngOnInit = function () { };
    ImageUploader.prototype.onDragOver = function () {
        return false;
    };
    ImageUploader.prototype.handleDrop = function (e) {
        e.preventDefault();
        this.handleImageFile(e.dataTransfer.files);
    };
    ImageUploader.prototype.removeImage = function (e) {
        this.imageFilename = '';
        this.imageSource = '';
        e.stopPropagation();
    };
    ImageUploader.prototype.handleImageFile = function (imageInput) {
        var _this = this;
        if (this.isFileValid(imageInput)) {
            var imageFile = imageInput[0];
            var reader = new FileReader();
            reader.readAsDataURL(imageFile);
            reader.onload = function (_event) {
                _this.imageFilename = imageFile.name;
                _this.imageSource = reader.result;
                _this.imageChange.emit(_this.imageSource);
            };
        }
    };
    ImageUploader.prototype.isFileValid = function (file) {
        if (file.length === 0)
            return false;
        var mimeType = file[0].type;
        if (mimeType.match(/image\/*/) !== null) {
            this.errorMessage = null;
            return true;
        }
        else {
            this.errorMessage = 'Invalid image!';
            return false;
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ImageUploader.prototype, "imageSource", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ImageUploader.prototype, "imageChange", void 0);
    __decorate([
        core_1.HostListener('dragover'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ImageUploader.prototype, "onDragOver", null);
    __decorate([
        core_1.HostListener('drop', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ImageUploader.prototype, "handleDrop", null);
    ImageUploader = __decorate([
        core_1.Component({
            selector: 'image-uploader',
            templateUrl: './image-uploader.html',
            styleUrls: ['./image-uploader.css']
        }),
        __metadata("design:paramtypes", [])
    ], ImageUploader);
    return ImageUploader;
}());
exports.ImageUploader = ImageUploader;
//# sourceMappingURL=image-uploader.js.map