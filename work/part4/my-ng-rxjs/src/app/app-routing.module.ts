import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './page/home/home.component';
import { ExampleComponent } from './page/example/example.component';
import { SampleComponent } from './page/sample/sample.component';
import { TestComponent } from './test/test.component';
import { Test2Component } from './test2/test2.component';
import { Test3Component } from './test3/test3.component';
import { Test4Component } from './test4/test4.component';
import { Test5Component } from './test5/test5.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'example', component: ExampleComponent },
  { path: 'sample', component: SampleComponent },
  { path: 'test', component: TestComponent },
  { path: 'test2', component: Test2Component },
  { path: 'test3', component: Test3Component },
  { path: 'test4', component: Test4Component },
  { path: 'test5', component: Test5Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
