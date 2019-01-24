import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './page/home/home.component';
import { Animation1Component } from './page/animation1/animation1.component';
import { Animation2Component } from './page/animation2/animation2.component';
import { Animation3Component } from './page/animation3/animation3.component';
import { Animation4Component } from './page/animation4/animation4.component';
import { Animation5Component } from './page/animation5/animation5.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'animation1', component: Animation1Component },
  { path: 'animation2', component: Animation2Component },
  { path: 'animation3', component: Animation3Component },
  { path: 'animation4', component: Animation4Component },
  { path: 'animation5', component: Animation5Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
