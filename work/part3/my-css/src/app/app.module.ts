import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParentComponent } from './parent/parent.component';
import { Child1Component } from './parent/child1/child1.component';
import { Child2Component } from './parent/child2/child2.component';
import { Child3Component } from './parent/child3/child3.component';

@NgModule({
  declarations: [
    AppComponent,
    ParentComponent,
    Child1Component, Child2Component, Child3Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
