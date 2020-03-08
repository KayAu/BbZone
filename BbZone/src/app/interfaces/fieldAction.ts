import { Input, Output, EventEmitter } from '@angular/core'

export abstract class FieldAction {
    abstract edit();
    abstract applyChanges();
    abstract cancelEdit();

    public editMode: boolean;
    @Output() onEdit = new EventEmitter();
    @Output() onApplyChanges = new EventEmitter();
    @Output() onCancel = new EventEmitter();
}