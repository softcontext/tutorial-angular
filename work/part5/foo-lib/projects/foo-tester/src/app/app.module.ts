import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FooLibModule } from 'foo-lib';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FooLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
