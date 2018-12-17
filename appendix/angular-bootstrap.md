# Angular with Bootstrap

## Ways to Integrate Bootstrap 4 with Angular

### 1. Configuration with CDN  

`src/index.html` 파일에 부트스트랩 스타일 및 스크립트 라이브러리를 임포트합니다.  

```html
<link rel="stylesheet" 
href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" 
integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" 
crossorigin="anonymous">

<script 
src="https://code.jquery.com/jquery-3.3.1.slim.min.js" 
integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" 
crossorigin="anonymous"></script>
<script 
src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" 
integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" 
crossorigin="anonymous"></script>
<script 
src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" 
integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" 
crossorigin="anonymous"></script>
```

### 2. Configuration with `angular.json`  

NPM 패키지 매니저로 부트스트랩 스타일 및 스크립트 라이브러리를 다운로드합니다.   

`$ npm i jquery popper.js bootstrap`

`angular.json` 파일에 부트스트랩 스타일 및 스크립트 라이브러리를 설정합니다.  Angular CLI 6 부터 `angular-cli.json` 파일 대신 `angular.json` 파일을 설정파일로 사용하는 것으로 변경되었습니다.
  
```json
"styles": [
  "./node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles.css"
],
"scripts": [
  "./node_modules/jquery/dist/jquery.slim.min.js",
  "./node_modules/popper.js/dist/umd/popper.min.js",
  "./node_modules/bootstrap/dist/js/bootstrap.min.js"
]
```

### 3. Configuration with `angular.json` and `styles.css`

NPM 패키지 매니저로 부트스트랩 스타일 및 스크립트 라이브러리를 다운로드합니다.   

`$ npm i jquery popper.js bootstrap`

`styles.css` 파일에 부트스트랩 스타일 라이브러리를 설정합니다.  

```css
@import "~bootstrap/dist/css/bootstrap.min.css";
```

`angular.json` 파일에 부트스트랩 스타일 및 스크립트 라이브러리를 설정합니다.  

```json
"scripts": [
  "./node_modules/jquery/dist/jquery.slim.min.js",
  "./node_modules/popper.js/dist/umd/popper.min.js",
  "./node_modules/bootstrap/dist/js/bootstrap.min.js"
]
```

### 4. Using `@ng-bootstrap`

`@ng-bootstrap`는 부트스트랩 CSS 스타일을 위한 앵귤러 컴포넌트 라이브러이입니다. 이것을 사용하면 jQuery 및 부트스트랩 자바스크립트 코드를 위한 디펜던시는 필요하지 않게 됩니다.

`npm i @ng-bootstrap/ng-bootstrap`

자세한 사항은 다음 사이트를 참조하세요.

`https://ng-bootstrap.github.io/#/getting-started`

# 연습 프로젝트 생성

```bash
$ ng new my-angular-bootstrap --minimal=true --skipTests=true
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? SCSS
```

```bash
$ cd my-angular-bootstrap
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

## Styling Angular Components with Bootstrap 4

네비게이션을 위한 엘리먼트 설정이 조금 복잡하니 별도의 `app.component.html` 파일을 사용하기 위해서 직접 생성합니다.

**app.component.ts**

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [
    `
    .container-fluid {
      padding: 40px;
    }
    `
  ]
})
export class AppComponent {

}
```

**app.component.html**

```html
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  
  <a class="navbar-brand" routerLink="/">Angular Logo</a>
  
  <button class="navbar-toggler" type="button" data-toggle="collapse" 
    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
    aria-expanded="false" aria-label="Toggle navigation">
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
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" 
          role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Actions
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" [routerLink]="'/accounts'"> Accounts </a>
          <a class="dropdown-item" [routerLink]="'/create-account'"> Create Account </a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" [routerLink]="'/contact-list'" 
            routerLinkActive="active"> Contacts </a>
          <a class="dropdown-item" [routerLink]="'/create-contact'"> Create Contact </a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" [routerLink]="'/leads'"> Leads </a>
          <a class="dropdown-item" [routerLink]="'/create-lead'"> Create Lead </a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" [routerLink]="'/opportunities'"> Opportunities </a>
          <a class="dropdown-item" [routerLink]="'/create-opportunity'"> Create Opportunity </a>
        </div>
      </li>
    </ul>
  </div>
  
</nav>

<div class="container-fluid">
  <router-outlet></router-outlet>
</div>
```

`$ ng g c home`

`$ ng g c contact-list`

**contact-list.component.ts**

```ts
import { Component, OnInit } from '@angular/core';

export interface Contact {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
}

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  contacts: Array<Contact> = [
    { firstName: 'John', lastName: 'Doe', phone: '1234', 
      email: 'john@doe.com', address: 'Seoul' },
    { firstName: 'John', lastName: 'Doe', phone: '1234', 
      email: 'john@doe.com', address: 'Seoul' },
    { firstName: 'John', lastName: 'Doe', phone: '1234', 
      email: 'john@doe.com', address: 'Seoul' },
    { firstName: 'John', lastName: 'Doe', phone: '1234', 
      email: 'john@doe.com', address: 'Seoul' },
    { firstName: 'John', lastName: 'Doe', phone: '1234', 
      email: 'john@doe.com', address: 'Seoul' },
  ];

  constructor() { }

  ngOnInit() { }

}
```

**contact-list.component.html**

```html
<h2>My Contacts</h2>
<p>My Contacts Information</p>
<div>
  <table class="table">
    <thead>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Phone</th>
        <th>Email</th>
        <th>Address</th>
      </tr>
    </thead>
    <tr *ngFor="let contact of contacts">
      <td>{{contact.firstName}}</td>
      <td>{{contact.lastName}}</td>
      <td>{{contact.phone}}</td>
      <td>{{contact.email}}</td>
      <td>{{contact.address}}</td>
    </tr>
  </table>
</div>
```

**app-routing.module.ts**

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ContactListComponent } from './contact-list/contact-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'contact-list', component: ContactListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

`$ ng serve -o`
