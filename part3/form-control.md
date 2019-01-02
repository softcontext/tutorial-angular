# Form Control

## Template Driven Forms

HTML 엘리먼트가 주도하는 폼 제어방식입니다. `ngModel`, `ngForm` 같은 디렉티브를 사용하여 설정합니다.

## Reactive Forms

컴포넌트 클래스의 코드로써 폼을 제어하는 방식입니다. 엘리먼트에 설정하는 대신 코드로 처리하게 되면 한 번 처리하면 되는 작업을 두 번 해야 하는 것이 아닌지 의문이 들 수 있습니다. 또는 코드의 가독성도 걱정이 되는 부분입니다.

`Template Driven` 방식으로 폼을 구성하여 바인딩을 설정하면 직접 데이터 모델을 수정합니다. 만약 사용자가 수정작업을 도중에 중단하면 이미 데이터는 수정된 상태이기 때문에 이전 값으로 복원할 수 없습니다. `Reactive Forms` 방식에서는 사용자가 `Submit`를 하기전까지 이전 상태를 유지합니다. 이렇게 관리되는 상태는 `Immutable`입니다. `Reactive Forms`을 사용하면 쉽게 이전 상태로 되돌릴 수 있습니다.

폼 모델을 만들기 위해서 `FormGroup`을 사용합니다. `FormGroup`은 생성자로 서브 폼그룹이나 `FormControl`을 받습니다. `FormControl`은 관리되고 평가되는 엘리먼트를 의미합니다.

코드를 보다 체계적으로 작성할 수 있는 도구인 `FormBuilder`를 사용하면 더 적은 코드로 `FormGroup`을 선언할 수 있습니다. `FormBuilder`는 생성자로 DI 받아서 사용합니다.



# 예제 프로젝트

```bash
$ ng new my-form-control
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? SCSS
```

```bash
$ cd my-form-control
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

**package.json**

```json
{
  "name": "my-form-control",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e"
  },
  "private": true,
  "dependencies": {
    "@angular/animations": "~7.1.0",
    "@angular/common": "~7.1.0",
    "@angular/compiler": "~7.1.0",
    "@angular/core": "~7.1.0",
    "@angular/forms": "~7.1.0",
    "@angular/platform-browser": "~7.1.0",
    "@angular/platform-browser-dynamic": "~7.1.0",
    "@angular/router": "~7.1.0",
    "bootstrap": "^4.2.1",
    "core-js": "^2.5.4",
    "font-awesome": "^4.7.0",
    "jquery": "^3.3.1",
    "popper.js": "^1.14.6",
    "rxjs": "~6.3.3",
    "tslib": "^1.9.0",
    "zone.js": "~0.8.26"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "~0.11.0",
    "@angular/cli": "~7.1.1",
    "@angular/compiler-cli": "~7.1.0",
    "@angular/language-service": "~7.1.0",
    "@types/jasmine": "~2.8.8",
    "@types/jasminewd2": "~2.0.3",
    "@types/jquery": "^3.3.29",
    "@types/node": "~8.9.4",
    "codelyzer": "~4.5.0",
    "jasmine-core": "~2.99.1",
    "jasmine-spec-reporter": "~4.2.1",
    "karma": "~3.1.1",
    "karma-chrome-launcher": "~2.2.0",
    "karma-coverage-istanbul-reporter": "~2.0.1",
    "karma-jasmine": "~1.1.2",
    "karma-jasmine-html-reporter": "^0.2.2",
    "protractor": "~5.4.0",
    "ts-node": "~7.0.0",
    "tslint": "~5.11.0",
    "typescript": "~3.1.6"
  }
}
```

```bash
$ ng g c layout/header
$ ng g c public/home
$ ng g c public/NotFound
```

**header.component.html**

```html
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" routerLink="/">Angular Routing Guard</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse"
    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
    aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item" routerLinkActive="active">
        <a class="nav-link" routerLink="home">
          Home <span class="sr-only">(current)</span>
        </a>
      </li>
      <li class="nav-item" routerLinkActive="active">
        <a class="nav-link" routerLink="#">Actions</a>
      </li>
      <li class="nav-item dropdown" routerLinkActive="active">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Actions
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" routerLink="#" routerLinkActive="active">Actions</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" routerLink="#" routerLinkActive="active">Actions</a>
        </div>
      </li>
    </ul>
  </div>
</nav>
```

**home.component.html**

```html
<div class="jumbotron bg-white">
  <h1 class="display-3">What is Angular?</h1>
  <p class="lead">
    Angular is a platform that makes it easy to build applications with the web.
  </p>
  <hr class="my-3">
  <p>
    Angular combines declarative templates, dependency injection, end to end tooling
    and integrated best practices to solve development challenges.
    Angular empowers developers to build applications that live on the web, mobile, or the desktop
  </p>
  <p class="lead">
    <a class="btn btn-primary btn-lg" routerLink="#" role="button">Not Found</a>
  </p>
</div>
```

**not-found.component.html**

```html
<div class="jumbotron bg-white">
  <h1 class="display-3">404 Not Found</h1>
  <p class="lead">The requested URL was not found on this server</p>
  <hr class="my-3">
  <p>The link is broken or the page has been moved.</p>
</div>
```

**app-routing.module.ts**

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './public/home/home.component';
import { NotFoundComponent } from './public/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
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
body,
html {
  height: 100%;
}

.container {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
```

기본적인 화면구성을 완료했습니다. 브라우저로 결과를 확인하세요.

## Template Driven Forms

폼처리는 프론트엔드 로직에서 가장 복잡한 부분입니다. 그래서 점진적으로 기능을 추가해 나가도록 하겠습니다. 깃의 커밋을 이용하면 점진적인 코드 상태를 다루기에 편리하나 지면상으로 보시는 분들을 위해서 의도적으로 코드 파일을 수동으로 백업해 가면서 새 로직을 추가하겠습니다.
 
### Step 1. Binding

처음 다룰 관심사는 클래스의 초기상태를 템플릿에 적용하고 사용자가 작성한 데이터를 클래스의 상태로 저장하는 방법입니다.

```bash
$ ng g class step1/model/signup
$ ng g c step1/signup
```

취급하는 데이터에 맞게 모델 클래스를 작성합니다. 이번 데이터의 주제는 회원가입 시 사용자가 작성한 데이터입니다.

**signup.ts**

```ts
export class Signup {
  email: string;
  password: string;
  password2: string;
  question: string;
  answer: string;
  readTerms: boolean;
}
```

**signup.component.ts**

```ts
import { Component, OnInit } from '@angular/core';
import { Signup } from '../model/signup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  errorMessage: any;
  signup: Signup = new Signup();
  _questionSelected: number = 0;
  questions: string[] = [
    'What was the name of your elementary school?',
    'What is the first name of the person you first kissed?'
  ];

  constructor() {
    console.log('signup/SignupComponent()');
  }

  ngOnInit() {
    this.signup.question = this.questions[this.questionSelected];
  }

  get questionSelected() {
    return this._questionSelected;
  }

  set questionSelected(index) {
    this._questionSelected = index;
    // this._questionSelected 값이 변경되면 이에 의존하는
    // this.signup.question 값도 변경해야 한다.
    this.signup.question = this.questions[this._questionSelected];
  }
}
```

`questions` 배열의 데이터를 `select` 엘리먼트의 `option` 값으로 사용합니다. `select` 엘리먼트 또는 `radio` 타입의 `input` 엘리먼트는 고객이 하나의 값을 선택하게 되고 선택된 값 하나만 전송하면 됩니다. 이를 저장할 변수는 모델인 `Signup` 자료형의 객체안에 존재합니다. `question`  값으로 질문 인덱스 값이 아닌 질문 문자열을 저장하고 `answer` 값은 그에 대한 사용자의 답변 문자열을 저장하기로 계획했습니다. 

