"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FormDataMapping = /** @class */ (function () {
    function FormDataMapping(fieldName, displayText, hidden, dataFieldControl) {
        this.fieldName = fieldName;
        this.displayText = displayText;
        this.hidden = hidden;
        this.dataFieldControl = dataFieldControl;
    }
    return FormDataMapping;
}());
exports.FormDataMapping = FormDataMapping;
var SearchFieldMapping = /** @class */ (function () {
    function SearchFieldMapping(fieldName, displayText, width, dataFieldControl) {
        this.fieldName = fieldName;
        this.displayText = displayText;
        this.width = width;
        this.dataFieldControl = dataFieldControl;
    }
    return SearchFieldMapping;
}());
exports.SearchFieldMapping = SearchFieldMapping;
var FormDataGroupMapping = /** @class */ (function () {
    function FormDataGroupMapping(fieldName, displayText, hidden, groupName, dataFieldControl) {
        this.fieldName = fieldName;
        this.displayText = displayText;
        this.hidden = hidden;
        this.groupName = groupName;
        this.dataFieldControl = dataFieldControl;
    }
    return FormDataGroupMapping;
}());
exports.FormDataGroupMapping = FormDataGroupMapping;
//# sourceMappingURL=form.data.mapping.js.map