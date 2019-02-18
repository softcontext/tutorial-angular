import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SigninComponent } from './pages/signin/signin.component';

export function tokenGetter() {
  return localStorage.getItem('jwt_token');
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    // "@auth0/angular-jwt" can only be used with Angular 4.3 and higher
    // because it relies on an HttpInterceptor from Angular's HttpClient.
    HttpClientModule,

    // Any requests sent using Angular's HttpClient
    // will automatically have a token attached as an Authorization header.
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:3000'],
        // In this array, you can add routes that are not allowed to receive the JWT token.
        // because it doesn't need to receive any access token.
        blacklistedRoutes: ['localhost:3000/auth/signin'],
        // headerName: 'Authorization', // 디폴트 값
        // authScheme: 'Bearer ', // 디폴트 값
        authScheme: '', // 디폴트 값 대신 이렇게 사용한다. 연동기술에 따라 바뀐다.
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