`select` 엘리먼트의 초기 및 사용자가 항목을 선택했을 때 해당 항목의 선택상태를 유지하기 위해서 양방향 바인딩을 설정합니다.  그런데 `[(ngModel)]="signup.question"` 코드가 아닌 `[(ngModel)]="questionSelected"` 처럼 설정했습니다. 이렇게 사용하면 `[value]="q"` 코드 대신 `[value]="i"` 처럼 처리할 수 있게 됩니다. 때때로 `value` 속성의 값으로 문자열을 할당해야 하는데 문자열이 매우 길다면 대체 방법으로 인덱스 값을 사용하고 싶게 됩니다. `signup` 모델 객체의 `question` 값으로 인덱스 값을 사용한다고 하면 `[(ngModel)]="signup.question"` 코드로 설정하면 되고 이것 만으로 화면과 상태의 싱크가 유지됩니다. 사실 이렇게 사용하는 것을 권장합니다만 지금은 다양한 설정방법을 연습하기 위해서 `signup` 모델 객체의 `question` 값으로 질문 문자열을 그대로 저장하고 싶다고 가정하겠습니다.

```html
<select class="form-control" [(ngModel)]="questionSelected">
  <option *ngFor="let q of questions; let i=index" [value]="i">{{q}}</option>
</select>
```

그런데 이렇게 설정을 하게 되면 앵귤러의 양방향 바인딩 설정으로 갱신되는 것은 클래스의 존재하는 `questionSelected` 변수 뿐 입니다. 최종적으로 전송할 데이터는 `signup` 변수가 갖고 있어야 하는데 말이죠. 그래서 사용자가 항목을 선택할 때 마다 직접 변수에 값을 저장하는 대신 세터 함수를 호출하는 것으로 바꿉니다. 먼저 `questionSelected` 변수를 `_questionSelected`로 바꿉니다. 다음으로 `_questionSelected` 변수의 접근을 제어하는 게터, 세터 함수 `questionSelected()`를 만듭니다. 템플릿과의 양방향 바인딩은 게터 `questionSelected()` 함수와 세터 ` questionSelected()` 함수로 수행합니다. 게터, 세터 함수에서 `_questionSelected` 변수와의 연동으로 바인딩을 유지하고 모델 객체 `signup`의 상태는 다음 코드를 추가하여 적용되도록 합니다.

`this.signup.question = this.questions[this._questionSelected];`

이렇게 밸류 프로퍼티 대신 접근자 프로퍼티와 연동하게 되면 상태의 갱신 시 개발자가 원하는 부가적인 작업을 수행할 수 있는 함수공간을 획득할 수 있으며 이는 `Vue.js`의 `Computed` 속성과 유사합니다.

**signup.component.html**

```html
<div class="row">
  <div class="col-md-6 mx-auto">
    <div class="card card-body">
      <h3 class="text-center mb-4">Sign-up</h3>

      <div class="alert alert-warning" *ngIf="errorMessage">
        {{errorMessage}}
      </div>

      <div class="form-group">
        <input class="form-control" placeholder="E-mail Address" name="email" type="text"
          [(ngModel)]="signup.email">
      </div>

      <div class="form-group">
        <input class="form-control" placeholder="Password" name="password" type="password"
          [(ngModel)]="signup.password">
      </div>
      <div class="form-group">
        <input class="form-control" placeholder="Confirm Password" name="password2" type="password"
          [(ngModel)]="signup.password2">
      </div>

      <div class="form-group">
        <select class="form-control" [(ngModel)]="questionSelected">
          <option *ngFor="let q of questions; let i=index" [value]="i">{{q}}</option>
        </select>
      </div>
      <div class="form-group">
        <input class="form-control" placeholder="Security Answer" name="answer" type="text"
          [(ngModel)]="signup.answer">
      </div>

      <div class="form-check mb-3">
        <input class="form-check-input" type="checkbox" id="checkTerms" [(ngModel)]="signup.readTerms">
        <label class="form-check-label small" for="checkTerms">
          I have read and agree to the <a href="#">terms of service</a>
        </label>
      </div>

      <button class="btn btn-primary btn-block" type="submit">Sign-up</button>
    </div>
  </div>
</div>

<h5 class="mt-4">questionSelected</h5>
<pre>{{questionSelected}}</pre>

<h5>signup</h5>
<pre>{{signup | json}}</pre>
```

**app-routing.module.ts**

```ts
import { SignupComponent } from './step1/signup/signup.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
];
```

**header.component.html**

```html
<li class="nav-item dropdown" routerLinkActive="active">
  <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Signup
  </a>
  <div class="dropdown-menu" aria-labelledby="navbarDropdown">
    <a class="dropdown-item" routerLink="signup" routerLinkActive="active">Step 1</a>
  </div>
</li>
```

### Step 2. Validation

이번에는 사용자가 작성한 데이터의 유효성을 체크하는 방법에 대해서 살펴봅니다. 앵귤러를 사용하면 간단한 설정만으로 평가를 수행할 수 있습니다. 앵귤러는 기본적으로 4가지의 평가방법을 지원합니다.

1. `required` : 필수항목입니다. 입력된 데이터가 없으면 에러입니다.
2. `minlength` : 문자열의 최소길이입니다. 설정보다 작다면 에러입니다.
3. `maxlength` : 문자열의 최대길이입니다. 설정보다 크다면 에러입니다. 이 설정만으로 `HTML`의 `max` 속성이 있는 것처럼 작동합니다.
4. `pattern` : 문자열을 정규표현식으로 테스트합니다. `RegExp.prototype.test()` 수행 시 `false`가 리턴되면 에러입니다.

`ngModel` 디렉티브를 갖고 있는 엘리먼트를 폼 태그로 감싸면 다음과 같은 에러를 볼 수도 있습니다. 친절하게 해결방법 2가지를 보여주므로 선택해서 설정을 추가하면 해결됩니다.

```
If ngModel is used within a form tag, 
either the name attribute must be set or 
the form control must be defined as 'standalone' in ngModelOptions.

Example 1: <input [(ngModel)]="person.firstName" name="first">
Example 2: <input [(ngModel)]="person.firstName" [ngModelOptions]="{standalone: true}">
```

`ngModel` 디렉티브를 갖고 있는 엘리먼트를 폼 태그로 감싸면 앵귤러는 `name` 속성의 값을 사용하여 `FormControl` 객체를 구성합니다. 대신 `[ngModelOptions]="{standalone: true}` 설정을 추가하면 작업대상에서 제외합니다.

`signup` 폴더를 복사해서 `signup2` 폴더를 만듭니다. 폴더가 다르면 파일명이 같아도 괜찮습니다. 다만 다른 폴더 밑에 존재하는 같은 클래스명의 자원을 동시에 사용하는 것은 안됩니다. 자바스크립트는 코드 상단에 네임스페이스(또는 패키지) 선언이 없기 때문입니다. 뒤에 나오는 `app.module.ts` 파일에서 어떻게 이를 처리하는지 살펴보세요
      
**signup.component.ts**

