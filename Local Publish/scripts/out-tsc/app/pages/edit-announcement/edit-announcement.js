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
var router_1 = require("@angular/router");
var announcementFields_1 = require("../../metadata/announcementFields");
var form_data_mapping_1 = require("../../model/form.data.mapping");
var dataDisplayType_1 = require("../../enums/dataDisplayType");
var data_field_control_1 = require("../../model/data.field.control");
var broadcast_service_1 = require("../../services/broadcast.service");
var data_service_1 = require("../../services/data.service");
var loader_service_1 = require("../../loader/loader.service");
var ngx_toastr_1 = require("ngx-toastr");
var router_2 = require("@angular/router");
var apiController_1 = require("../../enums/apiController");
var forms_1 = require("@angular/forms");
var EditAnnouncement = /** @class */ (function () {
    function EditAnnouncement(loaderService, dataService, formEvent, router, route, toastr) {
        this.loaderService = loaderService;
        this.dataService = dataService;
        this.formEvent = formEvent;
        this.router = router;
        this.route = route;
        this.toastr = toastr;
        this.formFields = [];
        this.formRecord = {};
        this.isUpdating = false;
    }
    EditAnnouncement.prototype.ngOnInit = function () {
        this.recordId = this.route.snapshot.params.id;
        this.formFields = this.getFormFeldsMapping();
        this.loadRecord(this.route.snapshot.params.id);
    };
    EditAnnouncement.prototype.getFormFeldsMapping = function () {
        var columnMappings = announcementFields_1.EditAnnouncementFields.fields.map(function (o) { return new form_data_mapping_1.FormDataMapping(o.fieldName, o.displayText, o.hidden, !o.dataFieldControl ? null :
            new data_field_control_1.DataFieldControl(o.dataFieldControl.controlName, dataDisplayType_1.ControlType[o.dataFieldControl.controlType], o.dataFieldControl.required, o.dataFieldControl.maxLength, o.dataFieldControl["datasourceUrl"] !== undefined ? o.dataFieldControl["datasourceUrl"] : null)); });
        return columnMappings;
    };
    EditAnnouncement.prototype.submit = function () {
        var _this = this;
        this.setControlsAsTouched();
        if (!this.form.valid)
            return;
        this.isUpdating = true;
        var formData = new FormData();
        formData.append('data', JSON.stringify(this.formRecord));
        if (this.formRecord.customerDocuments) {
            for (var i = 0; i < this.formRecord.announcementDocuments.length; i++) {
                if (!this.formRecord.customerDocuments[i].deleted) {
                    formData.append("file" + i, this.formRecord.announcementDocuments[i]);
                }
            }
        }
        this.dataService.updateForm(apiController_1.ApiController.Announcement, this.recordId, formData).subscribe(function (data) {
            _this.isUpdating = false;
            _this.router.navigate(['/view-announcement']);
        });
    };
    EditAnnouncement.prototype.loadRecord = function (recordId) {
        var _this = this;
        this.dataService.get(apiController_1.ApiController.Announcement, recordId).subscribe(function (data) {
            _this.formRecord = data;
        });
    };
    EditAnnouncement.prototype.setControlsAsTouched = function () {
        for (var i in this.form.controls) {
            this.form.controls[i].markAsTouched();
        }
    };
    __decorate([
        core_1.ViewChild(forms_1.NgForm),
        __metadata("design:type", forms_1.NgForm)
    ], EditAnnouncement.prototype, "form", void 0);
    EditAnnouncement = __decorate([
        core_1.Component({
            selector: 'edit-announcement',
            templateUrl: './edit-announcement.html'
        }),
        __metadata("design:paramtypes", [loader_service_1.LoaderService, data_service_1.DataService, broadcast_service_1.BroadcastService,
            router_1.Router, router_2.ActivatedRoute, ngx_toastr_1.ToastrService])
    ], EditAnnouncement);
    return EditAnnouncement;
}());
exports.EditAnnouncement = EditAnnouncement;
//# sourceMappingURL=edit-announcement.js.map