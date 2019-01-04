import { Component, OnInit, Input, Output, EventEmitter, HostBinding, ContentChild } from '@angular/core';
import { Directive, HostListener } from '@angular/core';

// InputGroupComponent 컴포넌트 사용자가 input 엘리먼트를 Projection 할 때
// input 엘리먼트에 inputRef 디렉티브를 설정해야 한다.
// <app-input-group icon="envelope">
//   <input type="email" placeholder="Email" inputRef>
// </app-input-group>
@Directive({
  selector: '[inputRef]'
})
export class InputRefDirective {
  focus = false;

  @HostListener("focus")
  onFocus() {
    this.focus = true;
  }

  @HostListener("blur")
  onBlur() {
    this.focus = false;
  }
}

@Component({
  selector: 'app-input-group',
  templateUrl: './input-group.component.html',
  styleUrls: ['./input-group.component.scss']
})
export class InputGroupComponent implements OnInit {
  @Input() icon: string;
  @Output('value') eventEmitter = new EventEmitter<string>();
  isFocus = false;
  cssClasses = {
    fa: true
  };

  // 투영(Projection)된 자식 중 디렉티브를
  // InputRefDirective 클래스 자료형으로 찾아서 DI 한다.
  @ContentChild(InputRefDirective) input: InputRefDirective;

  constructor() { }

  ngOnInit() {
    if (!this.icon) {
      this.icon = 'check';
    }
    this.cssClasses['fa-' + this.icon] = true;
  }

  get classes() {
    return this.cssClasses;
  }

  // <ng-content></ng-content> 안에 존재하는 엘리먼트가 발생시킨
  // 이벤트를 청취하지 못해서 기동하지 못 한다.
  // @HostBinding('class.focus')
  // get fnNameHasNoRole() {
  //   console.log(this.isFocus);
  //   return this.isFocus;
  // }

  // @ContentChild로 획득한 디렉티브의 변수 focus의 상태에 따라서
  // 호스트 엘리먼트에 focus 클래스를 추가/제거 한다.
  @HostBinding('class.focus')
  get fnNameHasNoRole() {
    console.log(this.input ? this.input.focus : false);
    return this.input ? this.input.focus : false;
  }

}
