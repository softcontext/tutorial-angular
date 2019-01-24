import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavComponent } from './layout/nav/nav.component';
import { HomeComponent } from './page/home/home.component';
import { Animation1Component } from './page/animation1/animation1.component';
import { Animation2Component } from './page/animation2/animation2.component';
import { Animation3Component } from './page/animation3/animation3.component';
import { Animation4Component } from './page/animation4/animation4.component';
import { Animation5Component } from './page/animation5/animation5.component';
import { SlidePanelComponent } from './page/animation5/slide-panel/slide-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    Animation1Component,
    Animation2Component,
    Animation3Component,
    Animation4Component,
    Animation5Component,
    SlidePanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
