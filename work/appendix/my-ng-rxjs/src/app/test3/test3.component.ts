import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-test3',
  template: `
    <h3>count: {{count$ | async}}</h3>
  `,
  styleUrls: ['./test3.component.scss']
})
export class Test3Component implements OnInit, OnDestroy {
  count$ = interval(1000).pipe(tap(idx => console.log(idx)))

  constructor() { }

  ngOnInit() {
    // async 파이프를 사용하면 옵저버블 객체를 그대로 템플릿에서 사용할 수 있다.
  }

  ngOnDestroy() {
    // async 파이프를 사용하면 컴포넌트 파괴 시 자동으로 구독해제가 처리된다.
  }
}