```ts
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Signup } from '../model/signup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  errorMessage: string = '';
  isProceeding: boolean = false;
  signup: Signup = new Signup();
  _questionSelected: number = 0;
  questions: string[] = [
    'What was the name of your elementary school?',
    'What is the first name of the person you first kissed?'
  ];

  constructor() {
    console.log('signup2/SignupComponent()');
  }

  ngOnInit() {
    this.signup.question = this.questions[this.questionSelected];
  }

  get questionSelected() {
    return this._questionSelected;
  }

  set questionSelected(index) {
    this._questionSelected = index;
    // this._questionSelected 값이 변경되면 이에 의존하는
    // this.signup.question 값도 변경해야 한다.
    this.signup.question = this.questions[this._questionSelected];
  }

  submit(f: NgForm) {
    this.errorMessage = '';
    this.isProceeding = true;

    console.log(f.value);
    // {email: "softcontext@gmail.com",
    // password: "11111", password2: "22222",
    // answer: "some", readTerms: true}

    console.log(f.controls)
    // {email: FormControl, password: FormControl, password2: FormControl,
    // answer: FormControl, readTerms: FormControl}

    if (f.invalid) {
      if (f.controls.email.errors && f.controls.email.errors.required) {
        this.errorMessage += '<small class="text-primary">Email Required.</small><br>';
      }
      if (f.controls.password.errors && f.controls.password.errors.required) {
        this.errorMessage += '<small class="text-success">Passowrd Required.</small><br>';
      }
      if (f.controls.password2.errors && f.controls.password2.errors.required) {
        this.errorMessage += '<small class="text-info">Confirm Passowrd Required.</small><br>';
      }
      if (this.isNotPasswordMatch()) {
        this.errorMessage += '<small class="text-danger">Password is not match</small><br>';
      }
      if (f.controls.answer.errors && f.controls.answer.errors.required) {
        this.errorMessage += '<small class="text-dark">Security Answer Required.</small><br>';
      }
      if (f.controls.readTerms.errors && f.controls.readTerms.errors.required) {
        this.errorMessage += '<small class="text-muted">You must agree to the terms.</small><br>';
      }
      setTimeout(() => this.isProceeding = false, 1500);
      return false;
    }

    console.log(this.signup);
    // {question: "What was the name of your elementary school?",
    // email: "softcontext@gmail.com",
    // password: "11111", password2: "22222",
    // answer: "some", readTerms: true}

    this.isProceeding = false;
    alert('All green!');
  }

  isNotPasswordMatch() {
    return !(this.signup.password === this.signup.password2);
  }

}
```

**signup.component.html**

```html
<div class="row">
  <div class="col-md-6 mx-auto">
    <div class="card card-body">
      <h3 class="text-center mb-4">Sign-up</h3>

      <div class="alert alert-warning" *ngIf="errorMessage" [innerHTML]="errorMessage"></div>

      <!--
      If ngModel is used within a form tag, either the name attribute must be set or the form
      control must be defined as 'standalone' in ngModelOptions.

      해결책 2가지
      1. [ngModelOptions]="{standalone: true}" : select 엘리먼트를 체크 대상에서 제외한다.
      2. name="readTerms" : checkbox 엘리먼트에 name 속성을 추가한다.
       -->

      <!-- <form #f="ngForm" (ngSubmit)="f.valid && submit(f)"> -->
      <form #f="ngForm" (ngSubmit)="submit(f)" novalidate>
        <div class="form-group">
          <input class="form-control" placeholder="E-mail Address" name="email" type="text"
            [(ngModel)]="signup.email" #email="ngModel"
            required pattern="\w+@\w+\.\w+">
          <small class="form-text text-muted" *ngIf="email.untouched">
            We'll never share your email with anyone else.</small>
          <small class="form-text text-danger" *ngIf="email.touched && email.errors">
            <ng-template [ngIf]="email.errors.required">Required</ng-template>
            <ng-template [ngIf]="email.errors.pattern">Please enter a valid email</ng-template>
          </small>
        </div>

        <div class="form-group">
          <input class="form-control" placeholder="Password" name="password" type="password"
            [(ngModel)]="signup.password" #password="ngModel"
            required minlength="5" maxlength="20">
          <small class="form-text text-danger" *ngIf="password.touched && password.errors">
            <ng-template [ngIf]="password.errors.required">Required</ng-template>
            <ng-template [ngIf]="password.errors.minlength || password.errors.maxlength">
              Must be 5~20 characters</ng-template>
          </small>
        </div>
        <div class="form-group">
          <input class="form-control" placeholder="Confirm Password" name="password2" type="password"
            [(ngModel)]="signup.password2" #password2="ngModel"
            required minlength="5" maxlength="20">
          <ng-template [ngIf]="password2.touched">
            <small class="form-text text-danger">
              <ng-template [ngIf]="password2.errors">
                <ng-template [ngIf]="password2.errors.required">Required</ng-template>
                <ng-template [ngIf]="password2.errors.minlength || password2.errors.maxlength">
                  Must be 5~20 characters</ng-template>
              </ng-template>
              <ng-template [ngIf]="!password2.errors">
                <ng-template [ngIf]="isNotPasswordMatch()">Password is not match</ng-template>
              </ng-template>
            </small>
          </ng-template>
        </div>

        <div class="form-group">
          <!-- 체크 대상에서 제외된다. -->
          <select class="form-control" [(ngModel)]="questionSelected" 
            [ngModelOptions]="{standalone: true}" required>
            <option *ngFor="let q of questions; let i=index" [value]="i">{{q}}</option>
          </select>
        </div>
        <div class="form-group">
          <input class="form-control" placeholder="Security Answer" name="answer" type="text"
            [(ngModel)]="signup.answer" #answer="ngModel"
            required>
          <small class="form-text text-danger" *ngIf="answer.touched && answer.errors">
            <ng-template [ngIf]="answer.errors.required">Required</ng-template>
          </small>
        </div>

        <div class="form-check mb-3">
          <input class="form-check-input" type="checkbox" id="checkTerms"
            [(ngModel)]="signup.readTerms" name="readTerms" #readTerms="ngModel"
            required>
          <label class="form-check-label small" for="checkTerms">
            I have read and agree to the <a href="#">terms of service</a>
          </label>
          <small class="form-text text-danger" *ngIf="readTerms.touched && readTerms.errors">
            <ng-template [ngIf]="readTerms.errors.required">Required</ng-template>
          </small>
        </div>

        <button class="btn btn-primary btn-block" type="submit" [disabled]="f.invalid">Sign-up</button>
        <button class="btn btn-primary btn-block" type="submit" [disabled]="isProceeding">Sign-up</button>
      </form>

    </div>
  </div>
</div>

<h5 class="mt-4">questionSelected</h5>
<pre>{{questionSelected}}</pre>

<h5>signup</h5>
<pre>{{signup | json}}</pre>

<hr>

<h3>Validation</h3>

<h5>email.errors</h5>
<pre>{{email.errors | json}}</pre>

<h5>password.errors</h5>
<pre>{{password.errors | json}}</pre>

<h5>password2.errors</h5>
<pre>{{password2.errors | json}}</pre>

<h5>questionSelected.errors</h5>
<pre>{{questionSelected.errors | json}}</pre>
<p>
 [ngModelOptions]의 standalone 설정으로 체크 대상에서 제외된다.
 종합 리포팅 ngForm에도 반영되지 않는다.
</p>

<h5>answer.errors</h5>
<pre>{{answer.errors | json}}</pre>

<h5>readTerms.errors</h5>
<!-- #readTerms="ngModel" -->
<pre>{{readTerms.errors | json}}</pre>
<!-- name="readTerms" -->
<pre>{{f.controls.readTerms?.errors | json}}</pre>
```

**app.module.ts**

```ts
import { SignupComponent } from './step1/signup/signup.component';
import { SignupComponent as SignupComponent2 } from './step1/signup2/signup.component';

@NgModule({
  declarations: [
    SignupComponent, SignupComponent2, 
  ],
})
```

`signup/signup.component` 파일을 복사해서 `signup2/signup.component` 파일을 만들었습니다. 그래서 두 파일의 클래스명이 동일합니다. 같은 이름의 클래스를 동시에 사용할 수 없습니다. `from` 다음 오는 문자열은 네임스페이스가 아니기 때문입니다. 그래서 임포트 시 `SignupComponent as SignupComponent2` 처리로 별칭을 붙여서 사용해야 합니다.

**app-routing.module.ts**

```ts
import { SignupComponent } from './step1/signup/signup.component';
import { SignupComponent as SignupComponent2 } from './step1/signup2/signup.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'signup2', component: SignupComponent2 },
];
```

**header.component.html**

```html
<li class="nav-item dropdown" routerLinkActive="active">
  <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Signup
  </a>
  <div class="dropdown-menu" aria-labelledby="navbarDropdown">
    <a class="dropdown-item" routerLink="signup" routerLinkActive="active">Step 1</a>
    <a class="dropdown-item" routerLink="signup2" routerLinkActive="active">Step 2</a>
  </div>
</li>
```

### Step 3. Style

