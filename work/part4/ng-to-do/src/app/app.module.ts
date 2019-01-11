import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { TodoComponent } from './page/todo/todo.component';
import { TodoHeaderComponent } from './page/todo/todo-header/todo-header.component';
import { TodoInputComponent } from './page/todo/todo-input/todo-input.component';
import { TodoListComponent } from './page/todo/todo-list/todo-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoHeaderComponent,
    TodoInputComponent,
    TodoListComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
