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

const routes: Routes = [
  {path: 'client', component: ClientComponent},
  {path: 'manager', component: ManagerComponent},
  {path: 'prospect', component: CompanyComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'task', component: TaskComponent},
  {path: 'project', component: ProjectComponent},
  {path: 'action', component: ActionsComponent},
  {path: 'reclamation', component: ReclamationComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
