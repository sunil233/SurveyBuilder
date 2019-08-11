import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchemaBuilderComponent } from "./schema/schema.component";
import { SharedModule } from "../../shared/shared.module";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
const routes: Routes = [
    { path: '', redirectTo: 'schema' },
    { path: 'schema', component: SchemaBuilderComponent }      
];

@NgModule({
    imports: [
      SharedModule,
      BsDatepickerModule.forRoot(),
      RouterModule.forChild(routes)
    ],
    declarations: [
        SchemaBuilderComponent          
    ],
    exports: [
        RouterModule
    ]
})
export class SurveyModule { }
