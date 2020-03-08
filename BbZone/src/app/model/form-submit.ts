import { NgForm } from "@angular/forms";

export class FormSubmit {

    constructor(public template: NgForm, public name: string) { }
}