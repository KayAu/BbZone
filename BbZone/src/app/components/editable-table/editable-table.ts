import { Component, Input } from '@angular/core';
import { DataDisplayType } from '../../enums/dataDisplayType';

@Component({
    selector: 'editable-table',
    templateUrl: './editable-table.html'
})


export class EditableTable {
    typeOfDisplay = DataDisplayType;
    @Input() displayType: DataDisplayType;
    @Input() displayValue: any;

    constructor() { }
}
