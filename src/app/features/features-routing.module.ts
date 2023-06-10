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
import {EditCompanyComponent} from "./company/edit-company/edit-company.component";
import {SocietydetailsComponent} from "./company/society-detail/societydetails.component";
import {GuideComponent} from "../guide/guide.component";
import {EditClientComponent} from "./client/edit-client/edit-client.component";
import {GuideDetailsComponent} from "../guide/guide-details/guide-details.component";
import {ProfileComponent} from "./manager/profile/profile.component";

const routes: Routes = [
  {path: 'client', component: ClientComponent},
  {path: 'manager', component: ManagerComponent},
  {path: 'prospect', component: CompanyComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'task', component: TaskComponent},
  {path: 'project', component: ProjectComponent},
  {path: 'action', component: ActionsComponent},
  {path: 'reclamation', component: ReclamationComponent},
  {path: 'add-company', component: AddCompanyComponent},
  {path: 'edit-company/:idCompany', component: EditCompanyComponent},
  {path: 'society-details/:id', component: SocietydetailsComponent},
  {path: 'prospection_guide', component: GuideComponent},
  {path: 'edit-client/:idCompany', component: EditClientComponent},
  {path: 'guide-details/:id', component: GuideDetailsComponent},
  {path: 'profile', component: ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
