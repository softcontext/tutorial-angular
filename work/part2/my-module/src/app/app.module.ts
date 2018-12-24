import { BrowserModule } from '@angular/platform-browser';
// import { CommonModule } from '@angular/common'; // BrowserModule을 임포트하면 생략가능
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { MemberModule } from './member/member.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    // MemberModule,
    // MemberModule.forRoot({ color: 'red' }),
    MemberModule.forRoot({ color: 'blue' }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    console.log('AppModule()');
  }
}
