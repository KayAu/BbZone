import { Input, Output, EventEmitter, ViewChild } from '@angular/core'
import { ListEvent } from './listEvent';
import { LoaderService } from '../loader/loader.service';
import { DataService } from '../services/data.service';
import { BroadcastService } from '../services/broadcast.service';
import { FormSubmit } from '../model/form-submit';
import { TablerowDataMapping } from '../model/tablerow.data.mapping';
import { NgForm } from '@angular/forms';

export abstract class ListDataCrud extends ListEvent  {
  @ViewChild(NgForm) form: NgForm;
  newRecord = {};
  editedRecord = {};
  fieldMapper: TablerowDataMapping[] = [];
  keyField: string;
    formName: string;
    showNewRow: boolean = false;

  constructor(public loaderService: LoaderService, public dataService: DataService, public defaultSortedColumn: string, public formEvent: BroadcastService) {
    super(loaderService, dataService, defaultSortedColumn);
  }

  initDataRecord(fieldMapper: TablerowDataMapping[]) {
    this.fieldMapper = fieldMapper;

    for (let field of fieldMapper) {
      this.newRecord[field.fieldName] = '';
      this.editedRecord[field.fieldName] = '';
    }

    this.setKeyField();
  }

  addRow() {
    this.formEvent.notify(new FormSubmit(this.form, this.formName));
      if (!this.form.valid) return;
      this.dataService.add(this.controllerName, this.newRecord).subscribe(data => {
          this.setListDisplay(data);
          this.resetNewRecord();
          this.resetPageAndColSort();
      });
  }

  editRow(rowIndex: number) {
    this.hideEditingRow();
    this.dataSource[rowIndex].onEdit = true;
    this.editedRecord = (<any>Object).assign(this.editedRecord, this.dataSource[rowIndex])
  }

  updateRow(rowIndex: number) {
    this.formEvent.notify(new FormSubmit(this.form, this.formName));
    if (!this.form.valid) return;

    this.dataSource[rowIndex] = this.editedRecord;
    this.dataService.update(this.controllerName, this.editedRecord[this.keyField], this.editedRecord).subscribe(data => {
        this.dataSource[rowIndex] = data;
        this.dataSource[rowIndex].onEdit = false;
    });
  }

  deleteRow(rowIndex: number) {
    this.dataService.remove(this.controllerName, this.dataSource[rowIndex][this.keyField]).subscribe(data => {
      this.reloadData();
    });
  }

  cancelEdit(rowIndex: number) {
    this.dataSource[rowIndex].onEdit = false;
  }

    clearSearchParam() {
        for (let [key, value] of Object.entries(this.searchParams)) {
            this.searchParams[key] = null;
        }
        this.reloadData();
    }

  private setKeyField() {
    let field = this.fieldMapper.filter(f => f.keyField === true);
    if (field.length > 0)
      this.keyField = field[0].fieldName;
  }

  private hideEditingRow() {
    this.dataSource.forEach(function (element, index, array) {
      array[index].onEdit = false;
    });
    this.showNewRow = false;
  }

  private resetNewRecord() {
    for (let field of this.fieldMapper) {
      this.newRecord[field.dataFieldControl.controlName] = '';
      }
      this.showNewRow = false;
  }

    private resetPageAndColSort() {
        this.resetSorting();
        this.listPage.currentPage = 1;
    }
}
