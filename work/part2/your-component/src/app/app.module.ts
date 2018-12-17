import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent, FooterComponent, LayoutComponent } from './layout';

import { HomeComponent } from './root/home/home.component';

import { InterpolationComponent } from './binding/interpolation/interpolation.component';
import { PropertyComponent } from './binding/property/property.component';
import { EventComponent } from './binding/event/event.component';
import { TwowayComponent } from './binding/twoway/twoway.component';

import { NgClassComponent } from './directive/built-in/ng-class/ng-class.component';
import { NgIfComponent } from './directive/built-in/ng-if/ng-if.component';
import { NgForComponent } from './directive/built-in/ng-for/ng-for.component';
import { NgSwitchComponent } from './directive/built-in/ng-switch/ng-switch.component';
import { RefComponent } from './directive/built-in/ref/ref.component';

import { HighlightComponent } from './directive/custom/highlight/highlight.component';
import { HighlightDirective } from './directive/highlight.directive';

import { DataHolderComponent } from './service/data-holder/data-holder.component';
import { BuiltInComponent } from './pipe/built-in/built-in.component';
import { StrDatePipe } from './pipe/str-date.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent, FooterComponent, LayoutComponent,
    HomeComponent,
    InterpolationComponent, PropertyComponent, EventComponent, TwowayComponent,
    NgClassComponent, NgIfComponent, NgForComponent, NgSwitchComponent, RefComponent,
    HighlightComponent, HighlightDirective,
    DataHolderComponent, BuiltInComponent, StrDatePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
