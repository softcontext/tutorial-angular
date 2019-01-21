import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of, combineLatest } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-test5',
  template: `
    <p>name: {{name$ | async}}</p>
    <input type="text" name="name" [formControl]="name">
    <div class="box">
      <ul>
        <li *ngFor="let user of users$ | async">
          {{user | uppercase}}
        </li>
      </ul>
    </div>
    <div class="box">
      <ul>
        <li *ngFor="let user of filteredUsers$ | async">
          {{user | titlecase}}
        </li>
      </ul>
    </div>
  `,
  styles: [
    `
    .box {
      margin-top: 1rem;
      border: 1px solid silver;
      padding: 1rem;
    }
    `
  ]
})
export class Test5Component {
  name: FormControl = new FormControl();
  name$: Observable<string> = this.name.valueChanges.pipe(debounceTime(500))
  users$: Observable<string[]> = of(['aaron', 'bob', 'charles', 'david', 'erick']);
  // combineLatest 함수는 옵저버블 생성함수로써
  // this.name$ 값이 바뀔 때마다 콜백함수가 반환하는 결과를 발행한다.
  filteredUsers$: Observable<string[]> = combineLatest(this.users$, this.name$, (users, name) => {
    let loweredName = name.toLowerCase();
    return users.filter(item => item.toLowerCase().includes(loweredName));
  })
}