앞서서 폼 바인딩 처리와 데이터 평가방법을 살펴보았습니다. 앵귤러는 폼 엘리먼트의 데이터를 평가하면서 엘리먼트 디자인 및 상태의 안내를 위한 작업을 자동으로 적용합니다. 이번 시간에 CSS 클래스 기반으로 한 엘리먼트 처리방법을 살펴보겠습니다.

폼 엘리먼트 상태와 데이터 평가에 따라서 다음과 같은 클래스를 사용할 수 있습니다. 클래스의 추가 및 삭제는 앵귤러가 수행합니다.

1. `.ng-invalid` : 평가결과가 유효하지 않습니다. 즉, 에러가 존재합니다.  
2. `.ng-valid` : 평가결과가 유효합니다.  
3. `.ng-untouched` : 엘리먼트를 사용자가 건드린적이 없습니다.  
4. `.ng-touched` : 엘리먼트를 사용자가 건드렸습니다.  
5. `.ng-pristine` : 엘리먼트의 데이터가 초기 상태 그대로 입니다.  
6. `.ng-dirty` : 엘리먼트의 데이터가 변경되었습니다. 주의할 부분은 한 번 `dirty` 상태가 되면 초기 상태와 같은 값으로 돌려 놓는다고 해서 이 값이 변경되지는 않는다는 점입니다.  

NgForm 객체에는 `.ng-` 두문자를 뺀 이름의 속성과 `disabled`, `enabled`, `value` 속성 등이 있습니다.

**signup.component.ts**

```ts
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Signup } from '../model/signup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  errorMessage: string = '';
  // Submit 버튼을 누르면 처리가 완료될 때까지
  // 버튼을 비 활성화하기 위한 변수
  isProceeding: boolean = false;
  signup: Signup = new Signup();
  _questionSelected: number = 0;
  questions: string[] = [
    'What was the name of your elementary school?',
    'What is the first name of the person you first kissed?'
  ];

  constructor() {
    console.log('signup3/SignupComponent()');
  }

  ngOnInit() {
    this.signup.question = this.questions[this.questionSelected];
  }

  get questionSelected() {
    return this._questionSelected;
  }

  // Vue.js의 Computed 속성과 비슷하다.
  set questionSelected(index) {
    this._questionSelected = index;
    // this._questionSelected 값이 변경되면 이에 의존하는
    // this.signup.question 값도 변경해야 한다.
    this.signup.question = this.questions[this._questionSelected];
  }

  submit(f: NgForm) {
    this.errorMessage = '';
    this.isProceeding = true;

    console.log(f.value);
    // {email: "softcontext@gmail.com",
    // password: "11111", password2: "22222",
    // answer: "some", readTerms: true}

    console.log(f.controls)
    // {email: FormControl, password: FormControl, password2: FormControl,
    // answer: FormControl, readTerms: FormControl}

    if (f.invalid) {
      if (f.controls.email.errors && f.controls.email.errors.required) {
        this.errorMessage += '<small class="text-primary">Email Required.</small><br>';
      }
      if (f.controls.password.errors) {
        if (f.controls.password.errors.required) {
            this.errorMessage += '<small class="text-success">Passowrd Required.</small><br>';
        }
        if (f.controls.password.errors.minlength || f.controls.password.errors.maxlength) {
            this.errorMessage += '<small class="text-success">Passowrd must be 5~20 characters.</small><br>';
        }
      }
      if (f.controls.password2.errors) {
        if (f.controls.password2.errors.required) {
            this.errorMessage += '<small class="text-info">Confirm Passowrd Required.</small><br>';
        }
        if (f.controls.password2.errors.minlength || f.controls.password2.errors.maxlength) {
            this.errorMessage += '<small class="text-info">Confirm Passowrd must be 5~20 characters.</small><br>';
        }
      }
      if (f.controls.answer.errors && f.controls.answer.errors.required) {
        this.errorMessage += '<small class="text-dark">Security Answer Required.</small><br>';
      }
      if (f.controls.readTerms.errors && f.controls.readTerms.errors.required) {
        this.errorMessage += '<small class="text-muted">You must agree to the terms.</small><br>';
      }
      setTimeout(() => this.isProceeding = false, 1500);
      return false;
    }

    // f.valid 속성은 두 패스워드가 달라도 유효로 판단되기 때문에
    // 패스워드 불일치 로직이 작동하지 않는 버그적인 상황이 발생한다.
    // 따라서 이런 로직은 별도로 작동시키는 것으로 변경한다.
    if (this.signup.password && this.signup.password2 && this.isNotPasswordMatch()) {
      console.log(1111111)
      this.errorMessage += '<small class="text-danger">Password is not match</small><br>';
      setTimeout(() => this.isProceeding = false, 1500);
      return false;
    }

    console.log(this.signup);
    // {question: "What was the name of your elementary school?",
    // email: "softcontext@gmail.com",
    // password: "11111", password2: "22222",
    // answer: "some", readTerms: true}

    this.isProceeding = false;
    alert('All green!');
  }

  isNotPasswordMatch() {
    return !(this.signup.password === this.signup.password2);
  }

}
```

**signup.component.scss**

```scss
// 부트스트랩의 폼 엘리먼트 포커스 효과 흉내내기
// .form-control:focus {
//     border-color: rgba(126, 239, 104, 0.8);
//     box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(126, 239, 104, 0.6);
//     outline: 0 none;
// }

.itsok {
  float: right;
  margin-right: 10px;
  margin-top: -25px;
  position: relative;
  z-index: 9999;
  color: blue;
}

// 폼 엘리먼트를 건드렸는데 유효하지 않다면
// 테두리를 빨간색으로 칠해서 부드럽게
// 사용자에게 의미를 전달합니다.
.form-group .ng-touched.ng-invalid {
  border: 1px solid red;
}

.ng-invalid {}

.ng-valid {}

.ng-untouched {}

.ng-touched {}

.ng-pristine {}

.ng-dirty {}
```

브라우저 개발자 모드에서 `Elements` 부분을 확대하고 폼 엘리먼트의 상태가 변할 때 마다 상황에 맞게 정해진 클래스들이 들어가고 삭제되는 것을 확인하시기 바랍니다.

**signup.component.html**

