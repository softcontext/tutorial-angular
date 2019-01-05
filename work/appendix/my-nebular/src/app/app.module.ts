import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';

import { NbSidebarModule, NbSidebarService } from '@nebular/theme';

import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { NbMenuModule, NbCardModule, NbMenuService, NbButtonModule } from '@nebular/theme';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    BrowserAnimationsModule,
    // NbThemeModule.forRoot({ name: 'default' }),
    // NbThemeModule.forRoot({ name: 'cosmic' }),
    NbThemeModule.forRoot({ name: 'corporate' }),
    NbLayoutModule,

    NbSidebarModule,

    NbMenuModule.forRoot(),
    NbCardModule,
    NbButtonModule
  ],
  providers: [NbSidebarService, NbMenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }

// this will enable the default theme,
// you can change this by passing `{ name: 'cosmic' }` to enable the dark theme
// NbThemeModule.forRoot(),
