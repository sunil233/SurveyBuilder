import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
// text,email,tel,textarea,password, 
@Component({
  selector: 'datepicker',
  templateUrl: './datepicker.component.html'    
})
export class DatePickerComponent {
    @Input() field: any = {};
  @Input() form: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
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
    this.bsConfig = Object.assign({}, { containerClass: 'blue' });
    }
    ngAfterViewChecked(): void {
        this.cd.detectChanges();
    }
}
