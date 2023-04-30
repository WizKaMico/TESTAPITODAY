import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgramListComponent } from './dashboard/program-list.component';
import { ProfileComponent } from './profile/profile.component';
import { AccountComponent } from './account/account.component';
import { ProgramComponent } from './program/program.component';
import { PartnersComponent } from './partners/partners.component';
import { ContentComponent } from './content/content.component';
import { ReportComponent } from './report/report.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { FacultyloginComponent } from './facultylogin/facultylogin.component';
import { FacultydashboardComponent } from './facultydashboard/facultydashboard.component';
import { FacultyregistrationComponent } from './facultyregistration/facultyregistration.component';
  




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ProgramListComponent,
    ProfileComponent,
    AccountComponent,
    ProgramComponent,
    PartnersComponent,
    ContentComponent,
    ReportComponent,
    RegisterComponent,
    FacultyloginComponent,
    FacultydashboardComponent,
    FacultyregistrationComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    AgGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
