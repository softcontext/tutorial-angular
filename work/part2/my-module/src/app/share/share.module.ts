import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataShareService } from './data-share.service';
import { HighlightDirective } from './directive/highlight.directive';
import { ReversePipe } from './pipe/reverse.pipe';

@NgModule({
  declarations: [HighlightDirective, ReversePipe],
  imports: [
    CommonModule
  ],
  providers: [DataShareService],
  exports: [HighlightDirective, ReversePipe]
})
export class ShareModule {
  constructor() {
    console.log('ShareModule()');
  }
}
