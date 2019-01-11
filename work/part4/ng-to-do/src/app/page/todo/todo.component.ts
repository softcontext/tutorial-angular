import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/page/todo/model/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];

  ngOnInit() {
    this.todos.push(new Todo('Walk the dog this evening'));
    this.todos.push(new Todo('Go shopping at 3 PM'));
    this.todos.push(new Todo('Sleep well tonight'));
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);

    // todos는 참조를 취급하는 변수로써
    // 새 배열을 참조하도록 만들면 항상 이를 자식에게 이를 전달한다.
    // 그러므로 자식이 deep copy 방식을 사용하더라도
    // 부모로부터 새 데이터를 받을 수 있게 된다.
    // this.todos = [...this.todos];

    // XXX
    // this.flag = !this.flag;
  }

  removeTodo(id: string) {
    let index = this.todos.findIndex(item => item.id === id);
    this.todos.splice(index, 1);

    // XXX
    // this.flag = !this.flag;
  }

  updateTodo(todo: Todo) {
    let index = this.todos.findIndex(item => item.id === todo.id);
    this.todos.splice(index, 1, todo);

    // XXX
    // this.flag = !this.flag;
  }

  // XXX
  // flag: boolean = false;
}
