import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'dropdown',
    template: `
      <div [formGroup]="form">
        <select class="form-control" [id]="field.questionCode" [formControlName]="field.questionCode" [(ngModel)]="field.answer">
          <option value="">--Select--</option>
          <option *ngFor="let opt of field.options" [value]="opt.key">{{opt.label}}</option>
        </select>
      </div> 
    `
})
export class DropDownComponent {
    @Input() field:any = {};
    @Input() form:FormGroup;

    constructor(private cd: ChangeDetectorRef) {
    }
    ngAfterViewChecked(): void {
        this.cd.detectChanges();
    }
}