import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KpopComponent } from './kpop/kpop.component';
import { EmpComponent } from './emp/emp.component';

const routes: Routes = [
  { path: '', redirectTo: 'kpop', pathMatch: 'full' },
  { path: 'kpop', component: KpopComponent },
  { path: 'emp', component: EmpComponent },
  { path: '**', component: KpopComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
