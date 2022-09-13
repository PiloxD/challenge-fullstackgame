import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NewGameComponent } from '../game/pages/new-game/newgame.component';
import { GameListComponent } from '../game/pages/gamelist/gamelist.component';
import { DashboardComponent } from '../game/pages/dashboard/dashboard.component';
import { GameComponent } from './game.component';
import { ErrorComponent } from '../game/pages/error404/error.component';

const routes: Routes = [
  {
    path: '',
    component: GameComponent,

    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home',
      },
      {
        path: 'home',
        pathMatch: 'full',
        component: HomeComponent,
      },
      {
        path: 'create',
        pathMatch: 'full',
        component: NewGameComponent,
      },
      {
        path: 'gamelist',
        pathMatch: 'full',
        component: GameListComponent,
      },
      {
        path: 'dashboard/:id',
        pathMatch: 'full',
        component: DashboardComponent,
      },
      {
        path: '404',
        component: ErrorComponent,
      },
      {
        path: "*",
        redirectTo: "/404"
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {}
