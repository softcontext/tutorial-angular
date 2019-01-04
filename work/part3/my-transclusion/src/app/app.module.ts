import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { HomeComponent } from './layout/home/home.component';

import { IconInputComponent } from './step1/icon-input/icon-input.component';

import { ExampleComponent } from './step2/example/example.component';
import { InputGroupComponent, InputRefDirective } from './step2/input-group/input-group.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    IconInputComponent,
    ExampleComponent,
    InputGroupComponent, InputRefDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