```html
<div class="row">
  <div class="col-md-6 mx-auto">
    <div class="card card-body">
      <h3 class="text-center mb-4">Sign-up</h3>

      <div class="alert alert-warning" *ngIf="errorMessage" [innerHTML]="errorMessage"></div>

      <!--
      If ngModel is used within a form tag, either the name attribute must be set or the form
      control must be defined as 'standalone' in ngModelOptions.

      해결책 2가지
      1. [ngModelOptions]="{standalone: true}" : select 엘리먼트를 체크 대상에서 제외한다.
      2. name="readTerms" : checkbox 엘리먼트에 name 속성을 추가한다.
       -->

      <!-- <form #f="ngForm" (ngSubmit)="f.valid && submit(f)"> -->
      <form #f="ngForm" (ngSubmit)="submit(f)" novalidate>
        <div class="form-group">
          <input class="form-control" placeholder="E-mail Address" name="email" type="text"
            [(ngModel)]="signup.email" #email="ngModel"
            required pattern="\w+@\w+\.\w+">
          <span class="fa fa-check-circle itsok" *ngIf="email.valid"></span>
          <small class="form-text text-muted" *ngIf="email.untouched">
            We'll never share your email with anyone else.</small>
          <small class="form-text text-danger" *ngIf="email.touched && email.errors">
            <ng-template [ngIf]="email.errors.required">Required</ng-template>
            <ng-template [ngIf]="email.errors.pattern">Please enter a valid email</ng-template>
          </small>
        </div>

        <div class="form-group">
          <input class="form-control" placeholder="Password" name="password" type="password"
            [(ngModel)]="signup.password" #password="ngModel"
            required minlength="5" maxlength="20">
          <span class="fa fa-check-circle itsok" *ngIf="password.valid"></span>
          <small class="form-text text-danger" *ngIf="password.touched && password.errors">
            <ng-template [ngIf]="password.errors.required">Required</ng-template>
            <ng-template [ngIf]="password.errors.minlength || password.errors.maxlength">
              Must be 5~20 characters</ng-template>
          </small>
        </div>
        <div class="form-group">
          <input class="form-control" placeholder="Confirm Password" name="password2" type="password"
            [(ngModel)]="signup.password2" #password2="ngModel"
            required minlength="5" maxlength="20">
          <span class="fa fa-check-circle itsok" *ngIf="password2.valid && !isNotPasswordMatch()"></span>
          <ng-template [ngIf]="password2.touched">
            <small class="form-text text-danger">
              <ng-template [ngIf]="password2.errors">
                <ng-template [ngIf]="password2.errors.required">Required</ng-template>
                <ng-template [ngIf]="password2.errors.minlength || password2.errors.maxlength">
                  Must be 5~20 characters</ng-template>
              </ng-template>
              <ng-template [ngIf]="!password2.errors">
                <ng-template [ngIf]="isNotPasswordMatch()">Password is not match</ng-template>
              </ng-template>
            </small>
          </ng-template>
        </div>

        <div class="form-group">
          <!-- 체크 대상에서 제외된다. -->
          <select class="form-control" [(ngModel)]="questionSelected" [ngModelOptions]="{standalone: true}" required>
            <option *ngFor="let q of questions; let i=index" [value]="i">{{q}}</option>
          </select>
        </div>
        <div class="form-group">
          <input class="form-control" placeholder="Security Answer" name="answer" type="text"
            [(ngModel)]="signup.answer" #answer="ngModel"
            required>
          <span class="fa fa-check-circle itsok" *ngIf="answer.valid"></span>
          <small class="form-text text-danger" *ngIf="answer.touched && answer.errors">
            <ng-template [ngIf]="answer.errors.required">Required</ng-template>
          </small>
        </div>

        <div class="form-check mb-3">
          <input class="form-check-input" type="checkbox" id="checkTerms"
            [(ngModel)]="signup.readTerms" name="readTerms" #readTerms="ngModel"
            required>
          <label class="form-check-label small" for="checkTerms">
            I have read and agree to the <a href="#">terms of service</a>
          </label>
          <small class="form-text text-danger" *ngIf="readTerms.touched && readTerms.errors">
            <ng-template [ngIf]="readTerms.errors.required">Required</ng-template>
          </small>
        </div>

        <button class="btn btn-primary btn-block" type="submit" [disabled]="f.invalid">Sign-up</button>
        <button class="btn btn-primary btn-block" type="submit" [disabled]="isProceeding">Sign-up</button>
      </form>

    </div>
  </div>
</div>

<h5 class="mt-4" ngNonBindable>{{f.value}}</h5>
<pre>{{f.value | json}}</pre>

<h5 ngNonBindable>{{f.invalid + ' ' + f.valid}}</h5>
<pre>{{f.invalid + ' ' + f.valid}}</pre>

<h5 ngNonBindable>{{f.untouched + ' ' + f.touched}}</h5>
<pre>{{f.untouched + ' ' + f.touched}}</pre>

<h5 ngNonBindable>{{f.pristine + ' ' + f.dirty}}</h5>
<pre>{{f.pristine + ' ' + f.dirty}}</pre>

<hr>

<h5 ngNonBindable>{{email.value}}</h5>
<pre>{{email.value | json}}</pre>

<h5 ngNonBindable>{{email.invalid + ' ' + email.valid}}</h5>
<pre>{{email.invalid + ' ' + email.valid}}</pre>

<h5 ngNonBindable>{{email.untouched + ' ' + email.touched}}</h5>
<pre>{{email.untouched + ' ' + email.touched}}</pre>

<h5 ngNonBindable>{{email.pristine + ' ' + email.dirty}}</h5>
<pre>{{email.pristine + ' ' + email.dirty}}</pre>
```

`(ngSubmit)="f.valid && submit(f)"`  
폼안의 모든 엘리먼트가 유효할 때만 `submit(f)` 함수를 호출합니다.

`(ngSubmit)="submit(f)"`  
폼안의 엘리먼트가 유효하지 않아도 `submit(f)` 함수를 호출합니다. 함수안에서 에러상태를 확인하고 에러가 있다면 종합적으로 문제점을 사용자에게 통보하는 처리를 수행합니다.

**app.module.ts**

```ts
import { SignupComponent } from './step1/signup/signup.component';
import { SignupComponent as SignupComponent2 } from './step1/signup2/signup.component';
import { SignupComponent as SignupComponent3 } from './step1/signup3/signup.component';

@NgModule({
  declarations: [
    SignupComponent, SignupComponent2, SignupComponent3,
  ],
})
export class AppModule { }
```

**app-routing.module.ts**

```ts
import { SignupComponent } from './step1/signup/signup.component';
import { SignupComponent as SignupComponent2 } from './step1/signup2/signup.component';
import { SignupComponent as SignupComponent3 } from './step1/signup3/signup.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'signup2', component: SignupComponent2 },
  { path: 'signup3', component: SignupComponent3 },
];
```

**header.component.html**

```html
<li class="nav-item dropdown" routerLinkActive="active">
  <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Signup
  </a>
  <div class="dropdown-menu" aria-labelledby="navbarDropdown">
    <a class="dropdown-item" routerLink="signup" routerLinkActive="active">Step 1</a>
    <a class="dropdown-item" routerLink="signup2" routerLinkActive="active">Step 2</a>
    <a class="dropdown-item" routerLink="signup3" routerLinkActive="active">Step 3</a>
  </div>
</li>
```

### Step 4. Custom Validator Directive

앵귤러가 제공하는 밸리데이터로는 부족합니다. 그러므로 개발자가 커스텀 밸리데이터를 작성하고 이를 디렉티브로 설정하여 적용하는 방법을 살펴보겠습니다.

```bash
$ ng g d step1/validator/PasswordRule
```

밸리데이터와 디렉티브를 따로 만들고 디렉티브가 밸리데이터 함수를 사용하는 방식으로 설정해도 되지만 대부분 강결합 관계일 것이므로 한 클래스 안에 모두 작성하도록 합니다.

**password-rule.directive.ts**

```ts
import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

// NG_VALIDATORS:
// InjectionToken을 사용하여 앵귤러의 밸리데이터 콜렉션에 커스텀 밸리데이터를 추가합니다.
@Directive({
  selector: '[passwordRule]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PasswordRuleDirective, multi: true }]
})
export class PasswordRuleDirective implements Validator {
  constructor() {
    console.log('PasswordRuleDirective()');
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.notContainSpecialCharacter(control);
  }

  notContainSpecialCharacter(control: AbstractControl) {
    if (control.value) {
      let isContainSpecialCharacter = /\W+/.test(control.value);
      console.log('isContainSpecialCharacter = ' + isContainSpecialCharacter);
      if (!isContainSpecialCharacter) {
        // 작성규칙에 위반되면 위반정보를 담은 객체를 리턴한다.
        return {
          notContainSpecialCharacter: {
            custom: true,
            regex: '/\W+/'
          }
        };
      }
    }

    // 규칙에 맞게 작성되었다면 null을 리턴한다.
    return null;
  }
}
```

커스텀 밸리데이터 사용 시 편의를 도모하기 위해서는 리턴 객체의 속성명으로 `notContainSpecialCharacter` 대신 디렉티브 별칭인 `passwordRule` 문자열을 사용하는 것이 더 좋겠습니다. 리턴하는 에러정보를 취급하는 객체가 단 하나라만 말이죠. 하지만 리턴 객체안에 `notContainSpecialCharacter` 속성 말고 다른 속성을 추가하여 추가적으로 에러객체를 추가할 수도 있습니다. 사용자가 입력한 패스워드를 평가하는 여러 조건이 있다면 `notContainSpecialCharacter()` 함수 같은 것이 늘어나게 되고 결과적으로 `notContainSpecialCharacter` 속성 하나만 사용하지 않고 추가적으로 다수의 에러 객체를 추가하고 싶어질 수 있습니다.

