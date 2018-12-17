import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { HeaderComponent } from './layout/header/header.component';
import { HomeComponent } from './fragment/home/home.component';
import { Example1Component } from './fragment/binding/example1/example1.component';

// import { ToolbarModule } from 'primeng/toolbar';
// import { SplitButtonModule } from 'primeng/splitbutton';

// import { TabViewModule } from 'primeng/tabview';
// import { CodeHighlighterModule } from 'primeng/codehighlighter';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    Example1Component
  ],
  imports: [
    BrowserModule, AppRoutingModule,
    FormsModule, BrowserAnimationsModule,
    MenubarModule, ButtonModule, InputTextModule,
    // ToolbarModule, SplitButtonModule,
    // TabViewModule, CodeHighlighterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
