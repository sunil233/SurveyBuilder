import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserLayoutComponent } from '../layout/user-layout/user-layout.component';
import { UserAuthGuardService as UserAuthGuard } from './guards/UserAuthGuardService';

//Lazy Loading Feature Modules
export const pageroutes: Routes = [

  //user routes goes here 
  {
    path: '',
    component: UserLayoutComponent,
    canActivate: [UserAuthGuard],
    children: [
      { path: 'user', loadChildren: './user/user.module#UserModule' },
      { path: 'survey', loadChildren: "./survey/survey.module#SurveyModule" }
    ]
  },

  // Not lazy-loaded routes
  { path: 'login', component: LoginComponent },
  // Not found
  { path: '', pathMatch: 'prefix', redirectTo: 'login' }
];
