import { NgModule } from '@angular/core';
import { FooLibComponent } from './foo-lib.component';
import { BarComponent } from './bar/bar.component';
import { AnotherLibModule } from 'another-lib';

@NgModule({
  declarations: [FooLibComponent, BarComponent],
  imports: [
    AnotherLibModule
  ],
  exports: [FooLibComponent, BarComponent]
})
export class FooLibModule { }
