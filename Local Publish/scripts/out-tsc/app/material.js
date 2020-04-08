"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var MaterialModule = /** @class */ (function () {
    function MaterialModule() {
    }
    MaterialModule = __decorate([
        core_1.NgModule({
            exports: [
                //MatAutocompleteModule,
                //MatBadgeModule,
                //MatBottomSheetModule,
                //MatButtonModule,
                //MatButtonToggleModule,
                //MatCardModule,
                //MatCheckboxModule,
                //MatChipsModule,
                //MatStepperModule,
                //MatDatepickerModule,
                //MatDialogModule,
                //MatDividerModule,
                //MatExpansionModule,
                //MatFormFieldModule,
                //MatGridListModule,
                //MatIconModule,
                //MatInputModule,
                //MatListModule,
                //MatMenuModule,
                //MatNativeDateModule,
                //MatPaginatorModule,
                //MatProgressBarModule,
                //MatProgressSpinnerModule,
                //MatRadioModule,
                //MatRippleModule,
                //MatSelectModule,
                material_1.MatSidenavModule,
                material_1.MatSliderModule,
                material_1.MatSlideToggleModule,
            ]
        })
    ], MaterialModule);
    return MaterialModule;
}());
exports.MaterialModule = MaterialModule;
//# sourceMappingURL=material.js.map