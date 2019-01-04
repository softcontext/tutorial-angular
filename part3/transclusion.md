# Transclusion

`ng-content`를 사용하여 컴포넌트 재 사용성을 극대화 할 수 있습니다. 컴포넌트 개발자가 미리 예측하여 모든 콘텐츠를 다 준비하는 것은 어려운 일입니다. 그렇다면 컴포넌트를 사용하는 사용자가 콘텐츠를 컴포넌트에게 전달하고 이를 컴포넌트가 받아서 처리하는 방법이 필요해 집니다. 

또는 컴포넌트 설계자가 기존 HTML 엘리먼트를 조립하여 그룹핑해서 사용하고자 할 때 발생되는 심각한 문제들을 해결하는 도구가 됩니다. 예를 들어 `<input>` 태그와 `<button>` 태그를 묶어서 InputButton 컴포넌트로 사용하고 싶다고 가정해 봅시다. 그런데 컴포넌트 안에 배치한 `<input>` 태그는 사용자는 `<input>` 태그를 직접 사용할 때 처럼 모든 속성을 지원해야 하거나 앵귤러 폼 연동 작업에도 문제가 없어야 한다고 가정하면 컴포넌트 설계자가 처리해야 하는 작업은 기하 급수적으로 증가됩니다. `@Inpput` 데코레이터를 몇 개나 배치해야 하는지를 상상해 보십시오. 이렇게는 현실적으로 개발할 수 있어도 하고 싶어지지 않을 정도에 다다르게 됩니다. 이런 상황에서 `<input>` 태그를 컴포넌트 안에 배치하지 말고 컴포넌트 사용자가 직접 작성해서 컴포넌트에게 넘겨주는 방식을 취하면 간단하게 해결이 됩니다. 이와 관련한 예제를 살펴 보겠습니다.

# 예제 프로젝트

다음 내용 중 많은 부분 다음 사이트를 참조했습니다.  
`https://blog.angular-university.io/angular-ng-content/`

```bash
$ ng new my-transclusion
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? SCSS
```

```bash
$ cd my-transclusion
$ npm i jquery popper.js bootstrap
$ npm i @types/jquery --save-dev
$ npm i font-awesome
```

**angular.json**

```json
"styles": [
  "./node_modules/font-awesome/css/font-awesome.css",
  "./node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles.scss"
],
"scripts": [
  "./node_modules/jquery/dist/jquery.slim.min.js",
  "./node_modules/popper.js/dist/umd/popper.min.js",
  "./node_modules/bootstrap/dist/js/bootstrap.min.js"
]
```

```bash
$ ng g c layout/header
$ ng g c layout/home
```

**header.component.html**

```html
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">

  <a class="navbar-brand" routerLink="/">Angular School</a>

  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item" routerLinkActive="active">
        <a class="nav-link" routerLink="/home">
          Home <span class="sr-only">(current)</span>
        </a>
      </li>
      <li class="nav-item dropdown" routerLinkActive="active">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false">
          Transclusion
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" [routerLink]="['step1', 'bad']" routerLinkActive>Step 1</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" [routerLink]="['step2', 'good']" routerLinkActive="active">Step 2</a>
        </div>
      </li>
    </ul>
  </div>

</nav>
```

**app.component.html**

```html
<app-header></app-header>

<div class="container">
  <router-outlet></router-outlet>
</div>
```

**app.component.scss**

```scss
.container {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
```

**app-routing.module.ts**

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './layout/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

기본 화면구성을 마쳤습니다. 화면으로 지금까지의 작업결과를 확인합니다.

```bash
$ ng g c step1/icon-input
$ ng g c step2/example
$ ng g c step2/input-group
```

새로 만든 컴포넌트가 있으니 라우팅 매핑 로직을 업그레이드 합니다.

