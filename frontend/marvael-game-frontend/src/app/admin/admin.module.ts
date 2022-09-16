import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameModule } from '../game/game.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './page/admin.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    GameModule,
    FormsModule
  ],

})
export class AdminModule {}
