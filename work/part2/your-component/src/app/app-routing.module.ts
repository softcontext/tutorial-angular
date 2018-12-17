import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './root/home/home.component';

import { InterpolationComponent } from './binding/interpolation/interpolation.component';
import { PropertyComponent } from './binding/property/property.component';
import { EventComponent } from './binding/event/event.component';
import { TwowayComponent } from './binding/twoway/twoway.component';

import { NgClassComponent } from './directive/built-in/ng-class/ng-class.component';
import { NgIfComponent } from './directive/built-in/ng-if/ng-if.component';
import { NgForComponent } from './directive/built-in/ng-for/ng-for.component';
import { NgSwitchComponent } from './directive/built-in/ng-switch/ng-switch.component';
import { RefComponent } from './directive/built-in/ref/ref.component';

import { HighlightComponent } from './directive/custom/highlight/highlight.component';

import { DataHolderComponent } from './service/data-holder/data-holder.component';
import { BuiltInComponent } from './pipe/built-in/built-in.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  // { path: 'bind/interpolation', component: InterpolationComponent },
  // { path: 'bind/property', component: PropertyComponent },
  // { path: 'bind/event', component: EventComponent },
  // { path: 'bind/twoway', component: TwowayComponent },
  {
    path: 'bind',
    children: [
      { path: 'interpolation', component: InterpolationComponent },
      { path: 'property', component: PropertyComponent },
      { path: 'event', component: EventComponent },
      { path: 'twoway', component: TwowayComponent },
    ]
  },
  {
    path: 'directive',
    children: [
      { path: 'ng-class', component: NgClassComponent },
      { path: 'ng-if', component: NgIfComponent },
      { path: 'ng-for', component: NgForComponent },
      { path: 'ng-switch', component: NgSwitchComponent },
      { path: 'ref', component: RefComponent },
      { path: 'custom', component: HighlightComponent },
    ]
  },
  {
    path: 'service',
    children: [
      { path: 'data-holder', component: DataHolderComponent },
    ]
  },
  {
    path: 'pipe',
    children: [
      { path: 'built-in', component: BuiltInComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
