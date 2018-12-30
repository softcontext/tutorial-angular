import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './public/home/home.component';
import { NotFoundComponent } from './public/not-found/not-found.component';

import { DataComponent } from './step1/data/data.component';
import { DataResolveGuard } from './step1/data-resolve.guard';

import { StoryComponent } from './step2/story/story.component';
import { StoryCanDeactivateGuard } from './step2/story-can-deactivate.guard';

import { LoginComponent } from './step3/login/login.component';
import { MemberOnlyComponent } from './step3/member-only/member-only.component';
import { MemberOnlyCanActivateGuard } from './step3/member-only-can-activate.guard';

import { ParentComponent } from './step4/parent/parent.component';
import { Child1Component } from './step4/parent/child1/child1.component';
import { Child2Component } from './step4/parent/child2/child2.component';
import { Child3Component } from './step4/parent/child3/child3.component';
import { ParentCanActivateChildGuard } from './step4/parent-can-activate-child.guard';

import { HeavyCanLoadGuard } from './step5/heavy-can-load.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'data/:id',
    // 정적인 데이터 = {Key:Value}
    data: { key: 'static value' },
    // 동적인 데이터 = {Key:함수가 리턴한 Value}
    resolve: { contact: DataResolveGuard },
    component: DataComponent,
  },
  { path: 'story', component: StoryComponent, canDeactivate: [StoryCanDeactivateGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'member-only', canActivate: [MemberOnlyCanActivateGuard], component: MemberOnlyComponent },
  {
    path: 'parent',
    data: { parentKey: 'parentValue' },
    component: ParentComponent,
    canActivateChild: [ParentCanActivateChildGuard],
    children: [
      { path: '', component: Child1Component },
      { path: 'child1', component: Child1Component },
      { path: 'child2', component: Child2Component, data: { childKey: 'childValue' } },
      { path: 'child3', component: Child3Component },
      { path: 'child3/:id', component: Child3Component },
    ]
  },
  {
    path: 'heavy',
    canLoad: [HeavyCanLoadGuard],
    loadChildren: 'src/app/step5/heavy/heavy.module#HeavyModule'
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
