import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './title/title.component';

import { Routes } from '@angular/router';
import { RoutingMapping } from './title/title.component';

@NgModule({
  declarations: [TitleComponent],
  imports: [
    CommonModule
  ],
  exports: [TitleComponent]
})
export class CoreModule {

  static forRoot(routes: Routes): ModuleWithProviders {
    let moduleWithProviders: ModuleWithProviders = {
      ngModule: CoreModule,
      providers: [
        { provide: RoutingMapping, useValue: routes }
      ]
    }
    console.log(moduleWithProviders);
    return moduleWithProviders;
  }

}
