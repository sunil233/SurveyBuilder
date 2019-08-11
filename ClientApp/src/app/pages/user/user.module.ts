import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
    { path: '', redirectTo: 'dashboard' ,  pathMatch: 'full'},
    { path: 'dashboard', component: DashboardComponent }   
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedModule.forRoot()
    ],
    declarations: [
        DashboardComponent       
    ],
    exports: [
        RouterModule
    ]
})
export class UserModule { }
