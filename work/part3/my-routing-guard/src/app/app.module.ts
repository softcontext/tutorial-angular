import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './layout/header/header.component';
import { HomeComponent } from './public/home/home.component';
import { NotFoundComponent } from './public/not-found/not-found.component';
import { DataComponent } from './step1/data/data.component';
import { StoryComponent } from './step2/story/story.component';
import { LoginComponent } from './step3/login/login.component';
import { MemberOnlyComponent } from './step3/member-only/member-only.component';
import { ParentComponent } from './step4/parent/parent.component';
import { Child1Component } from './step4/parent/child1/child1.component';
import { Child2Component } from './step4/parent/child2/child2.component';
import { Child3Component } from './step4/parent/child3/child3.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NotFoundComponent,
    DataComponent,
    StoryComponent,
    LoginComponent,
    MemberOnlyComponent,
    ParentComponent,
    Child1Component,
    Child2Component,
    Child3Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
