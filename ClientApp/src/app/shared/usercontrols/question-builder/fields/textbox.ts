import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Question } from "../../../../models/survey.models";

// text,email,tel,textarea,password, 
@Component({
    selector: 'textbox',
    template: `
      <div [formGroup]="form">
       <input  type="text" class="form-control"  [formControlName]="field.questionCode"  [(ngModel)]="field.answer">
      </div> 
    `
})
export class TextBoxComponent {
    @Input() field: Question ;
    @Input() form: FormGroup;
   

    constructor(private cd: ChangeDetectorRef) {
    }
    ngAfterViewChecked(): void {
        this.cd.detectChanges();
    }
}