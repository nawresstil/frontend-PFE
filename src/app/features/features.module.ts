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

@NgModule({
  declarations: [
    ClientComponent,
    ActionsComponent,
    CompanyComponent,
    DashboardComponent,
    ManagerComponent,
    ProjectComponent,
    ReclamationComponent,
    TaskComponent],
  imports: [
    CommonModule,
    FeaturesRoutingModule
  ]
})
export class FeaturesModule { }
