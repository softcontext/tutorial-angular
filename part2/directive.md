# Directive


## ngClass

**ng-class.component.ts**

```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ng-class',
  templateUrl: './ng-class.component.html',
  styleUrls: ['./ng-class.component.scss']
})
export class NgClassComponent implements OnInit {
  isActive: boolean = false;
  strClassName: string = "active";
  strClassRed: string = 'red';
  strClassBlue: string = 'blue';
  methods: Array<object> = [
    { id: 1, text: 'Walking', klass: 'active', message: 'Walking is good for your health!' },
    { id: 2, text: 'Car', klass: 'red', message: 'It is fast by Car!' },
    { id: 3, text: 'Bus', klass: 'blue', message: 'You save the earth as using Bus!' },
    { id: 4, text: 'Train', klass: 'orange', message: 'Train is always fun!' }
  ];

  constructor() { }

  ngOnInit() { }

  changeMethod() {
    let holder = this.methods.shift();
    this.methods.push(holder);
  }

}
```

**ng-class.component.scss**

```scss
.container {
  margin-top: 2rem;
}

p {
  margin-top: 2rem;
  margin-bottom: 0.5rem;
}

button {
  width: 300px;
  padding: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  text-align: center;
  border: 1px solid black;
  background-color: black;
  color: white;
}

button.active {
  background-color: white;
  color: black;
}

button.red {
  background-color: red;
  color: white;
}

button.blue {
  background-color: blue;
  color: white;
}

button.orange {
  background-color: orange;
  color: white;
}
```

**ng-class.component.html**

```html
<div class="container">
  <p>정적으로 클래스 설정</p>
  <div class="row">
    <button [ngClass]="strClassName">ngClass = 변수값</button>
    <button [ngClass]="'active'">ngClass = 문자열</button>
    <button bind-ngClass="strClassName">bind-ngClass = 변수값</button>
  </div>
  <div class="row">
    <button [attr.class]="strClassName">attr.class = 변수값</button>
    <button [attr.class]="'active'">attr.class = 문자열</button>
    <button [class.active]="true">class.active = 불린값</button>
  </div>

  <p>동적으로 클래스 제어</p>
  <div class="row">
    <button class="btn" [ngClass]="{active: isActive}" (click)="isActive=!isActive;">
      {{isActive ? 'ON' : 'OFF'}}
    </button>
    <button class="btn" [class.active]="isActive" (click)="isActive=!isActive;">
      {{isActive ? 'ON' : 'OFF'}}
    </button>
  </div>
  <div class="row">
    <button class="btn" [ngClass]="isActive ? strClassRed : strClassBlue" (click)="isActive=!isActive;">
      {{isActive ? 'ON' : 'OFF'}}
    </button>
    <button class="btn" [ngClass]="isActive ? 'red' : 'blue'" (click)="isActive=!isActive;">
      {{isActive ? 'ON' : 'OFF'}}
    </button>
  </div>

  <p>동적으로 버튼 제어</p>
  <div class="row">
    <button class="btn" [ngClass]="methods[0].klass" (click)="changeMethod()">
      {{methods[0].text}}
    </button>
  </div>
  <small>{{methods[0].message}}</small>
</div>
```

## ngIf

**ng-if.component.ts**

```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ng-if',
  templateUrl: './ng-if.component.html',
  styleUrls: ['./ng-if.component.scss']
})
export class NgIfComponent implements OnInit {
  genderSelected = 2;
  gender = [
    { code: 1, text: 'Male' },
    { code: 2, text: 'Female' },
  ];
  methods: Array<{ code, text, checked }> = [
    { code: 10, text: 'Walking', checked: false },
    { code: 11, text: 'Car', checked: false },
    { code: 12, text: 'Bus', checked: false },
    { code: 13, text: 'Train', checked: false }
  ];

  constructor() { }

  ngOnInit() { }

  get getCheckedMethods() {
    return this.methods.filter(item => item.checked).map(item => item.text).join(',');
  }

  get isMethodChecked() {
    return this.methods.findIndex(item => item.checked) >= 0;
  }

}
```

**ng-if.component.scss**

```scss
button {
  margin-right: 0.5rem;
}
```

