import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ParentComponent } from './parent/parent.component';
import { ChildAComponent } from './parent/child-a/child-a.component';
import { ChildBComponent } from './parent/child-b/child-b.component';
import { SoloComponent } from './solo/solo.component';
import { HighlightDirective } from './directive/highlight.directive';

@NgModule({
  declarations: [
    AppComponent,
    ParentComponent,
    ChildAComponent,
    ChildBComponent,
    SoloComponent,
    HighlightDirective
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
