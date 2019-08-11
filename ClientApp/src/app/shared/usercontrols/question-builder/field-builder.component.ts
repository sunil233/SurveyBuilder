import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'field-builder',
    template: `
  <div class="form-group row" [formGroup]="form">
    <div class="col-md-12" [ngSwitch]="field.questionType">
     <label  [attr.for]="field.questionTitle">
          {{field.questionTitle}}
        </label>
      <textbox *ngSwitchCase="'text'" [field]="field" [form]="form" ></textbox>
      <textarea *ngSwitchCase="'textarea'" [field]="field" [form]="form"></textarea>
      <dropdown *ngSwitchCase="'dropdown'" [field]="field" [form]="form"></dropdown>
      <datepicker *ngSwitchCase="'datepicker'" [field]="field" [form]="form"></datepicker>
      <checkbox *ngSwitchCase="'checkbox'" [field]="field" [form]="form"></checkbox>
      <radio *ngSwitchCase="'radio'" [field]="field" [form]="form" [page]="page"></radio>
      <file *ngSwitchCase="'file'" [field]="field" [form]="form"></file>
      <div class="alert alert-danger my-1 p-2 fadeInDown animated" *ngIf="!isValid && isDirty">{{field.questionTitle}} is required</div>
    </div>
  </div>
  `
})
export class FieldBuilderComponent implements OnInit {
    @Input() field: any;
    @Input() page: any;
    @Input() form: any;
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

    constructor() { }

    ngOnInit() {
    }

}