**ng-if.component.html**

```html
<div class="container">
  <div class="row mb-3">
    <div class="col-sm-4">
      <p>Gender Selected: {{genderSelected}}</p>
    </div>
    <div class="col-sm-4 mr-auto">
      <select [(ngModel)]="genderSelected">
        <option *ngFor="let g of gender" value="{{g.code}}">{{g.text}}</option>
      </select>
    </div>
  </div>

  <div class="row">
    <div class="col-sm-4">
      <p>If ~ Else 처리방법</p>
    </div>
    <div class="col-sm-4 mr-auto">
      <p *ngIf="genderSelected == 1">Male selected</p>
      <p *ngIf="genderSelected == 2">Female selected</p>
    </div>
  </div>

  <div class="row">
    <div class="col-sm-4">
      <p>처리 후 사라지는 ng-template 사용</p>
    </div>
    <div class="col-sm-4 mr-auto">
      <p>
        <ng-template [ngIf]="genderSelected == 1">Male selected</ng-template>
        <ng-template [ngIf]="genderSelected == 2">Female selected</ng-template>
      </p>
    </div>
  </div>

  <hr>

  <div class="row">
    <div class="col-sm-4 h-100">
      <p>{{getCheckedMethods}}&nbsp;</p>
    </div>
    <div class="col-sm-8">
      <div class="form-check form-check-inline" *ngFor="let m of methods">
        <input class="form-check-input" type="checkbox" [(ngModel)]="m.checked"
          id="{{m.code}}" name="methods">
        <label class="form-check-label" for="{{m.code}}">{{m.text}}</label>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col">
      <pre>{{methods | json}}</pre>
    </div>
  </div>

  <div class="row">
    <button class="btn btn-primary" type="button" [disabled]="!isMethodChecked">Send</button>
    <button class="btn btn-primary" type="button" *ngIf="isMethodChecked">Submit</button>
  </div>
</div>
```

## ngFor

**ng-for.component.ts**

```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ng-for',
  templateUrl: './ng-for.component.html',
  styleUrls: ['./ng-for.component.scss']
})
export class NgForComponent implements OnInit {
  tallestBuildings: Object[] = [];

  constructor() { }

  ngOnInit() {
    this.tallestBuildings.push({ name: 'Burj Khalifa', height: '2717'});
    this.tallestBuildings.push({ name: 'Shanghai Tower', height: '2073'});
    this.tallestBuildings.push({ name: 'Abraj Al-Bait Clock Tower', height: '1971'});
    this.tallestBuildings.push({ name: 'Ping An Finance Centre', height: '1965'});
  }

}
```

**ng-for.component.html**

```html
<div class="container">
  <p *ngFor="let building of tallestBuildings; let i=index">
    {{i+1}}: {{building.title}}, {{building.height | number}}
  </p>
  <hr>
  <p>
    <ng-template ngFor let-building let-i="index" [ngForOf]="tallestBuildings">
      {{i+1}}: {{building.title}}, {{building.height | number}}
      <br>
    </ng-template>
  </p>
</div>
```

## ngSwitch

**ng-switch.component.ts**

```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ng-switch',
  templateUrl: './ng-switch.component.html',
  styleUrls: ['./ng-switch.component.scss']
})
export class NgSwitchComponent implements OnInit {
  group;

  constructor() { }

  ngOnInit() { }
}

```

**ng-switch.component.scss**

```scss
.row {
  margin-bottom: 1rem;
}

button {
  margin-right: 0.5rem;
}
```

**ng-switch.component.html**

