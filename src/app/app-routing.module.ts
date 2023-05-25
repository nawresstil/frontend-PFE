import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {ContainerComponent} from './home/container/container.component';
import {AuthGuard} from "./authgarde/auth.guards";

const routes: Routes = [{path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent, children: [
      {path: '', component: ContainerComponent},
      {
        path: 'features',
        loadChildren: () => import('./features/features.module').then(m => m.FeaturesModule)
      }
    ], canActivate: [AuthGuard]}];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
