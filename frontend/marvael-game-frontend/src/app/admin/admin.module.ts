import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameModule } from '../game/game.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './page/admin.component';


@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    GameModule,
  ],

})
export class AdminModule {}
