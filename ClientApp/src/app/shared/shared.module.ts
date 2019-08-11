import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TabsModule } from 'ngx-bootstrap/tabs';
//import { NgBusyModule } from 'ng-busy';
import { CustomGridModule } from "./usercontrols/pocgrid/poc-grid.module";
import { SelectRequiredValidatorDirective } from './directives/selectrequired/selectrequired.directive';
import { QuestionBuilderModule } from "./usercontrols/question-builder/question-builder.module";


// https://angular.io/guide/sharing-ngmodules
//https://valor-software.com/ngx-bootstrap/#/getting-started
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AccordionModule.forRoot(),
        AlertModule.forRoot(),
        ButtonsModule.forRoot(),     
        CollapseModule.forRoot(),
        DatepickerModule.forRoot(),
        BsDatepickerModule.forRoot(),
        BsDropdownModule.forRoot(),
        ModalModule.forRoot(),
        PaginationModule.forRoot(),      
        TooltipModule.forRoot(),
        PopoverModule.forRoot()  ,  
        TabsModule.forRoot(),
        QuestionBuilderModule
      
    ],
    providers: [
    ],
    declarations: [
        SelectRequiredValidatorDirective
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        AccordionModule,
        AlertModule,
        ButtonsModule,
        CollapseModule,
        DatepickerModule,
        BsDatepickerModule,
        BsDropdownModule,
        ModalModule,
        PaginationModule,
        TooltipModule,
        PopoverModule,
        CustomGridModule,
        TabsModule,
        SelectRequiredValidatorDirective,      
        QuestionBuilderModule
    ]
})


export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule
        };
    }
}
