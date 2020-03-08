import { Input, Output, EventEmitter } from '@angular/core'

export abstract class DataRowAction {
  abstract addRow();
  abstract editRow(rowIndex?: number);
  abstract updateRow(rowIndex?: number);
  abstract deleteRow(rowIndex?: number);
  abstract cancelEdit(rowIndex?: number);

}
