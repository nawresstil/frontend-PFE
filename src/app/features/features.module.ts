import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client/client.component';
import { ActionsComponent } from './actions/actions.component';
import { CompanyComponent } from './company/company.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagerComponent } from './manager/manager.component';
import { ProjectComponent } from './project/project.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { TaskComponent } from './task/task.component';
import {FeaturesRoutingModule} from './features-routing.module';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "../authgarde/auth.interceptor";
import { AddCompanyComponent } from './company/add-company/add-company.component';
import { EditCompanyComponent } from './company/edit-company/edit-company.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ClientComponent,
    ActionsComponent,
    CompanyComponent,
    DashboardComponent,
    ManagerComponent,
    ProjectComponent,
    ReclamationComponent,
    TaskComponent,
    AddCompanyComponent,
    EditCompanyComponent
  ],
    imports: [
        CommonModule,
        FeaturesRoutingModule,
        FormsModule,
        ReactiveFormsModule

    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
})
export class FeaturesModule { }
