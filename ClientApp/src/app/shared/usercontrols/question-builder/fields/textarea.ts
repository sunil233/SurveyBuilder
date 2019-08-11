import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

// text,email,tel,textarea,password, 
@Component({
    selector: 'textarea',
    template: `
      <div [formGroup]="form">
        <textarea  class="form-control"  [formControlName]="field.questionCode"  [(ngModel)]="field.answer" ></textarea>
      </div> 
    `
})
export class TextAreaComponent {
    @Input() field: any = {};
    @Input() form: FormGroup;
    get isValid() {
        if (this.form.controls[this.field.questionCode] != undefined) {
            return this.form.controls[this.field.questionCode].valid;
        }
        else
            return false;
    }
    get isDirty() {
        if (this.form.controls[this.field.questionCode] != undefined) {
            return this.form.controls[this.field.questionCode].dirty;
        }
        else
            return false;
    }
    constructor(private cd: ChangeDetectorRef) {
    }
    ngAfterViewChecked(): void {
        this.cd.detectChanges();
    }
}