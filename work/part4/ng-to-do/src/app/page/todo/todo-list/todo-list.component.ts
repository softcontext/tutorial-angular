import {
  Component, OnInit,
  Input, Output, EventEmitter,
  OnChanges, SimpleChanges, ChangeDetectionStrategy
} from '@angular/core';
import { Todo } from 'src/app/page/todo/model/todo';

// ChangeDetectionStrategy.OnPush 설정을 하게되면
// 최초에 한 번만 부모가 이 컴포넌트에게 데이터를 전달한다.
// 예를 들어서, TodoInputComponent 컴포넌트가 부모에게 새 데이터를 emit()로 전달해서
// 부모의 상태가 변경되어도 이를 TodoListComponent 컴포넌트는 더 이상 받지 못한다.
// ChangeDetectionStrategy.Default가 기본값이다.
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
  changeDetection: ChangeDetectionStrategy.Default
})
export class TodoListComponent implements OnInit, OnChanges {
  // 부모에게 받은 값은 shallow copy된 값이다.
  // 이를 직접 수정하면 바로 부모가 참조하는 객체의 상태가 변경되었음을 의미한다.
  @Input('todos') todos: Todo[];

  // 삭제요청 이벤트 전송자
  @Output('remove') removeEvent: EventEmitter<string> = new EventEmitter();

  // 수정요청 이벤트 전송자
  @Output('update') updateEvent: EventEmitter<Todo> = new EventEmitter();

  // null 값을 갖고 있으면 출력모드이고
  // null이 아닌 값을 갖고 있으면 수정모드이다.
  editTodoBackup: Todo = null;

