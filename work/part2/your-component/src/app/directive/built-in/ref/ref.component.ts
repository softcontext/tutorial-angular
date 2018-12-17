import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ref',
  templateUrl: './ref.component.html',
  styleUrls: ['./ref.component.scss']
})
export class RefComponent implements OnInit {
  init = { num1: 0, num2: 0 };
  data;

  constructor() {
    this.data = { result: 0 };

    Object.defineProperty(this.data, '_num1', {
      writable: true,
      value: 0,
      enumerable: false,
      configurable: false
    });
    Object.defineProperty(this.data, '_num2', {
      writable: true,
      value: 0,
      enumerable: false,
      configurable: false
    });

    // 이 방법은 되는데

    Object.defineProperty(this.data, 'num1', {
      get: () => {
        return this.data._num1;
      },
      set: (num) => {
        this.data._num1 = num;
        this.data.result = this.data._num1 + this.data._num2;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(this.data, 'num2', {
      get: () => {
        return this.data._num2;
      },
      set: (num) => {
        this.data._num2 = num;
        this.data.result = this.data._num1 + this.data._num2;
      },
      enumerable: true,
      configurable: true
    });

    // 되긴 되는데 너무 복잡하다.

    // 어떤 값이 변경될 때, 이 값을 사용하여 다른 데이터를 조작하고자 한다면
    // ngModel 양방향 바인딩으로 값의 갱신을 자동으로 하기 보다는
    // 이벤트 바인딩을 설정하고 함수를 호출하여 함수에서
    // 값을 변경하고 추가로 데이터를 조작하는 작업을 하는 것이 나아 보인다.

    // 또는, https://embed.plnkr.co/OUoD5J1lfO6bIeME9N0F/
  }

  ngOnInit() { }

  // 이 방법은 안된다!

  // get num1() {
  //   console.log(this.data._num1)
  //   return this.data._num1;
  // }
  //
  // set num1(num) {
  //   this.data._num1 = num;
  //   this.data.result = this.data._num1 + this.data._num2;
  // }
  //
  // get num2() {
  //   return this.data._num2;
  // }
  //
  // set num2(num) {
  //   this.data._num2 = num;
  //   this.data.result = this.data._num1 + this.data._num2;
  // }

}
