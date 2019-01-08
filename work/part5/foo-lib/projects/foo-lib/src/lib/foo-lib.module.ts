import { NgModule } from '@angular/core';
import { FooLibComponent } from './foo-lib.component';
import { BarComponent } from './bar/bar.component';

@NgModule({
  declarations: [FooLibComponent, BarComponent],
  imports: [
  ],
  exports: [FooLibComponent, BarComponent]
})
export class FooLibModule { }
