import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Question } from "../../../models/survey.models";

@Component({
    selector: 'question-builder',
    template: `
    <form [formGroup]="form" class="form-horizontal">
      <div *ngFor="let field of fields">
          <field-builder [field]="field" [form]="form" [page]="page"></field-builder>
      </div>
      <div class="form-row"></div>
      <div class="form-group row">
        <div class="col-md-3"></div>
        <div class="col-md-9">
        </div>
      </div>
    </form>
  `,
})
export class QuestionBuilderComponent implements OnInit {
    @Output() onSubmit = new EventEmitter();
    @Input() fields: any[] = [];
    @Input() page: any;
    @Input() parentForm: FormGroup;
    @Input() form: FormGroup;   
    constructor() { }
    ngOnInit() {
      
    }
}
