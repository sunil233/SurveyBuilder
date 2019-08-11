import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
// Question builder components
import { QuestionBuilderComponent } from './question-builder.component';
import { FieldBuilderComponent } from './field-builder.component';
import { TextBoxComponent } from './fields/textbox';
import { DropDownComponent } from './fields/dropdown';
import { FileComponent } from './fields/file';
import { CheckBoxComponent } from './fields/checkbox';
import { RadioComponent } from './fields/radio';
import { DatePickerComponent } from "./fields/datepicker";
import { TextAreaComponent } from "./fields/textarea";

@NgModule({
    imports: [
      CommonModule,
      ReactiveFormsModule,
      BsDatepickerModule.forRoot(),
    ],
    declarations: [
        QuestionBuilderComponent,
        FieldBuilderComponent,
        TextBoxComponent,
        DropDownComponent,
        CheckBoxComponent,
        FileComponent,
        RadioComponent,
        DatePickerComponent,
        TextAreaComponent
    ],
    exports: [QuestionBuilderComponent],
    providers: []
})
export class QuestionBuilderModule { }