**app-routing.module.ts**

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './layout/home/home.component';
import { IconInputComponent } from './step1/icon-input/icon-input.component';
import { ExampleComponent } from './step2/example/example.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'step1/bad', component: IconInputComponent },
  { path: 'step2/good', component: ExampleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

## 컴포넌트 설계 시 발생하는 문제점

**icon-input.component.ts**

```ts
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
```

**icon-input.component.scss**

```scss
:host {
  display: inline-block;
  border: 1px solid gray;
}

i {
  margin-left: 4px;
  margin-right: 4px;
}

input {
  border: none;
  outline: none;
}

:host(.focus) {
  border: 1px solid blue;
}
```

**icon-input.component.html**

```html
<i class="fa" [ngClass]="classes" (click)="isFocus=!isFocus"></i>
<input (focus)="isFocus=true" (blur)="isFocus=false" (keyup)="eventEmitter.emit(input.value)" #input>
```

`(click)="isFocus=!isFocus"` 코드는 `@HostBinding('class.focus')` 설정에 의미를 전달하기 위해서 추가한 설정입니다. 실제로는 필요없는 부분입니다.

### Component Design Problem

때때로 특정 엘리먼트들을 컴포넌트로 묶어서 템플릿에서 사용할 때 다음과 같은 문제점이 발생할 수 있습니다. 관점을 달리해서 생각하면 컴포넌트 개발 시 고려해 봐야 할 부분이라고 보시는 것이 좋겠습니다.

**1. Supporting all the HTML Properties of an HTML Input**  
컴포넌트의 템플릿으로 엘리먼트들을 그룹핑한 후, 그 안에 존재하는 input 엘리먼트가 사용자가 input 엘리먼트를 직접 사용할 때 처럼 모든 속성을 지원해야 한다면 그 만큼 `@Input` 데코레이터를 추가해야 합니다. 할 수는 있으나 현실적이지 못 합니다.

**2. Integration with Angular Forms**  
앵귤러 폼 처리와 완벽하게 연동해야 합니다. 이 또한 할 수는 있으나 현실적이지 못 합니다.

**3. Detection of plain browser events**  
사용자가 input 엘리먼트를 직접 사용할 때 처럼 모든 이벤트를 지원해야 한다면 그 만큼 `@Output` 데코레이터를 추가해야 합니다. 할 수는 있으나 너무 많기 때문에 현실적이지 못 합니다.

**4. Custom third party properties**  
써드 파티 라이브러리 중에는 엘리먼트에 `data-`로 시작하는 커스텀 속성이 존재할 것이라고 기대할 수도 있습니다. 이런 상황이 발생할 때 마다 기능을 계속적으로 추가해야 할 것 입니다.

## 투영으로 활용도를 높힌 컴포넌트

앞서서 살펴 본 문제점들을 만나게 되면 컴포넌트안에 엘리먼트를 직접 배치하지 말고 대신 사용자가 선택한 엘리먼트를 컴포넌트에게 넘겨주는 방식으로 전환하는 것이 좋겠습니다. 이렇게 사용자가 컴포넌트에게 넘겨주는 콘텐츠를 `Projection` 또는 `Transclusion` 한다고 부릅니다.

**input-group.component.ts**

```ts
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
```

`InputRefDirective` 디렉티브는 주로 `InputGroupComponent` 컴포넌트만이 사용할 것이므로 같은 파일에 배치하는 것이 좋겠습니다. **`InputRefDirective`를 루트 모듈에 등록하는 작업을 추가적으로 수행하셔야 합니다.**

**input-group.component.scss**

```scss
:host {
  display: inline-block;
  border: 1px solid gray;
}

i {
  margin-left: 4px;
  margin-right: 4px;
}

// <ng-content></ng-content> 안에 존재하는 엘리먼트에 접근하지 못 한다.
// 컴포넌트가 가진 엘리먼트에는 _ngcontent-* 구분 속성이 추가되지만
// 투영된 엘리먼트에는 구분 속성이 추가되지 않기 때문이다.
// input {
//   border: none;
//   outline: none;
// }

// :host 선택자로 컴포넌트 안 쪽에 있는 대상에게만 영향을 준다.
// ::ng-deep 선태자로 컴포넌트 자신 뿐 아니라
// 자식 컴포넌트가 가진 대상에게도 영향을 주며 여기에는 투영된 콘텐츠도 포함된다.
:host ::ng-deep input {
  border: none;
  outline: none;
}

:host(.focus) {
  border: 1px solid blue;
}
```

**input-group.component.html**

```html
<!-- input 엘리먼트는 사용자가 이 컴포넌트를 사용할 때 Projection 해 주는 방식으로 변경한다.
<i class="fa" [ngClass]="classes" (click)="isFocus=!isFocus"></i>
<input (focus)="isFocus=true" (blur)="isFocus=false" (keyup)="eventEmitter.emit(input.value)" #input>
 -->

<i class="fa" [ngClass]="classes"></i>
<!-- select에 의해서 소비되지 않는 엘리먼트들을 배치한다. -->
<ng-content></ng-content>

<!-- 투영된 엘리먼트들 중에서 클래스 active를 가진 input 태그만을 소비할 수 있다. -->
<!-- <ng-content select="input.active"></ng-content> -->
```

앞서서 만든 컴포넌트를 사용하는 컴포넌트를 추가로 작성합니다.

**example.component.html**

```html
<h3>(Icon + Input) Group</h3>

<!-- input 엘리먼트는 투영되어 app-input-group 컴포넌트에서 ng-content로 사용한다. -->
<app-input-group icon="envelope">
  <input type="email" placeholder="Email" inputRef>
</app-input-group>
```

`ng-content`를 사용해야 하는 필요성을 느낄 수 있는 좋은 예제였습니다. 기꺼이 지식을 나누어 주는 많은 개발자분들에게 고마움을 전하고 싶어지는 하루입니다. 모두 좋은 하루 보내세요!
