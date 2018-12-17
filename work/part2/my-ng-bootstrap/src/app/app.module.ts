import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatepickerComponent } from './example/datepicker/datepicker.component';

@NgModule({
  declarations: [
    AppComponent,
    DatepickerComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule,
    FormsModule, ReactiveFormsModule, NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
