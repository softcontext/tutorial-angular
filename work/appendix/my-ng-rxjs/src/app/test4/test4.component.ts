import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

// FormControl만 사용할 때는 name 속성은 없어도 된다.
// FormGroup으로 FormControl을 감싸는 경우에는 필요하다.
@Component({
  selector: 'app-test4',
  template: `
  <p>text: {{text$ | async}}</p>
  <input type="text" name="text" [formControl]="text">
  `,
  styleUrls: ['./test4.component.scss']
})
export class Test4Component {
  text: FormControl = new FormControl();
  // valueChanges 속성이 옵저버블을 반환한다.
  text$ = this.text.valueChanges;
}
