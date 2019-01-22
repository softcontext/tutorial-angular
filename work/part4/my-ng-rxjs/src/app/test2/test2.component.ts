import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-test2',
  template: `
    <h3>count: {{count}}</h3>
  `,
  styleUrls: ['./test2.component.scss']
})
export class Test2Component implements OnInit, OnDestroy {
  count: number = 0;
  subscription: Subscription = null;

  constructor() { }

  ngOnInit() {
    // 컴포넌트가 파괴된 후에도 옵저버블은 살아서 계속 콘솔에 출력을 한다.
    this.subscription = interval(1000).pipe(tap(idx => console.log(idx))).subscribe(idx => {
      this.count = idx;
    })
  }

  ngOnDestroy() {
    // 명시적으로 컴포넌트가 파괴되기 전에 구독해제를 할 필요가 있다.
    // 다음 코드를 주석으로 처리할 때의 변화를 살펴보자.
    this.subscription.unsubscribe();
  }

}
