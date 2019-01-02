import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './public/home/home.component';
import { NotFoundComponent } from './public/not-found/not-found.component';

import { SignupComponent } from './step1/signup/signup.component';
import { SignupComponent as SignupComponent2 } from './step1/signup2/signup.component';
import { SignupComponent as SignupComponent3 } from './step1/signup3/signup.component';
import { SignupComponent as SignupComponent4 } from './step1/signup4/signup.component';

import { ContactComponent } from './step2/contact/contact.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signup2', component: SignupComponent2 },
  { path: 'signup3', component: SignupComponent3 },
  { path: 'signup4', component: SignupComponent4 },
  { path: 'contact', component: ContactComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
