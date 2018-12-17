import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatepickerComponent } from './datepicker/datepicker.component';

// import { MatFormFieldModule, MatInputModule, MatNativeDateModule, MatDatepickerModule } from '@angular/material';
import { CustomMaterialModule } from "./custom-material/custom-material.module";

@NgModule({
  declarations: [
    AppComponent,
    DatepickerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // MatFormFieldModule, MatInputModule, MatNativeDateModule, MatDatepickerModule
    CustomMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