  constructor() {
    console.log('TodoListComponent()');
  }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let change = changes[propName];
      let currentValue = JSON.stringify(change.currentValue);
      let previousValue = JSON.stringify(change.previousValue);
      console.log(`${propName}: currentValue = ${currentValue}`);
      console.log(`${propName}: previousValue = ${previousValue}`);
    }

    // 1. Pass by Reference: 부모 ==값의 참조==> 자식
    // 자식이 데이터를 변경하는 것은 부모가 가진 변수의 참조가
    // 자식과 같기 때문에 부모가 사용하는 데이터가 즉시 변경됨을 의미한다.
    // 따라서, 굳이 emit() 함수를 사용해서 부모에게 데이터를 전달하지 않아도 된다.

    // deep copy:
    // 자식 컴포넌트에서 부모가 관리하는 데이터를 직접 변경하지 않고
    // 부모 컴포넌트가 판단하여 데이터를 수정하도록 관리하고 싶을 수도 있다.
    // 이는 자식 컴포넌트는 "데이터를 화면에 표시하는 역할만 수행"하거나
    // "수정될 데이터를 받는 역할만 수행"하는 것이 데이터 처리의 흐름을
    // 파악하는데 더 좋다라는 생각에 기반한다.
    // this.todos = JSON.parse(JSON.stringify(this.todos));

    // 위에 주석을 풀면, 깊은 복사로 인해서 부모의 todos와 자식의 todos가 일치하지 않게 된다.
    // 깊은 복사를 이용하고 테스트를 수행해 보면, 부모의 todos의 상태가 변경이 되더라도
    // 자식 컴포넌트에게 다시 데이터가 전달되지 않는다.
    // 앵귤러의 Change Detection은 배열의 아이템이나 객체의 프로퍼티의 변화를 감지하지 못한다.
    // 부모 이미 자식에게 전달했고 참조가 바뀌지 않았으므로
    // Change Detection 입장에서 변경된 것은 없는 것이 된다.

    // 2. Pass by Value: 부모 ==원시 값==> 자식
    // 자식이 데이터를 변경해도 부모가 가진 데이터는 변하지 않는다.
    // 이는 마치 함수에 파라미터로 원시 값을 주면 새 변수에 복사한 다음
    // 함수 내에서 사용하는 것과 같다. 파라미터는 함수가 가진 지역변수이고
    // 이 변수의 값을 바꾸더라도 함수를 호출한 측에 값이 변경되지 않는 것과 같다.
    // 자식의 값이 변경된 후 이에 맞게 부모가 가진 값도 변경하고 싶다면
    // 명시적으로 emit() 함수를 사용해서 부모에게 전달해야 한다.

    // 부모가 자식에게 원시 값을 전달할 때 객체로 포장해서 전달하면
    // #1번 경우와 같아진다. 결국, emit() 함수를 사용하지 않아도 된다.
  }

  /**
   * 삭제요청을 부모에게 전달한다.
   * Pass by Reference 방식이라면 자식이 직접 삭제할 수도 있다.
   */
  removeTodo(id: string) {
    if (window.confirm('Are you sure to delete?')) {
      // Pass by Reference 방식이기 때문에 자식이 직접 삭제해도 됨에도 불구하고
      // 부모에게 전달함은 처리의 흐름을 파악하기 쉽도록 만들기 위함이다.
      this.removeEvent.emit(id);
    }
  }

  /**
   * 출력모드를 수정모드로 변경한다.
   */
  updateMode(id: string) {
    // 이미 다른 로우를 더블 클릭해서 해당 로우가 이미 수정모드 상태일 수 있다.
    // 이 경우, 해당 로우의 수정작업을 취소한다고 보고
    // 취소 작업을 프로그램적으로 수행한다.
    // 즉, 한 번에 하나의 로우만 수정할 수 있다.
    if (this.editTodoBackup) {
      this.updateCancel();
    }

    // 수정요청을 받은 해당 로우의 데이터를 가진 객체를
    // deep copy해서 백업 변수에 저장한다.
    // editTodoBackup 변수는 수정완료가 아니라 수정취소를 요청할 때,
    // 원래 데이터로 복원하기 위해서 원본 데이터를 취급하는 변수이면서
    // 출력모드/수정모드를 구분하는 역할도 같이 담당한다.
    this.editTodoBackup = JSON.parse(JSON.stringify(
      this.todos.find(item => item.id === id)));
  }

  /**
   * 수정요청을 부모에게 전달한다.
   * 그런 다음, 수정모드를 출력모드로 변경하기 위해서 clear() 함수를 호출한다.
   *
   * Two-way 바인딩을 설정했다면 사용자가 수정하는 즉시 자식 컴포넌트 상태에 반영돤다.
   * 더불어서, Pass by Reference 방식으로 부모-자식 사이에 같은 데이터를 참조하고 있다면
   * 굳이 자식이 부모에게 수정요청을 부모에게 전달할 필요가 없다.
   */
  updateTodo(todo: Todo) {
    // Pass by Reference 방식이기 때문에 자식이 직접 수정해도 됨에도 불구하고
    // (양 방향 바인딩 설정으로 이미 수정되었음)
    // 부모에게 전달함은 처리의 흐름을 파악하기 쉽도록 만들기 위함이다.
    this.updateEvent.emit(todo);
    // 수정작업이 완료된 후, 수정모드를 출력모드로 변경하기 위해서 clear() 함수를 호출한다.
    this.clear()
  }

  /**
   * 수정작업을 취소한다.
   */
  updateCancel() {
    // 수정모드여서 수정대상 객체의 백업 객체가 존재한다면
    if (this.editTodoBackup) {
      // 수정모드 이전에 출력모드에서 화면에 표시했던 데이터로 복원(Rollback)한다.
      let index = this.todos.findIndex(item => item.id === this.editTodoBackup.id);
      this.todos.splice(index, 1, this.editTodoBackup);
      // 수정모드를 출력모드로 변경하기 위해서 clear() 함수를 호출한다.
      this.clear()
    }
  }

  /**
   * 수정모드를 출력모드로 변경한다.
   */
  clear() {
    this.editTodoBackup = null;
  }

}
