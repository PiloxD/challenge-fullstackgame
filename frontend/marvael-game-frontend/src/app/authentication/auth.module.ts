import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../authentication/page/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { GameModule } from '../game/game.module';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    GameModule,
    AuthRoutingModule
  ],

})
export class AuthModule {}
