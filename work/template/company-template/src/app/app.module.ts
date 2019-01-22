import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './layout/navbar/navbar.component';
import { HeaderComponent } from './layout/header/header.component';
import { AboutComponent } from './layout/about/about.component';
import { PortfolioComponent } from './layout/portfolio/portfolio.component';
import { PostComponent } from './layout/post/post.component';
import { TeamComponent } from './layout/team/team.component';
import { ContactComponent } from './layout/contact/contact.component';
import { FooterComponent } from './layout/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    AboutComponent,
    PortfolioComponent,
    PostComponent,
    TeamComponent,
    ContactComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
