import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { TitleComponent } from './core/title/title.component';
import { MemberComponent } from './member/member.component';
// import { PlayerComponent } from './player/player.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'title', component: TitleComponent },
  { path: 'member', component: MemberComponent },

  // Uncaught Error:
  // Component PlayerComponent is not part of any NgModule
  // or the module has not been imported into your module.
  // { path: 'player', component: PlayerComponent },

  { path: 'player', loadChildren: 'src/app/player/player.module#PlayerModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor() {
    console.log('AppRoutingModule()');
  }
}
