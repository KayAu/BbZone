import { Component, EventEmitter, Output, Input, ViewChild, ElementRef, forwardRef } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ApiController } from '../../enums/apiController';
import { Subject } from 'rxjs';
import { BroadcastService } from 'src/app/services/broadcast.service';
import { Subscription } from 'rxjs';
import { FormSubmit } from 'src/app/model/form-submit';
import { NgForm, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
declare var $: any;

@Component({
    selector: 'customer-finder',
    templateUrl: './customer-finder.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CustomerFinder),
            multi: true
        }
        //,{ provide: NG_VALIDATORS, useExisting: forwardRef(() => FieldBuilder), multi: true }
    ]
})

export class CustomerFinder implements ControlValueAccessor  {
    private subscription: Subscription;
    parentForm: NgForm;
    selectedCustomer: string = null;
    dropdownItems: any[] = [];
    loadData: boolean = false;
    startSearching: boolean = false;
    searchFieldInput: Subject<string> = new Subject();
    @ViewChild('searchInput') searchInput: ElementRef;
    @Output() onItemSelected = new EventEmitter();
    @Input() disabledEdit: boolean = false;
    @Input() fieldId: string;
    @Input()
    set displayText(data: any) {
        this.selectedCustomer = data;
    }

    constructor(
        private el: ElementRef,
        private formEvent: BroadcastService,
        private dataService: DataService

    ) {
        this.subscription = this.formEvent.notification.subscribe((form: FormSubmit) => {
            this.parentForm = form.template;
            this.validate();
        });
    }

    ngOnInit() {
        this.searchFieldInput.asObservable().debounceTime(500).distinctUntilChanged().subscribe((data) => {
            this.search(data)
        });
    }

    onItemClicked(selectedIndex: number) {
        this.selectedCustomer = this.dropdownItems[selectedIndex].customerName;
        this.onItemSelected.emit(this.dropdownItems[selectedIndex]);
        this.hideDropwdown();
        this.clearErrorMessages();
    }

    onSearchInputChanged(keyword: string) {        
        this.searchFieldInput.next(keyword);  

        if (!keyword) {
            this.selectedCustomer = null;
            this.hideDropwdown();
            this.onItemSelected.emit(null);
        }
    }

    private validate() {
        let thisElement = $(this.el.nativeElement);

        if (this.selectedCustomer === null) {
            thisElement.next('.text-danger').remove();
            thisElement.after('<span class= "text-danger">This is required</span>');
            $(this.parentForm.controls[this.fieldId]).addClass('data-invalid');
            this.parentForm.controls[this.fieldId].setErrors({ 'required': true });
        }
        else {
            this.clearErrorMessages();
            this.parentForm.controls[this.fieldId].setErrors(null);
        }
    }

    private clearErrorMessages() {
        let thisElement = $(this.el.nativeElement);
        $(this.parentForm.controls[this.fieldId]).removeClass('data-invalid');
        thisElement.next().remove();
    }

    private search(keyword) {
        if (!keyword) return;

        this.loadData = true;
        this.startSearching = true;
        this.dataService.get(`${ApiController.CustomerApplication}/Find/${keyword}`).subscribe(data => {
            this.startSearching = false;
            this.dropdownItems = !data ? [] : data;
        });
    }

    private hideDropwdown() {
        this.loadData = false;
        this.dropdownItems = [];
    }

    writeValue(val: any): void {}
    registerOnChange(fn: any): void {}
    registerOnTouched() { }
    setDisabledState?() { }
}