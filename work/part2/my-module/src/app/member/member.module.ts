import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareModule } from '../share/share.module';
import { MemberComponent } from './member.component';
import { MemberConfig } from './member-config';

@NgModule({
  declarations: [MemberComponent],
  imports: [
    CommonModule,
    ShareModule
  ],
  exports: [ShareModule]
})
export class MemberModule {
  constructor() {
    console.log('MemberModule()');
  }

  static forRoot(config: MemberConfig): ModuleWithProviders {
    let moduleWithProviders: ModuleWithProviders = {
      ngModule: MemberModule,
      providers: [
        { provide: MemberConfig, useValue: config }
      ]
    }
    return moduleWithProviders;
  }
}
