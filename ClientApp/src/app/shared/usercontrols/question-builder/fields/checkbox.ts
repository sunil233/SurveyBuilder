import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Option,Question} from "../../../../models/survey.models";

@Component({
    selector: 'checkbox',
    template: `
      <div [formGroup]="form">
        <div [formGroupName]="field.questionCode" >
          <div>
          <div *ngFor="let opt of field.options; let i = index" class="form-check form-check">
          <label class="form-check-label">
             <input [formControlName]="opt.key" class="form-check-input" type="checkbox" [value]="opt.key"   (change)="updateSelectedAnswers(opt, field)" [(ngModel)]="opt.isChecked"  />
             {{opt.label}}</label>
          </div>
        </div>
        </div>
      </div> 
    `
})
export class CheckBoxComponent {
    @Input() field:any = {};
    @Input() form:FormGroup;
    constructor() {
    }
    updateSelectedAnswers(opt: Option, question: Question) {
        question.selectedAnswers = [];
        question.options.filter(x => x.isChecked).forEach(itm => {
            question.selectedAnswers.push(itm.key);
        });

        
    }
}