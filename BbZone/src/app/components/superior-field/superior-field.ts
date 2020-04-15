import { Component, Input, Output, ElementRef, forwardRef, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, Validator, AbstractControl, NG_VALIDATORS, NgForm } from '@angular/forms';
import { BroadcastService } from 'src/app/services/broadcast.service';
import { DataService } from 'src/app/services/data.service';
import { Subscription, Subject, Observable} from 'rxjs';
import { FormSubmit } from 'src/app/model/form-submit';
import { ApiController } from 'src/app/enums/apiController';

declare var $: any;

@Component({
    selector: 'superior-field',
    templateUrl: './superior-field.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SuperiorField),
            multi: true
        }
    ]
})

export class SuperiorField implements ControlValueAccessor {
    data: any;
    @Input() editable: boolean;
    @Input() parentForm: NgForm;
    @Input() fieldId: string;
    @Input() displayText: string;
    //@Input() isAdmin: boolean;
    @Output() propagateChange: any = () => { };
    searchFieldInput: Subject<string> = new Subject();
    agents: any[] = [];
    private subscription: Subscription;

    constructor(
        private el: ElementRef,
        private formEvent: BroadcastService,
        private dataService: DataService

    ) { }

    ngOnInit() {
        //this.subscription = this.formEvent.notification.subscribe((form: FormSubmit) => {
        //    //   if (form.name !== this.formName) return;
        //    this.parentForm = form.template;
        //    this.validate();
        //});
        this.searchFieldInput.asObservable().debounceTime(500).distinctUntilChanged().subscribe(data => this.search(data));
    }

    writeValue(val: any): void {
        this.data = val;
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    setChanges() {
        this.propagateChange(this.data);
    }

    onSearchInputChanged(keyword: string) {
        this.searchFieldInput.next(keyword);
    }

    selectItem(agent: any) {
        this.displayText = `${agent.agentId} - ${agent.fullname}`;
        this.data = agent.agentId;
        this.setChanges();
        this.agents = [];
    }

    clearDisplayText() {
        this.displayText = null;
        this.data = null;
        this.setChanges();
    }

    private search(keyword: string) {
        let thisElement = $(this.el.nativeElement);

        if (!keyword)
            this.clearErrorMessages(thisElement);

        this.dataService.get(`${ApiController.Agent}/GetAgents/`, keyword).subscribe(results => {
            if (results) {
                this.agents = results;
               // this.displayText = `${results} - ${results}`;
                //this.clearErrorMessages(thisElement);
                //this.setChanges();
            }
            //else {
            //    thisElement.next('.text-danger').remove();
            //    thisElement.after('<span class= "text-danger">Invalid Superior Id</span>');
            //    $(this.parentForm.controls[this.fieldId]).addClass('data-invalid');
            //    this.parentForm.controls[this.fieldId].setErrors({ 'required': true });
            //}
        });    
    }

    private clearErrorMessages(thisElement: any) {       
        $(this.parentForm.controls[this.fieldId]).removeClass('data-invalid');
        this.parentForm.controls[this.fieldId].setErrors(null);
        thisElement.next().remove();
    }

    registerOnTouched() { }
    setDisabledState?() { }
}
