import { Component, EventEmitter, Input, Output, ElementRef } from '@angular/core';
import { DataRowAction } from "../../interfaces/dataRowAction";

@Component({
  selector: 'tablerow-buttons',
  template: `<div *ngIf="!editMode; else editActions">
              <button type="button" class="btn btn-success mrg5R" (click)="editRow()" [ngClass]="{'btn-sm' : hideDelete, 'btn-xs' : !hideDelete }" [disabled]="disabledEdit" *ngIf="!hideEdit">
                <i class="fa fa-edit"></i>
                
              </button>
              <button type="button" class="btn btn-xs btn-info" (click)="deleteRow()" *ngIf="!hideDelete" [disabled]="disabledDelete">
                <i class="fa fa-trash"></i>
              </button>
            </div>
            <ng-template #editActions>
              <button type="button" class="btn btn-xs btn-primary mrg5R" (click)="updateRow()">
                <i class="fa fa-check"></i>
              </button>
              <button type="button" class="btn btn-xs btn-warning" (click)="cancelEdit()">
                <i class="fa fa-times"></i>
              </button>
            </ng-template>`
})

export class TableRowButtons extends DataRowAction {
    @Input() editMode: boolean;
    @Input() hideDelete: boolean = false;
    @Input() hideEdit: boolean = false;
    @Input() disabledEdit: boolean = false;
    @Input() disabledDelete: boolean = false;
    @Output() onEdit = new EventEmitter();
    @Output() onDelete = new EventEmitter();
    @Output() onUpdate = new EventEmitter();
    @Output() onCancelEdit = new EventEmitter();

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

    addRow() { }
}
