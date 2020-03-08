import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DataRowAction } from "../../interfaces/dataRowAction";

@Component({
    selector: 'dropdown-action',
    template: `<div *ngIf="!editMode; else editActions">
              <button type="button" class="btn btn-success btn-flat btn-xs" (click)="editRow()">
                <i class="fa fa-edit"></i>
              </button>
              <button type="button" class="btn btn-info btn-flat btn-xs" [disabled]="disabledDelete" (click)="deleteRow()">
                <i class="fa fa-trash"></i>
              </button>
            </div>
            <ng-template #editActions>
              <button type="button" class="btn btn-primary btn-flat btn-xs" (click)="updateRow()">
                <i class="fa fa-check"></i>
              </button>
              <button type="button" class="btn btn-default btn-flat btn-xs" (click)="cancelEdit()">
                <i class="fa fa-times"></i>
              </button>
            </ng-template>`
})

export class DropdownAction extends DataRowAction  {
    disabledDelete: boolean;
    @Input() editMode: boolean;
    @Output() onEdit = new EventEmitter();
    @Output() onDelete = new EventEmitter();
    @Output() onUpdate = new EventEmitter();
    @Output() onCancelEdit = new EventEmitter();

    @Input()
    set allowDelete(deletable: boolean) {
        if (deletable === false) {
            this.disabledDelete = true;
        }
        else {
            this.disabledDelete = false;
        }
    }

    addRow() {}
    rowOnEdit(rowIndex: number) {}

    editRow() {
        this.onEdit.emit();
    }

    updateRow() {
        this.onUpdate.emit();
    }

    deleteRow() {
        this.onDelete.emit();
    }

    cancelEdit() {
        this.onCancelEdit.emit();
    }
 
}
