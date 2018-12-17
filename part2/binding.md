# Binding

## Interpolation

**interpolation.component.ts**

```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interpolation',
  template: `
  <div class="container">
    1 + 2 = {{1 + 2}}
    <br>
    {{say() + " Angular!"}}
    <br>
    {{say()==="Hi" ? "Good" : "Bye"}}
    <br>
    [ {{basket.items[0]}}, {{basket.items[1]}}, {{basket.items[2]}} ]
    <br>
    message : {{message}}
    <br>
    <form class="form-inline mt-2 mb-2">
      <div class="form-row">
        <input type="email" id="email" class="form-control mr-1" value="{{className}}">
        {{' '}}
        <button type="button" class="btn {{className}}">{{className}}</button>
      </div>
    </form>
    <span *ngFor="let n of numbers">{{n + ' '}}</span>
    <form class="form mt-2 mb-2">
      <div class="form-group">
        <label for="comment">Comment:</label>
        <textarea id="comment" class="form-control" rows="4"
          cols="40" value="{{className}}"></textarea>
      </div>
    </form>
  </div>
  `,
  styles: [
    `
    .container {
      margin-top: 2rem;
    }
    `
  ]
})
export class InterpolationComponent implements OnInit {
  className = "btn-primary";
  basket = {
    items: []
  };
  numbers;
  message;

  constructor() {
    this.basket.items.push('Apple');
    this.basket.items.push('Orange');
    this.basket.items.push('Banana');
    this.numbers = Array(10).fill(0).map((item, i) => i + 1);
  }

  ngOnInit() {
    let x = 'Hello';
    let y = 'World';
    this.message = `${x} ${y}!`;
  }

  say() {
    return "Hi";
  }

}
```

원한다면 하나의 파일안에 클래스, HTML, CSS 설정을 모두 정의할 수 있습니다.

## Property Binding

**property.component.ts**

```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {
  greeting: string = "Hello";
  message: string = "<em>World</em>!!!";

  constructor() { }

  ngOnInit() { }
}
```

**property.component.html**

```html
<div class="container">
  <h2 class="mb-4">{{greeting}}</h2>
  <div class="form-row mb-4">
    <div class="col">
      <label class="mb-0" for="id1">문자열로 취급</label>
      <input class="form-control" type="text" id="id1" value="greeting">
    </div>
    <div class="col">
      <label class="mb-0" for="id2">Interpolation</label>
      <input class="form-control" type="text" id="id2" value="{{greeting}}">
    </div>
    <div class="col">
      <label class="mb-0" for="id3">Interpolation : 문자열로 취급</label>
      <input class="form-control" type="text" id="id3" value="{{'greeting'}}">
    </div>
  </div>
  <div class="form-row mb-4">
    <div class="col">
      <label class="mb-0" for="id4">Property Binding 1</label>
      <input class="form-control" type="text" id="id4" [value]="greeting">
    </div>
    <div class="col">
      <label class="mb-0" for="id5">Property Binding 2</label>
      <input class="form-control" type="text" id="id5" bind-value="greeting">
    </div>
    <div class="col">
      <label class="mb-0" for="id6">Property Binding 3</label>
      <input class="form-control" type="text" id="id6" [attr.value]="greeting">
    </div>
  </div>
  <div class="form-row mb-4">
    <div class="col">
      <label class="mb-0">Interpolation : 태그가 그대로</label>
      <p>{{message}}</p>
    </div>
    <div class="col">
      <label class="mb-0">Property Binding Inner 1 : 태그가 그대로</label>
      <p [innerText]="message"></p>
    </div>
    <div class="col">
      <label class="mb-0">Property Binding Inner 2 : 태그가 처리 됨</label>
      <p [innerHTML]="message"></p>
    </div>
  </div>
</div>
```

## Event Binding

**event.component.ts**

```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  isShow: boolean = true;

  constructor() { }

  ngOnInit() { }

  signin(email, password) {
    alert(email + ', ' + password);
  }
}
```

**event.component.html**

```html
<div class="container">
  <div class="form-group row">
    <div class="ml-auto col-sm-4">
      <button type="button" class="btn btn-warning btn-block" (click)="isShow=!isShow">
        {{isShow ? 'Hide' : 'Show'}}
      </button>
    </div>
  </div>

  <form *ngIf="isShow">
    <div class="form-group row">
      <label for="id1" class="col-sm-2 col-form-label">Email</label>
      <div class="col-sm-10">
        <input type="email" class="form-control" id="id1" placeholder="Email" #email>
      </div>
    </div>
    <div class="form-group row">
      <label for="id2" class="col-sm-2 col-form-label">Password</label>
      <div class="col-sm-10">
        <input type="password" class="form-control" id="id2" placeholder="Password" #password>
      </div>
    </div>
    <div class="form-group row">
      <div class="ml-auto col-sm-4">
        <button type="submit" class="btn btn-primary btn-block"
          (click)="signin(email.value, password.value)">Sign in</button>
      </div>
    </div>
  </form>
</div>
```

## Two-way Binding

**twoway.component.ts**