리턴결과로 `null`을 리턴한다는 의미는 에러정보가 없다는 뜻이므로 `passwordRule` 속성을 설정한 엘리먼트의 데이터가 문제없다는 뜻이 됩니다.

**signup.component.ts**

```ts
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Signup } from '../model/signup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  errorMessage: string = '';
  // Submit 버튼을 누르면 처리가 완료될 때까지
  // 버튼을 비 활성화하기 위한 변수
  isProceeding: boolean = false;
  signup: Signup = new Signup();
  _questionSelected: number = 0;
  questions: string[] = [
    'What was the name of your elementary school?',
    'What is the first name of the person you first kissed?'
  ];

  constructor() {
    console.log('signup4/SignupComponent()');
  }

  ngOnInit() {
    this.signup.question = this.questions[this.questionSelected];
  }

  get questionSelected() {
    return this._questionSelected;
  }

  // Vue.js의 Computed 속성과 비슷하다.
  set questionSelected(index) {
    this._questionSelected = index;
    // this._questionSelected 값이 변경되면 이에 의존하는
    // this.signup.question 값도 변경해야 한다.
    this.signup.question = this.questions[this._questionSelected];
  }

  submit(f: NgForm) {
    this.errorMessage = '';
    this.isProceeding = true;

    console.log(f.value);
    // {email: "softcontext@gmail.com",
    // password: "11111", password2: "22222",
    // answer: "some", readTerms: true}

    console.log(f.controls)
    // {email: FormControl, password: FormControl, password2: FormControl,
    // answer: FormControl, readTerms: FormControl}

    if (f.invalid) {
      if (f.controls.email.errors && f.controls.email.errors.required) {
        this.errorMessage += '<small class="text-primary">Email Required.</small><br>';
      }
      if (f.controls.password.errors) {
        if (f.controls.password.errors.required) {
            this.errorMessage += '<small class="text-success">Passowrd Required.</small><br>';
        }
        if (f.controls.password.errors.minlength || f.controls.password.errors.maxlength) {
            this.errorMessage += '<small class="text-success">Passowrd must be 5~20 characters.</small><br>';
        }
        if (f.controls.password.errors.notContainSpecialCharacter) {
            this.errorMessage += '<small class="text-success">Special Character Required.</small><br>';
        }
      }
      if (f.controls.password2.errors) {
        if (f.controls.password2.errors.required) {
            this.errorMessage += '<small class="text-info">Confirm Passowrd Required.</small><br>';
        }
        if (f.controls.password2.errors.minlength || f.controls.password2.errors.maxlength) {
            this.errorMessage += '<small class="text-info">Confirm Passowrd must be 5~20 characters.</small><br>';
        }
      }
      if (f.controls.answer.errors && f.controls.answer.errors.required) {
        this.errorMessage += '<small class="text-dark">Security Answer Required.</small><br>';
      }
      if (f.controls.readTerms.errors && f.controls.readTerms.errors.required) {
        this.errorMessage += '<small class="text-muted">You must agree to the terms.</small><br>';
      }
      setTimeout(() => this.isProceeding = false, 1500);
      return false;
    }

    // f.valid 속성은 두 패스워드가 달라도 유효로 판단되기 때문에
    // 패스워드 불일치 로직이 작동하지 않는 버그적인 상황이 발생한다.
    // 따라서 이런 로직은 별도로 작동시키는 것으로 변경한다.
    if (this.signup.password && this.signup.password2 && this.isNotPasswordMatch()) {
      console.log(1111111)
      this.errorMessage += '<small class="text-danger">Password is not match</small><br>';
      setTimeout(() => this.isProceeding = false, 1500);
      return false;
    }

    console.log(this.signup);
    // {question: "What was the name of your elementary school?",
    // email: "softcontext@gmail.com",
    // password: "11111", password2: "22222",
    // answer: "some", readTerms: true}

    this.isProceeding = false;
    alert('All green!');
  }

  isNotPasswordMatch() {
    return !(this.signup.password === this.signup.password2);
  }

}
```

**signup.component.scss**

```scss
.itsok {
  float: right;
  margin-right: 10px;
  margin-top: -25px;
  position: relative;
  z-index: 9999;
  color: blue;
}
```

입력 엘리먼트의 데이터가 유효하면 예쁜 아이콘을 표시하고자 합니다.

**signup.component.html**

```html
<div class="row">
  <div class="col-md-6 mx-auto">
    <div class="card card-body">
      <h3 class="text-center mb-4">Sign-up</h3>

      <div class="alert alert-warning" *ngIf="errorMessage" [innerHTML]="errorMessage"></div>

      <!--
      If ngModel is used within a form tag, either the name attribute must be set or the form
      control must be defined as 'standalone' in ngModelOptions.

      해결책 2가지
      1. [ngModelOptions]="{standalone: true}" : select 엘리먼트를 체크 대상에서 제외한다.
      2. name="readTerms" : checkbox 엘리먼트에 name 속성을 추가한다.
       -->

      <!-- <form #f="ngForm" (ngSubmit)="f.valid && submit(f)"> -->
      <form #f="ngForm" (ngSubmit)="submit(f)" novalidate>
        <div class="form-group">
          <input class="form-control" placeholder="E-mail Address" name="email" type="text"
            [(ngModel)]="signup.email" #email="ngModel"
            required pattern="\w+@\w+\.\w+">
          <span class="fa fa-check-circle itsok" *ngIf="email.valid"></span>
          <small class="form-text text-muted" *ngIf="email.untouched">
            We'll never share your email with anyone else.</small>
          <small class="form-text text-danger" *ngIf="email.touched && email.errors">
            <ng-template [ngIf]="email.errors.required">Required</ng-template>
            <ng-template [ngIf]="email.errors.pattern">Please enter a valid email</ng-template>
          </small>
        </div>

        <div class="form-group">
          <input class="form-control" placeholder="Password" name="password" type="password"
            [(ngModel)]="signup.password" #password="ngModel"
            required minlength="5" maxlength="20" passwordRule>
          <span class="fa fa-check-circle itsok" *ngIf="password.valid"></span>
          <small class="form-text text-danger" *ngIf="password.touched && password.errors">
            <ng-template [ngIf]="password.errors.required">Required</ng-template>
            <ng-template [ngIf]="password.errors.minlength || password.errors.maxlength">
              Must be 5~20 characters</ng-template>
          </small>
          <small class="form-text text-primary" *ngIf="password.touched && password.errors">
            <ng-template [ngIf]="password.errors.notContainSpecialCharacter">
              Special Character Required</ng-template>
          </small>
        </div>
        <div class="form-group">
          <input class="form-control" placeholder="Confirm Password" name="password2" type="password"
            [(ngModel)]="signup.password2" #password2="ngModel"
            required minlength="5" maxlength="20">
          <span class="fa fa-check-circle itsok" *ngIf="password2.valid && !isNotPasswordMatch()"></span>
          <ng-template [ngIf]="password2.touched">
            <small class="form-text text-danger">
              <ng-template [ngIf]="password2.errors">
                <ng-template [ngIf]="password2.errors.required">Required</ng-template>
                <ng-template [ngIf]="password2.errors.minlength || password2.errors.maxlength">
                  Must be 5~20 characters</ng-template>
              </ng-template>
              <ng-template [ngIf]="!password2.errors">
                <ng-template [ngIf]="isNotPasswordMatch()">Password is not match</ng-template>
              </ng-template>
            </small>
          </ng-template>
        </div>

        <div class="form-group">
          <!-- 체크 대상에서 제외된다. -->
          <select class="form-control" [(ngModel)]="questionSelected" [ngModelOptions]="{standalone: true}" required>
            <option *ngFor="let q of questions; let i=index" [value]="i">{{q}}</option>
          </select>
        </div>
        <div class="form-group">
          <input class="form-control" placeholder="Security Answer" name="answer" type="text"
            [(ngModel)]="signup.answer" #answer="ngModel"
            required>
          <span class="fa fa-check-circle itsok" *ngIf="answer.valid"></span>
          <small class="form-text text-danger" *ngIf="answer.touched && answer.errors">
            <ng-template [ngIf]="answer.errors.required">Required</ng-template>
          </small>
        </div>

        <div class="form-check mb-3">
          <input class="form-check-input" type="checkbox" id="checkTerms"
            [(ngModel)]="signup.readTerms" name="readTerms" #readTerms="ngModel"
            required>
          <label class="form-check-label small" for="checkTerms">
            I have read and agree to the <a href="#">terms of service</a>
          </label>
          <small class="form-text text-danger" *ngIf="readTerms.touched && readTerms.errors">
            <ng-template [ngIf]="readTerms.errors.required">Required</ng-template>
          </small>
        </div>

        <button class="btn btn-primary btn-block" type="submit" [disabled]="f.invalid">Sign-up</button>
        <button class="btn btn-primary btn-block" type="submit" [disabled]="isProceeding">Sign-up</button>
      </form>

    </div>
  </div>
</div>

<h5 class="mt-4" ngNonBindable>{{password.value}}</h5>
<pre>{{password.value | json}}</pre>

<h5 ngNonBindable>{{password.errors}}</h5>
<pre>{{password.errors | json}}</pre>
```

