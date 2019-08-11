import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Page, Question, Option } from "../../../../models/survey.models";

@Component({
    selector: 'radio',
    template: `
      <div [formGroup]="form">
        <div class="form-check" *ngFor="let opt of field.options">
          <input class="form-check-input" type="radio" [value]="opt.key" [formControlName]="field.questionCode"  [(ngModel)]="field.selectedAnswer" (change)="updatePageflowFromChildren(field);">
          <label class="form-check-label">
            {{opt.label}}
          </label>
        </div>
      </div> 
    `
})
export class RadioComponent {
    @Input() field: any = {};
    @Input() page: any;
    @Input() form: FormGroup;
    constructor(private cd: ChangeDetectorRef) {
    }
    updatePageflowFromChildren(question: Question) {
        const option: Option = question.options.filter(x => x.key == question.selectedAnswer)[0];
        this.page.pageflow = option.pageflow;
    }
    ngAfterViewChecked(): void {
        this.cd.detectChanges();
    }
}