"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataFieldControl = /** @class */ (function () {
    function DataFieldControl(controlName, controlType, required, maxLength, datasourceUrl, cascadeTo) {
        this.controlName = controlName;
        this.controlType = controlType;
        this.required = required;
        this.maxLength = maxLength;
        this.datasourceUrl = datasourceUrl;
        this.cascadeTo = cascadeTo;
    }
    return DataFieldControl;
}());
exports.DataFieldControl = DataFieldControl;
//# sourceMappingURL=data.field.control.js.map