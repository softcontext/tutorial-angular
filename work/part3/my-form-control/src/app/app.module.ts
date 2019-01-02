import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './layout/header/header.component';
import { HomeComponent } from './public/home/home.component';
import { NotFoundComponent } from './public/not-found/not-found.component';

import { ContactComponent } from './step2/contact/contact.component';

import { SignupComponent } from './step1/signup/signup.component';
import { SignupComponent as SignupComponent2 } from './step1/signup2/signup.component';
import { SignupComponent as SignupComponent3 } from './step1/signup3/signup.component';
import { SignupComponent as SignupComponent4 } from './step1/signup4/signup.component';
import { PasswordRuleDirective } from './step1/validator/password-rule.directive';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    HeaderComponent,
    HomeComponent,
    NotFoundComponent,
    SignupComponent, SignupComponent2, SignupComponent3,
    PasswordRuleDirective, SignupComponent4,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
