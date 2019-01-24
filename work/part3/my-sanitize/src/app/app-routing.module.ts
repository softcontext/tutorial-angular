import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './page/home/home.component';
import { Sanitize1Component } from './page/sanitize1/sanitize1.component';
import { Sanitize2Component } from './page/sanitize2/sanitize2.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'sanitize1', component: Sanitize1Component },
  { path: 'sanitize2', component: Sanitize2Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
