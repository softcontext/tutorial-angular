# Animation

CSS로 애니메이션 효과를 줄 수 있습니다. 앵귤러는 이와 비슷한 애니메이션 기능을 제공합니다. CSS를 이미 알고 계시다면 어렵지 않으므로 예제를 통해서 빠르게 익혀보세요.

```bash
$ ng new my-animation
```

## Step 1

**src\app\page\animation1\animation1.component.ts**

```ts
import { Component, OnInit, HostBinding } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-animation1',
  templateUrl: './animation1.component.html',
  styleUrls: ['./animation1.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.5,
        backgroundColor: 'green'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ]
})
export class Animation1Component implements OnInit {
  isOpen = true;

  toggle() {
    this.isOpen = !this.isOpen;
  }

  constructor() { }

  ngOnInit() { }

}
```

문법은 직관적입니다. trigger 함수에 전달하는 첫 번째 문자열이 설정된 애니메이션 효과를 가라키는 이름입니다. state 함수로 각 상태에서 적용할 스타일을 정의합니다. transition 함수로 한 상태에서 다른 상태로 변경될 때의 시간과 세기를 정의합니다. transition 함수의 설정은 강-약-강-약 또는 빠르게-느리게-빠르게-느리게 북을 치는 것과 비슷한 개념입니다.

**src\app\page\animation1\animation1.component.scss**

```scss
.open-close-container {
  border: 1px solid silver;
  padding: 1em;
  font-weight: bold;
  font-size: 2rem;
}
```

**src\app\page\animation1\animation1.component.html**

```html
<!-- 문법: <div [@triggerName]="expression">...</div> -->
<div [@openClose]="isOpen ? 'open' : 'closed'" class="open-close-container" (click)="toggle()">
  <p>The box is now {{ isOpen ? 'Open' : 'Closed' }}!</p>
</div>
```

**처리과정**  
1. isOpen==true >> [@openClose]="'open'" >> state('open') 스타일 적용
2. (click)="toggle()" >> isOpen 값을 반전 >> [@openClose]="'closed'"   
>> state('closed') 스타일 사용, transition('open => closed') 룰을 적용

## Step 2

앞서서 살펴본 것과 비슷한 난이도의 예제를 하나 더 살펴보겠습니다. 같은 부분과 다른 부분을 찾아보면서 작성해 보세요.

**src\app\page\animation2\animation2.component.ts**

```ts
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-animation2',
  templateUrl: './animation2.component.html',
  styleUrls: ['./animation2.component.scss'],
  animations: [
    trigger('changeDivSize', [
      state('initial', style({
        backgroundColor: 'green',
        width: '100px',
        height: '100px'
      })),
      state('final', style({
        backgroundColor: 'red',
        width: '200px',
        height: '200px'
      })),
      transition('initial=>final', animate('1500ms')),
      transition('final=>initial', animate('1000ms'))
    ])
  ]
})
export class Animation2Component implements OnInit {
  isInitial = true;

  constructor() { }

  ngOnInit() { }
}
```

**src\app\page\animation2\animation2.component.html**

```html
<div class="mx-2 my-2">
  <button class="btn btn-primary mb-2" [ngStyle]="{width:'100px'}" (click)="isInitial=!isInitial">
    {{ isInitial ? 'Expand' : 'Shrink' }}
  </button>
  <div [@changeDivSize]="isInitial ? 'initial' : 'final'"></div>
</div>
```

## Step 3

**src\app\page\animation3\animation3.component.ts**

```ts
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-animation3',
  templateUrl: './animation3.component.html',
  styleUrls: ['./animation3.component.scss'],
  animations: [
    trigger('circleEffect', [
      state('initial', style({
        backgroundColor: 'green',
        transform: 'scale(1)'
      })),
      state('final', style({
        backgroundColor: 'red',
        transform: 'scale(1.5)'
      })),
      transition('final=>initial', [animate('1000ms')]),
      transition('initial=>final', [animate('1500ms')])
    ])
  ]
})
export class Animation3Component implements OnInit {
  currentState = 'initial';
  circleStyle = {
    backgroundColor: 'green', // background-color
    borderRadius: '50%', // border-radius
    width: '100px',
    height: '100px',
    margin: '1em',
  };

  changeState() {
    this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
  }

  constructor() { }

  ngOnInit() { }
}
```