```html
<div class="container">
  <div class="row">
    <h2>Group: {{group ? group : '?'}}</h2>
  </div>

  <div class="row">
    <button class="btn btn-primary" type="button" (click)="group='A'">Group A</button>
    <button class="btn btn-success" type="button" (click)="group='B'">Group B</button>
    <button class="btn btn-warning" type="button" (click)="group='C'">Group C</button>
    <button class="btn btn-danger" type="button" (click)="group='D'">Group D</button>
  </div>

  <div class="row">
    <p *ngIf="group==undefined">Select a group.</p>
    <p *ngIf="group!=undefined">Group {{group}} selected.</p>
  </div>

  <div class="row">
    <div ngSwitch="{{group}}">
      <p *ngSwitchCase="undefined">Select a group.</p>
      <p *ngSwitchCase="'A'">Group A: 100%</p>
      <p *ngSwitchCase="'B'">Group B: 80%</p>
      <p *ngSwitchCase="'C'">Group C: 60%</p>
      <p *ngSwitchDefault>Group D: 40%</p>
    </div>
  </div>

  <div class="row">
    <button class="btn btn-dark" [ngSwitch]="group">
      <ng-template [ngSwitchCase]="undefined">Select a group.</ng-template>
      <ng-template ngSwitchCase="A">Group A: 100%</ng-template>
      <ng-template [ngSwitchCase]="'B'">Group B: 80%</ng-template>
      <ng-template ngSwitchCase="C">Group C: 60%</ng-template>
      <ng-template ngSwitchDefault>Group D: 40%</ng-template>
    </button>
  </div>
</div>
```

## Ref

**ref.component.ts**

```ts
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
```

**ref.component.scss**

```scss
.row {
  margin-bottom: 1rem;
}
```

**ref.component.html**

```html
<div class="container">
  <div class="row">
    <div class="col-sm-4">
      <input class="form-control" #num1 type="number" value="{{init.num1}}">
    </div>
    <div class="col-sm-1 text-center">
      +
    </div>
    <div class="col-sm-4">
      <input class="form-control" #num2 type="number" value="{{init.num2}}" (input)="'ignore'">
    </div>
    <div class="col-sm-1 text-center">
      =
    </div>
    <div class="col-sm-2">
      {{num1.valueAsNumber + num2.valueAsNumber}}
    </div>
  </div>

  <div class="row">
    <div class="col-sm-4">
      <input class="form-control" ref-number1 type="number"
        value="{{init.num1}}" (input)="init.num1 = $event.target.value">
    </div>
    <div class="col-sm-1 text-center">
      +
    </div>
    <div class="col-sm-4">
      <input class="form-control" ref-number2 type="number"
        value="{{init.num2}}" (input)="init.num2 = number2.value">
    </div>
    <div class="col-sm-1 text-center">
      =
    </div>
    <div class="col-sm-2">
      {{number1.valueAsNumber + number2.valueAsNumber}}
    </div>
  </div>

  <div class="row">
    <div class="col">
      init: {{init | json}}
    </div>
  </div>

  <div class="row">
    <div class="col-sm-4">
      <input class="form-control" type="number" [(ngModel)]="data.num1">
    </div>
    <div class="col-sm-1 text-center">
      +
    </div>
    <div class="col-sm-4">
      <input class="form-control" type="number" [(ngModel)]="data.num2">
    </div>
    <div class="col-sm-1 text-center">
      =
    </div>
    <div class="col-sm-2">
      {{data.result}}
    </div>
  </div>

  <div class="row">
    <div class="col">
      data: {{data | json}}
    </div>
  </div>
</div>
```

## Custom Directive

**highlight.directive.ts**

```ts
import { Directive } from '@angular/core';
import { ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter')
  set() {
    this.renderer.setStyle(this.el.nativeElement, 'background', 'orange');
    if (this.el.nativeElement.nodeName === 'P') {
      this.renderer.addClass(this.el.nativeElement, 'big');
    }
  }

  @HostListener('mouseleave')
  reset() {
    this.renderer.removeStyle(this.el.nativeElement, 'background');
    if (this.el.nativeElement.nodeName === 'P') {
      this.renderer.removeClass(this.el.nativeElement, 'big');
    }
  }

}
```

**highlight.component.scss**

```scss
p {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.big {
  font-size: 1.5rem;
}
```

**highlight.component.html**

```html
<div class="container">
  <h2 highlight>What is Angular?</h2>
  <p>Angular is a platform that makes it easy to build applications with the web.</p>
  <p highlight>Angular combines declarative templates, dependency injection, end to end tooling,</p>
  <p>and integrated best practices to solve development challenges. Angular empowers</p>
  <p highlight>developers to build applications that live on the web, mobile, or the desktop.</p>
</div>
```