**app.module.ts**

```ts
import { SignupComponent } from './step1/signup/signup.component';
import { SignupComponent as SignupComponent2 } from './step1/signup2/signup.component';
import { SignupComponent as SignupComponent3 } from './step1/signup3/signup.component';
import { SignupComponent as SignupComponent4 } from './step1/signup4/signup.component';
import { PasswordRuleDirective } from './step1/validator/password-rule.directive';

@NgModule({
  declarations: [
    SignupComponent, SignupComponent2, SignupComponent3,
    PasswordRuleDirective, SignupComponent4
  ],
})
```

**app-routing.module.ts**

```ts
import { SignupComponent } from './step1/signup/signup.component';
import { SignupComponent as SignupComponent2 } from './step1/signup2/signup.component';
import { SignupComponent as SignupComponent3 } from './step1/signup3/signup.component';
import { SignupComponent as SignupComponent4 } from './step1/signup4/signup.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'signup2', component: SignupComponent2 },
  { path: 'signup3', component: SignupComponent3 },
  { path: 'signup4', component: SignupComponent4 },
];
```

**header.component.html**

```html
<li class="nav-item dropdown" routerLinkActive="active">
  <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Signup
  </a>
  <div class="dropdown-menu" aria-labelledby="navbarDropdown">
    <a class="dropdown-item" routerLink="signup" routerLinkActive="active">Step 1</a>
    <a class="dropdown-item" routerLink="signup2" routerLinkActive="active">Step 2</a>
    <a class="dropdown-item" routerLink="signup3" routerLinkActive="active">Step 3</a>
    <a class="dropdown-item" routerLink="signup4" routerLinkActive="active">Step 4</a>
  </div>
</li>
```

## Reactive Forms

`Template Driven Forms` 방식은 가볍게 처리할 때는 적은 코드로 처리할 수 있으므로 유리합니다. 하지만 앞서서 다뤄본 것처럼 유효성 체크를 적용하게 되면 복잡하게 되는 것은 피할 수 없게 됩니다. 차라리 처음부터 체계적으로 관리체계를 잡고 적용한다면 복잡한 것은 어쩔 수 없으나 가독성 부분은 향상시킬 수 있게 됩니다. 이런 이유에서 `Reactive Forms` 방식의 기술을 권장합니다.

**app.module.ts**

```ts
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
```

`Reactive Forms` 방식의 기술을 사용하기 위해서 `ReactiveFormsModule` 모듈 임포트가 필요합니다. 이 모듈을 임포트 하지 않으면 `FormGroup`, `FormControl` 등이 처리되지 못 합니다.

```bash
$ ng g class step2/model/ContactRequest
$ ng g class step2/model/PersonalData
```

```bash
$ ng g c step2/contact
```

유틸리티 라이브러리인 `lodash`를 사용해 보기 위해서 설치합니다.

```bash
$ npm i lodash
$ npm i @types/lodash --save-dev
```

커스텀 밸리데이터 작성을 위해 클래스를 생성합니다.

```bash
$ ng g class step2/validator/emailRule
```

**email-rule.ts**

```ts
import { Validator, AbstractControl, ValidationErrors } from '@angular/forms';

export function validEmail(control: AbstractControl): ValidationErrors | null {
  var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (control.value) {
    if (!regex.test(control.value.toLowerCase())) {
      // 작성규칙에 위반되면 위반정보를 담은 객체를 리턴한다.
      return {
        validEmail: {
          isError: true,
          text: 'Email Syntax Error'
        }
      };
    }
  }

  // 규칙에 맞게 작성되었다면 null을 리턴한다.
  return null;
}

// Validator 인터페이스를 구현한 클래스 문법으로 작성하면
// 'new EmailRule().validate' 코드처럼 사용해야하기 때문에 불편합니다.
// 위 validEmail 함수를 직접 사용하는 것이 더 편리합니다.
export class EmailRule implements Validator {
  constructor() {
    console.log('EmailRule() as Validator');
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return validEmail(control);
  }
}
```

앵귤러가 인정하는 `Validator` 함수가 되기 위해서 굳이 `Validator` 인터페이스를 구현한 클래스를 만들어야 하는 것은 아닙니다. 함수의 파라미터와 리턴타입만 규칙을 따라주면 함수를 커스텀 밸리데이터로 사용할 수 있습니다.

**contact-request.ts**

```ts
import { PersonalData } from './personal-data';

export class ContactRequest {
  personalData: PersonalData;
  requestType: any = '';
  text: string = '';
}
```

**personal-data.ts**

```ts
export class PersonalData {
  email: string = '';
  mobile: string = '';
  country: string = '';
}
```

취급하는 데이터를 모은 객체의 구조는 다음과 같습니다.

```json
{
  "personalData": {
    "email": "",
    "mobile": "",
    "country": ""
  },
  "requestType": "",
  "text": ""
}
```

**index.d.ts**

```ts
export * from './contact-request';
export * from './personal-data';
```

이 파일은 일종의 편의성 때문에 존재합니다. `ContactRequest`, `PersonalData` 클래스를 사용하는 측에서 `index.d.ts` 파일을 임포트함으로써 두 클래스를 사용할 수 있게 됩니다.

**contact.component.ts**

```ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
// index.ts, index.d.ts 파일은 생략이 가능합니다.
import { PersonalData, ContactRequest } from '../model/';
import { cloneDeep } from 'lodash/fp';
import { EmailRule, validEmail } from '../validator/email-rule';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  countries: string[] = ['Korea', 'USA', 'Germany', 'Italy', 'France'];
  requestTypes: string[] = ['Claim', 'Feedback', 'Help Request'];
  contactForm: FormGroup;
  initValue: ContactRequest;

  constructor(private formBuilder: FormBuilder) {
    // this.contactForm = this.createFormGroup();

    // 위 방법보다 아래 방법을 권장합니다.
    this.contactForm = this.createFormGroupWithBuilder();

    // 초기값으로 리셋하기 위해서 저장해 놓는다.
    this.initValue = this.contactForm.value;
  }

  ngOnInit() { }

  createFormGroup() {
    // ContactRequest 구조대로 FormGroup, FormControl을 구성한다.
    // class ContactRequest에 대응하는 FormGroup을 만든다.
    return new FormGroup({
      // class PersonalData에 대응하는 FormGroup을 만든다.
      personalData: new FormGroup({
        // 입력 엘리먼트에 대응하는 FormControl을 만든다.
        // 파라미터 #1 = formState: any = null,
        // 파라미터 #2 = validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions,
        email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(5),
          // new EmailRule().validate,
          validEmail
        ])),
        mobile: new FormControl('', Validators.required),
        country: new FormControl('Korea')
      }),
      // 입력 엘리먼트에 대응하는 FormControl을 만든다.
      requestType: new FormControl('Feedback'),
      text: new FormControl("It's very good!", Validators.required)
    });
  }

  createFormGroupWithBuilder() {
    // FormBuilder를 사용하면 FormGroup, FormControl 선언을 생략하고
    // 사용할 수 있어서 편리하다.
    // 객체 리터럴 대신 new PersonalData() 처럼 처리할 수 있으나
    // 그렇게 되면 초기 값은 없는 빈 객체가 된다.
    // 초기 값을 명시적으로 할당하는 것이 좋으므로 객체 리터럴로
    // 작성하는 것을 권장합니다.
    return this.formBuilder
      .group({
        personalData: this.formBuilder
          .group({
            email: ['', Validators.compose([
              Validators.required,
              Validators.minLength(5),
              // new EmailRule().validate,
              validEmail
            ])],
            mobile: ['', Validators.required],
            country: 'Korea'
          }),
        requestType: 'Feedback',
        text: ["It's very good!", Validators.required]
      });
  }

  onSubmit() {
    console.log(this.contactForm);

    // Object.assign() 함수는 Shallow Copy 함수:
    // 열거할 수 있는 Source 객체의 속성들만 Target 객체로 복사 됩니다.
    // 속성의 값을 복사하므로 Source 객체의 속성값이 객체에 대한 참조 값이면 참조를 복사합니다.
    // 따라서 깊은 복사는 다른 방법을 사용해야 합니다.
    // const result: ContactRequest = Object.assign({}, this.contactForm.value);
    // 깊은 복사를 위해서 수동적으로 다음 코드를 추가해야 합니다.
    // result.personalData = Object.assign({}, result.personalData);

    // 대체 방법으로 lodash의 cloneDeep() 함수로 깊은 복사를 할 수 있습니다.
    const result: ContactRequest = cloneDeep(this.contactForm.value);
    console.log(result === this.contactForm.value); // false

    // TODO: 데이터를 원격서버로 전송하는 로직과 연동한다.
    console.log(JSON.stringify(result));
    // 결과 예:
    // {
    //   "personalData":{
    //     "email":"softcontext@gmail.com",
    //     "mobile":"11",
    //     "country":"Korea"
    //   },
    //   "requestType":"Feedback",
    //   "text":"It's very good!"
    // }
  }

  revert() {
    // Reactive Forms 방식을 사용하면
    // reset() 함수를 사용하여 쉽게 초기 상태로 되돌릴 수 있습니다.
    this.contactForm.reset(this.initValue);
  }

  // 폼 컨트롤에 쉽게 접근하기 위한 편의성 메소드
  get C() { return this.contactForm.controls; }

  get P() { return this.contactForm.get('personalData')['controls']; }
}
```

**contact.component.html**

```html
<!-- class ContactRequest에 대응하는 FormGroup과 연동하기 위해서 formGroup을 설정한다. -->
<form [formGroup]="contactForm" (ngSubmit)="contactForm.valid && onSubmit()" novalidate>
  <!-- class PersonalData에 대응하는 FormGroup과 연동하기 위해서 formGroupName을 설정한다. -->
  <div formGroupName="personalData" novalidate>
    <div class="form-group">
      <label for="email">Email address</label>
      <!-- 입력 엘리먼트에 대응하는 FormControl과 연동하기 위해서 formControlName을 설정한다. -->
      <input formControlName="email" type="email" class="form-control" id="email"
        aria-describedby="emailHelp" placeholder="Enter email">
      <small id="emailHelp" class="form-text text-muted" *ngIf="P.email.untouched">
        We'll never share your email with anyone else.</small>
      <small id="emailHelp" class="form-text text-muted" *ngIf="P.email.touched && P.email.errors">
        <ng-template [ngIf]="P.email.errors.required"> Email is required.</ng-template>
        <ng-template [ngIf]="P.email.errors.minlength"> Email must be at least 5.</ng-template>
        <ng-template [ngIf]="P.email.errors.validEmail"> Email has a syntax error.</ng-template>
      </small>
    </div>

    <div class="form-group">
      <label for="mobile">Mobile</label>
      <input formControlName="mobile" type="tel" class="form-control" id="mobile" placeholder="Mobile">
      <small id="emailHelp" class="form-text text-muted" *ngIf="P.mobile.touched && P.mobile.errors">
        <ng-template [ngIf]="P.mobile.errors.required"> Mobile is required.</ng-template>
      </small>
    </div>

    <div class="form-group">
      <label for="country">Country</label>
      <select formControlName="country" class="form-control" id="country">
        <option *ngFor="let country of countries" [value]="country">{{country}}</option>
      </select>
    </div>
  </div>

  <div class="form-group">
    <label for="requestType">Request Type</label>
    <select formControlName="requestType" class="form-control" id="requestType">
      <option *ngFor="let requestType of requestTypes" [value]="requestType">{{requestType}}</option>
    </select>
  </div>

  <div class="form-group">
    <label for="text">Text</label>
    <textarea formControlName="text" class="form-control" id="text" rows="3"></textarea>
    <small id="emailHelp" class="form-text text-muted" *ngIf="C.text.touched && C.text.errors">
      <ng-template [ngIf]="C.text.errors.required"> Text is required.</ng-template>
    </small>
  </div>

  <button type="reset" (click)="revert()" [disabled]="contactForm.pristine" class="btn btn-warning mr-2">Revert</button>
  <button type="submit" [disabled]="contactForm.invalid" class="btn btn-primary text-uppercase">Save</button>
</form>

<h5 class="mt-4">contactForm.value</h5>
<pre>{{contactForm.value | json}}</pre>

<h5 ngNonBindable>contactForm.controls.personalData.controls.email.errors</h5>
<pre>#1 : {{contactForm.controls.personalData.controls.email.errors | json}}</pre>
<pre>#2 : {{contactForm.get('personalData').get('email').errors | json}}</pre>
<pre>#3 : {{C.personalData.controls.email.errors | json}}</pre>
<pre>#4 : {{P.email.errors | json}}</pre>

<h5 ngNonBindable>contactForm.controls.personalData.controls.mobile.errors</h5>
<pre>{{P.mobile.errors | json}}</pre>

<h5 ngNonBindable>contactForm.controls.personalData.controls.country.errors</h5>
<pre>{{P.country.errors | json}}</pre>

<h5 ngNonBindable>contactForm.controls.requestType.errors</h5>
<pre>{{C.requestType.errors | json}}</pre>

<h5 ngNonBindable>contactForm.controls.text.errors</h5>
<pre>{{C.text.errors | json}}</pre>
```

**app-routing.module.ts**

```ts
import { ContactComponent } from './step2/contact/contact.component';

const routes: Routes = [
  { path: 'contact', component: ContactComponent },
];
```

**header.component.html**

```html
<li class="nav-item" routerLinkActive="active">
  <a class="nav-link" routerLink="contact">Contact</a>
</li>
```

커스텀 밸리데이터를 모아서 서비스로 제공하는 것도 좋은 방법이라고 생각됩니다. 과제 겸 삼고, 다음 사이트를 참고해서 직접 작업해 보세요.

`https://coryrylan.com/blog/angular-form-builder-and-validation-management`

```ts
export class ValidationService {
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config = {
      'required': 'Required',
      'invalidCreditCard': 'Is invalid credit card number',
      'invalidEmailAddress': 'Invalid email address',
      'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
      'minlength': `Minimum length ${validatorValue.requiredLength}`
    };

    return config[validatorName];
  }

  static creditCardValidator(control) {
    // Visa, MasterCard, American Express, Diners Club, Discover, JCB
    if (control.value.match(
    /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
      return null;
    } else {
      return { 'invalidCreditCard': true };
    }
  }

  static emailValidator(control) {
    // RFC 2822 compliant regex
    if (control.value.match(
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return { 'invalidEmailAddress': true };
    }
  }

  static passwordValidator(control) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return null;
    } else {
      return { 'invalidPassword': true };
    }
  }
}
```
