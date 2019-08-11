import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CustomGridComponent } from "./pocgrid.component";
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { Format } from './format';
import { OrderBy } from './orderby';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PaginationModule.forRoot()
    ],
    declarations: [
        CustomGridComponent,
        Format,
        OrderBy
    ],
    exports: [CustomGridComponent, Format, OrderBy, PaginationModule],
    providers: []
})
export class CustomGridModule { }