circleStyle 변수는 스타일 정보를 가진 객체입니다. CSS에서는 background-color라는 속성명을 사용하지만 자바스크립트에서는 backgroundColor 형태로 사용해야 합니다. 이는 자바스크립트를 기반으로 확장된 모든 기술에게 적용되는 개념입니다. `[ngStyle]="circleStyle"` 설정은 스타일 설정정보를 객체로 취급하는 방법입니다.

**src\app\page\animation3\animation3.component.html**

```html
<div class="mx-2 my-2">
  <div [ngStyle]="circleStyle" [@circleEffect]="currentState" (click)="changeState()"></div>
</div>
```

템플릿이 깔끔한 것과 클래스가 깔끔한 것 중에서 어는 것이 더 좋으신가요?

## Step 4

이번 예제에서는 transition 함수에서 사용하는 예약된 기호를 몇개 익혀야 합니다. 주석을 참고하세요.

**src\app\page\animation4\animation4.component.ts**

```ts
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-animation4',
  templateUrl: './animation4.component.html',
  styleUrls: ['./animation4.component.scss'],
  /*
    void: state when the HTML element isn't attached to a view
    *: matches any animation state
   */
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(1000)),
    ]),
    trigger('flyInOut', [
      // state('in', style({
      //   transform: 'translateX(0)'
      // })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({ transform: 'translateX(100%)' }))
      ])
    ]),
    /*
      :enter is aliases for the void => *
      :leave is aliases for the * => void transitions

      - `animate(500)` : Duration is 500 milliseconds.
      - `animate("1s")` : Duration is 1000 milliseconds.
      - `animate("100ms 0.5s")` : Duration is 100 milliseconds, delay is 500 milliseconds.
      - `animate("5s ease-in")` : Duration is 5000 milliseconds, easing in.
      - `animate("5s 10ms cubic-bezier(.17,.67,.88,.1)")` : Duration is 5000 milliseconds, delay is 10

      Easing functions >> https://easings.net/ko
     */
    trigger('enterLeave', [
      // state('in', style({
      //   transform: 'translateX(0)'
      // })),
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-out')
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class Animation4Component implements OnInit {
  list = [];

  addItem() {
    this.list.push('Item ' + (this.list.length + 1));
  }

  removeItem() {
    if (this.list.length > 0) {
      this.list.pop();
    }
  }

  constructor() { }

  ngOnInit() { }
}
```

**src\app\page\animation4\animation4.component.scss**

```scss
/*
[ngStyle]="{listStyle: 'none', paddingLeft: '0'}
설정이 제대로 적용되지 않는다. 원인을 찾으면 알려주세요 :)
 */

ul {
  list-style: none;
  padding-left: 1em;
}
```

**src\app\page\animation4\animation4.component.html**

```html
<div class="mx-2 my-2">
  <div class="mb-4">
    <button class="btn btn-primary mr-1" (click)="addItem()">Add Item</button>
    <button class="btn btn-warning" (click)="removeItem()">Remove Item</button>
  </div>

  <hr>

  <div class="mb-4">
    <ul>
      <li *ngFor="let item of list" [@fadeInOut]>
        {{item}}
      </li>
    </ul>
  </div>

  <hr>

  <div class="mb-4">
    <ul class="text-center">
      <li *ngFor="let item of list" [@flyInOut]>
        {{item}}
      </li>
    </ul>
  </div>

  <hr>

  <div class="mb-4">
    <ul class="text-center">
      <li *ngFor="let item of list" [@enterLeave]>
        {{item}}
      </li>
    </ul>
  </div>
</div>
```

같은 ul 디자인을 사용하는 엘리먼트에 세 개의 다른 트리거를 적용했습니다. 직접 눈으로 차이를 확인하세요.

## Step 5

이번 예제는 다음 사이트를 참고했습니다.  
* `https://medium.com/@asm/animated-slide-panel-with-angular-e985ad646f9`

실전에서 쓸만한 예제입니다.

**src\app\page\animation5\animation5.component.ts**

```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animation5',
  templateUrl: './animation5.component.html',
  styleUrls: ['./animation5.component.scss']
})
export class Animation5Component implements OnInit {
  isLeftVisible = true;

  constructor() { }

  ngOnInit() { }
}
```

**src\app\page\animation5\animation5.component.scss**

