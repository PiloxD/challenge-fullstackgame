import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./authentication/auth.module').then((m) => m.AuthModule),
    ...canActivate(() => redirectLoggedInTo(['home'])),
  },
  {
    path: '',
    loadChildren: () => import('./game/game.module').then((m) => m.GameModule),
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
  {
    path: '',
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
    ...canActivate(() => redirectUnauthorizedTo(['/admin'])),
  },
  {
    path: '**',
    redirectTo: "/login",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
