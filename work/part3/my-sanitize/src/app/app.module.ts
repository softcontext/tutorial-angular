import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavComponent } from './layout/nav/nav.component';
import { HomeComponent } from './page/home/home.component';
import { Sanitize1Component } from './page/sanitize1/sanitize1.component';
import { Sanitize2Component } from './page/sanitize2/sanitize2.component';
import { SanitizeHtmlPipe } from './pipe/sanitize-html.pipe';
import { SanitizeResourceUrlPipe } from './pipe/sanitize-resource-url.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    Sanitize1Component,
    Sanitize2Component,
    SanitizeHtmlPipe,
    SanitizeResourceUrlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
