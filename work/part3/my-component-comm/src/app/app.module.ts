import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './one/home/home.component';
import { AboutComponent } from './one/about/about.component';
import { ParentComponent } from './two/parent/parent.component';
import { ChildComponent } from './two/child/child.component';
import { PanelComponent } from './three/panel/panel.component';
import { DisplayComponent } from './three/display/display.component';
import { ControlComponent } from './three/control/control.component';

import { StrDatePipe } from './two/str-date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ParentComponent,
    ChildComponent,
    PanelComponent,
    DisplayComponent,
    ControlComponent,
    StrDatePipe
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
