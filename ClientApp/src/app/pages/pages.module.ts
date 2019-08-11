import { NgModule } from '@angular/core';
import {  RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { UserAuthGuardService as UserAuthGuard } from './guards/UserAuthGuardService';
import { pageroutes } from './page.routes';

@NgModule({
    imports: [
        SharedModule,      
        RouterModule.forRoot(pageroutes)
    ],
    declarations: [LoginComponent],
    exports: [
        RouterModule
    ],
    providers: [UserAuthGuard],
})
export class PagesModule { }
