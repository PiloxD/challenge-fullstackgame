import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { NewGameComponent } from './pages/new-game/newgame.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GameListComponent } from './pages/gamelist/gamelist.component';

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"home",component:HomeComponent, ...canActivate(()=> redirectUnauthorizedTo(['/login']))},
  {path:"new",component:NewGameComponent, ...canActivate(()=> redirectUnauthorizedTo(['/login']))},
  {path:"dashboard",component:DashboardComponent, ...canActivate(()=> redirectUnauthorizedTo(['/login']))},
  {path:"gamelist",component:GameListComponent, ...canActivate(()=> redirectUnauthorizedTo(['/login']))},

]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
