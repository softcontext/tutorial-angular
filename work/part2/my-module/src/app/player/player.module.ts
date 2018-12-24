import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { CoachHttpService } from './coach-http.service';

import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', component: PlayerComponent },
];

@NgModule({
  declarations: [PlayerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [CoachHttpService]
})
export class PlayerModule {
  constructor() {
    console.log('PlayerModule()');
  }
}