```scss
[leftPane] {
  background-color: gold;
  height: 300px;
}

[rightPane] {
  background-color: tomato;
  height: 300px;
}
```

**src\app\page\animation5\animation5.component.html**

```html
<div class="my-2">
  <app-slide-panel [activePane]="isLeftVisible ? 'left' : 'right'">
    <div leftPane>LEFT</div>
    <div rightPane>RIGHT</div>
  </app-slide-panel>
</div>

<button class="btn btn-info" (click)="isLeftVisible = !isLeftVisible">
  {{isLeftVisible ? 'Show Right' : 'Show Left'}}
</button>
```

app-slide-panel 컴포넌트 가운데 배치한 엘리먼트는 Transclusion입니다.

**src\app\page\animation5\slide-panel\slide-panel.component.ts**

```ts
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

// https://infoscis.github.io/2017/06/19/TypeScript-handbook-advanced-types/
type PaneType = 'left' | 'right';

@Component({
  selector: 'app-slide-panel',
  templateUrl: './slide-panel.component.html',
  styleUrls: ['./slide-panel.component.scss'],
  // 이 컴포넌트가 필요한 데이터는 초기에 한 번만 받으면 된다.
  // 추 후, 앱의 다른 컴포넌트에서 발생한 변화와 무관한 컴포넌트다.
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slide', [
      state('left', style({
        transform: 'translateX(0)'
      })),
      state('right', style({
        transform: 'translateX(-50%)'
      })),
      transition('* => *', animate(300))
    ])
  ]
})
export class SlidePanelComponent implements OnInit {
  @Input() activePane: PaneType = 'left';

  constructor() { }

  ngOnInit() { }
}
```

state('left') 상태에서는 원래의 X 좌표대로 화면에 배치합니다. state('right') 상태에서는 X 좌표를 -50% 합니다. 즉, 보여지는 화면을 기준으로 템플릿은 왼쪽으로 50% 이동하게 됩니다. 이러한 기믹은 슬라이딩 메뉴를 구현할 때 많이 사용됩니다. 단, 슬라이딩 메뉴는 레이어를 분리해서 적용하기 때문에 덮여서 보인다는 차이점이 있습니다.

**src\app\page\animation5\slide-panel\slide-panel.component.scss**

```scss
:host {
  display: block;
  overflow: hidden;
  /* Hide everything that doesn't fit compoennt */
}

.parent {
  height: 100%;
  width: 200%;
  /* Make the parent element to take up twice of the component's width */
  display: flex;
  /* Align all children in a row */
  div {
    flex: 1;
    /* Let all the flexible items be the same length, regardless of its content */
  }
}
```

이 예제에서 핵심은 스타일 설정을 통한 화면설계입니다. 스타일 부분의 설정 내용이 중요합니다.

* `display: block`: width, height를 지정할 수 있다.
* `overflow: hidden`: 지정된 화면을 초과한 부분은 감춘다.
* `height: 100%`: 사용가능한 높이를 모두 사용한다.
* `width: 200%`: 사용가능한 넓이의 2배를 사용한다.
* `display: flex`: 엘리먼트를 비율로 배치하는 전략을 사용한다.
* `div { flex: 1; }`: 모든 div는 1:1 비율의 길이를 갖는다.

**src\app\page\animation5\slide-panel\slide-panel.component.html**

```html
<div class="parent" [@slide]="activePane">
  <div>
    <ng-content select="[leftPane]"></ng-content>
  </div>
  <div>
    <ng-content select="[rightPane]"></ng-content>
  </div>
</div>
```

템플릿의 넓이는 사용가능한 넓이의 2배이고 .parent 클래스 안의 div는 1:1 비율이므로 하나의 div는 화면 넓이를 100%로 차지합니다. `overflow: hidden` 이므로 div 둘 중에 하나는 화면에 보이지 않게 됩니다.

* 원상태로 표시하면 .parent 클래스 안의 첫 번째 div만 화면에 보여집니다.
* 템플릿을 왼쪽으로 50% 이동시키면 .parent 클래스 안의 두 번째 div만 화면에 보여집니다.
* 상태변화를 적용할 때, animate(300) 설정으로 이어지 듯 변화시키므로 화면이 왼쪽/오른쪽으로 슬라이딩되는 것처럼 보여집니다.
