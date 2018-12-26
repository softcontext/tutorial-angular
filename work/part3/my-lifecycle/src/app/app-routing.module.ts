import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParentComponent } from './parent/parent.component';
import { SoloComponent } from './solo/solo.component';

const routes: Routes = [
  { path: '', redirectTo: 'parent', pathMatch: 'full' },
  { path: 'parent', component: ParentComponent },
  { path: 'solo', component: SoloComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
