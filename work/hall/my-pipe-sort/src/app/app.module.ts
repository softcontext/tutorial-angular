import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CompanyComponent } from './page/company/company.component';
import { SortPipe } from './pipe/sort.pipe';

import { ShareModule } from './share/share.module';
import { MemoComponent } from './page/memo/memo.component';

@NgModule({
  declarations: [
    AppComponent,
    CompanyComponent,
    SortPipe,
    MemoComponent
  ],
  imports: [
    BrowserModule,
    ShareModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
