import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/page/todo/model/todo';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.scss']
})
export class TodoInputComponent implements OnInit {
  newTodo: Todo = new Todo();
  @Output('add') addEvent: EventEmitter<Todo> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log(this.newTodo)
  }

  addTodo() {
    let task = this.newTodo.task.trim();
    if (!task) {
      alert('Enter new task!');
      return false;
    }
    // 생성날짜를 최신으로 기록하기 위해서 객체를 새로 만들어서 사용한다.
    this.addEvent.emit(new Todo(task));
    // 입력창 초기화를 위해서 새 객체를 할당한다.
    this.newTodo = new Todo();
  }
}
