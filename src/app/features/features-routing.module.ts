import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClientComponent} from './client/client.component';
import {ManagerComponent} from './manager/manager.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TaskComponent} from './task/task.component';
import {CompanyComponent} from './company/company.component';
import {ProjectComponent} from './project/project.component';
import {ActionsComponent} from './actions/actions.component';
import {ReclamationComponent} from './reclamation/reclamation.component';
import {AddCompanyComponent} from "./company/add-company/add-company.component";
import {AuthGuard} from "../authgarde/auth.guards";

const routes: Routes = [
  {path: 'client', component: ClientComponent, canActivate: [AuthGuard]},
  {path: 'manager', component: ManagerComponent, canActivate: [AuthGuard]},
  {path: 'prospect', component: CompanyComponent, canActivate: [AuthGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'task', component: TaskComponent, canActivate: [AuthGuard]},
  {path: 'project', component: ProjectComponent, canActivate: [AuthGuard]},
  {path: 'action', component: ActionsComponent, canActivate: [AuthGuard]},
  {path: 'reclamation', component: ReclamationComponent, canActivate: [AuthGuard]},
  {path: 'add-company', component: AddCompanyComponent, canActivate: [AuthGuard]}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
