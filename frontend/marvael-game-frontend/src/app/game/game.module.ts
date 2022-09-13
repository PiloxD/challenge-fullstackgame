import { NgModule } from '@angular/core';

import { GameRoutingModule } from './game-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { NewGameComponent } from './pages/new-game/newgame.component';
import { DashboardComponent } from '../game/pages/dashboard/dashboard.component';
import { GameListComponent } from './pages/gamelist/gamelist.component';
import { ErrorComponent } from './pages/error404/error.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { GameComponent } from './game.component';
import { PrimeNgModule } from '../component/prime-ng.module';


@NgModule({
  declarations: [
    HomeComponent,
    NewGameComponent,
    DashboardComponent,
    GameListComponent,
    ErrorComponent,
    GameComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    GameRoutingModule,
    HttpClientModule,
    RouterModule,
    PrimeNgModule,
  ],
  exports: [RouterModule],
})
export class GameModule {}
