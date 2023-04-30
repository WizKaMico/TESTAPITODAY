import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportComponent } from './report/report.component';
import { ContentComponent } from './content/content.component';
import { PartnersComponent } from './partners/partners.component';
import { ProgramComponent } from './program/program.component';
import { AccountComponent } from './account/account.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FacultyloginComponent } from './facultylogin/facultylogin.component';
import { FacultydashboardComponent } from './facultydashboard/facultydashboard.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'report', component: ReportComponent },
  { path: 'content', component: ContentComponent },
  { path: 'partners', component: PartnersComponent },
  { path: 'program', component: ProgramComponent },
  { path: 'account', component: AccountComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'facultylogin', component: FacultyloginComponent },
  { path: 'facultydashboard', component: FacultydashboardComponent } 
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