```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-twoway',
  templateUrl: './twoway.component.html',
  styleUrls: ['./twoway.component.scss']
})
export class TwowayComponent implements OnInit {
  citySelected: string = "seoul";

  cities: Object[] = [
    { kor: "서울", eng: "seoul" },
    { kor: "대전", eng: "daejeon" },
    { kor: "대구", eng: "daegu" },
    { kor: "부산", eng: "pusan" }
  ];

  address: Array<Object> = [
    { kor: "서울", eng: "seoul", checked: false },
    { kor: "대전", eng: "daejeon", checked: false },
    { kor: "대구", eng: "daegu", checked: false },
    { kor: "부산", eng: "pusan", checked: true }
  ];

  constructor() { }

  ngOnInit() { }

  /**
   * 체크박스 클릭 시 배열안에 객체안에 존재하는 checked 값의 변경을
   * (click)="addr.checked=!addr.checked" 설정으로 적용했을 때
   * 화면에서 사용하는 자원은 참조 값이고 그 참조 값은 변하지 않았으므로
   * 앵귤러의 변경감지에서 변경된 대상으로 인식되지 못한다.
   *
   * 하지만, 위 설정 대신 (click)="checkedFilter(addr)" 처럼
   * 클래스 내 함수를 호출하는 방식으로 사용하면
   * 앵귤러의 변경감지에서 변경된 대상으로 인식된다.
   */
  checkedFilter(addr) {
    addr.checked = !addr.checked;
  }

}
```

**twoway.component.html**

```html
<div class="container">
  <div class="form-row mb-4">
    <div class="col-sm-1"></div>
    <div class="col-sm-4">
      <label class="mb-1">Oneway + Oneway</label>
      <select class="form-control" (change)="citySelected=$event.target.value">
        <option *ngFor="let city of cities" [value]="city.eng"
          [selected]="citySelected==city.eng?true:null">
          {{city.kor}}
        </option>
      </select>
    </div>
    <div class="ml-auto col-sm-4">
      <label class="mb-1">Twoway</label>
      <select class="form-control" [(ngModel)]="citySelected">
        <option *ngFor="let city of cities" [value]="city.eng">{{city.kor}}</option>
      </select>
    </div>
    <div class="col-sm-1"></div>
  </div>

  <div class="form-row mb-4">
    <div class="col-sm-1"></div>
    <div class="col-sm-4">
      <label class="mb-1">Oneway + Oneway</label>
      <input class="form-control" [value]="citySelected" (input)="citySelected=$event.target.value">
    </div>
    <div class="ml-auto col-sm-4">
      <label class="mb-1">Twoway</label>
      <input class="form-control" [(ngModel)]="citySelected">
    </div>
    <div class="col-sm-1"></div>
  </div>

  <div class="form-row mb-4">
    <div class="col-sm-1"></div>
    <div class="col-sm-4">
      <p class="mb-1">Oneway + Oneway</p>
      <div class="form-check form-check-inline" *ngFor="let city of cities">
        <input class="form-check-input" type="radio" [checked]="(city.eng==citySelected?true:null)"
          (click)="citySelected=$event.target.value" [value]="city.eng" name="city1">
        <label class="form-check-label">{{city.kor}}</label>
      </div>
    </div>
    <div class="ml-auto col-sm-4">
      <p class="mb-1">Twoway</p>
      <div class="form-check form-check-inline" *ngFor="let city of cities;let i=index">
        <input class="form-check-input" type="radio" [(ngModel)]="citySelected"
          [value]="city.eng" name="city2" [id]="'city'+i">
        <label class="form-check-label" [for]="'city'+i">{{city.kor}}</label>
      </div>
    </div>
    <div class="col-sm-1"></div>
  </div>

  <div class="form-row mb-4">
    <div class="col-sm-1"></div>
    <div class="col-sm-4">
      <p class="mb-1">Oneway + Oneway</p>
      <div class="form-check form-check-inline" *ngFor="let addr of address">
        <input class="form-check-input" type="checkbox"
          [checked]="addr.checked"
          (click)="checkedFilter(addr)" name="address1">
        <label class="form-check-label">{{addr.kor}}</label>
      </div>
    </div>
    <div class="ml-auto col-sm-4">
      <p class="mb-1">Twoway</p>
      <div class="form-check form-check-inline" *ngFor="let addr of address; let i=index">
        <input class="form-check-input" type="checkbox"
          [(ngModel)]="addr.checked" name="address2" id="{{'addr'+i}}">
        <label class="form-check-label" for="{{'addr'+i}}">{{addr.kor}}</label>
      </div>
    </div>
    <div class="col-sm-1"></div>
  </div>

  <div class="form-row mb-2">
    <div class="col-sm-1"></div>
    <div class="col-sm-10">
      <pre class="bg-light border border-secondary rounded">{{citySelected | json}}</pre>
    </div>
    <div class="col-sm-1"></div>
  </div>

  <div class="form-row mb-2">
    <div class="col-sm-1"></div>
    <div class="col-sm-10">
      <pre class="bg-light border border-secondary rounded">{{cities | json}}</pre>
    </div>
    <div class="col-sm-1"></div>
  </div>

  <div class="form-row mb-2">
    <div class="col-sm-1"></div>
    <div class="col-sm-10">
      <pre class="bg-light border border-secondary rounded">{{address | json}}</pre>
    </div>
    <div class="col-sm-1"></div>
  </div>
</div>
```
