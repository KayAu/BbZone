import { Component, Input } from '@angular/core';
import { DataDisplayType } from '../../enums/dataDisplayType';

@Component({
  selector: 'data-field',
  templateUrl: './data-field.html'
})


export class DataField  {
  typeOfDisplay = DataDisplayType;
  @Input() displayType: DataDisplayType;
  @Input() displayValue: any;

  constructor() {}
}
