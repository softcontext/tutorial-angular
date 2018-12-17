import { NgModule } from '@angular/core';

import {
  MatFormFieldModule, MatInputModule,
  MatNativeDateModule, MatDatepickerModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    MatFormFieldModule, MatInputModule,
    MatNativeDateModule, MatDatepickerModule
  ],
  exports: [
    MatFormFieldModule, MatInputModule,
    MatNativeDateModule, MatDatepickerModule
  ]
})
export class CustomMaterialModule { }
