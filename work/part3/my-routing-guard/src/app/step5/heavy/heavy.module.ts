import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Heavy1Component } from './heavy1/heavy1.component';
import { Heavy2Component } from './heavy2/heavy2.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: Heavy1Component },
  { path: 'heavy1', component: Heavy1Component },
  {
    path: 'heavy2', component: Heavy2Component,
    loadChildren: 'src/app/step5/some/some.module#SomeModule'
  },
]

@NgModule({
  declarations: [Heavy1Component, Heavy2Component],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class HeavyModule {
  constructor() {
    console.log('HeavyModule()');
  }
}
