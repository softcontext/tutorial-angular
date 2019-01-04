import { Component, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';

@Component({
  selector: 'app-icon-input',
  templateUrl: './icon-input.component.html',
  styleUrls: ['./icon-input.component.scss']
})
export class IconInputComponent implements OnInit {
  @Input() icon: string;
  @Output('value') eventEmitter = new EventEmitter<string>();
  isFocus = false;
  cssClasses = {
    fa: true
  };

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

  // <app-icon-input [class.focus]="this.isFocus">
  // 컴포넌트 템플릿에서 이벤트가 발생할 때마다 기동한다.
  // 수행결과는 호스트 엘리먼트에 focus 클래스를 추가/제거 하는 것이다.
  @HostBinding('class.focus')
  get fnNameHasNoRole() {
    console.log(this.isFocus);
    return this.isFocus;
  }

}
