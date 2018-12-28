# HTTP Service

앵귤러는 클라이언트 사이드에서 동작하는 자바스크립트 프레임워크입니다. 일반적으로 데이터는 서버 사이드에서 관리됩니다. 따라서 앵귤러는 원격 서버에 접속하여 데이터를 받은 후 이를 화면에 표시하는 일을 수행해야 합니다. 앵귤러와 서버는 JSON 포맷의 문자열로 데이터를 주고 받습니다. 서버 측에 URI Handler는 Restful 방식으로 설계하기 때문에 실제로 클라이언트의 기기가 무엇인지 어떤 기술을 사용하는지와는 상관이 없습니다. 마찬가지로 앵귤러 또한 서버가 어떤 기기인지 무슨 기술로 구축된 것인지와 상관이 없습니다. 중요한 것은 HTTP 통신규약에 따라 대화한다는 것이며 실제로 데이터를 주고 받을 때 사용하는 포맷은 JSON이라는 점 입니다.

# 예제 프로젝트

```bash
$ ng new my-http
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? SCSS   [ http://sass-lang.com   ]
```

```bash
$ cd my-http
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

$ ng g c kpop
$ ng g s kpop/kpop-http

$ ng g c emp
$ ng g s emp/emp-http
```

**app.module.ts**

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './layout/header/header.component';
import { KpopComponent } from './kpop/kpop.component';
import { EmpComponent } from './emp/emp.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    KpopComponent,
    EmpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

`HttpClientModule` 모듈을 임포트하면 앵귤러가 제공하는 HTTP 연동기술을 사용할 수 있습니다.  
`https://angular.io/guide/http`

`ngModel` 양방향 바인딩을 사용하기 위해서 `FormsModule` 모듈의 임포트가 필요합니다.

**app-routing.module.ts**

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KpopComponent } from './kpop/kpop.component';
import { EmpComponent } from './emp/emp.component';

const routes: Routes = [
  { path: '', redirectTo: 'kpop', pathMatch: 'full' },
  { path: 'kpop', component: KpopComponent },
  { path: 'emp', component: EmpComponent },
  { path: '**', component: KpopComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

**header.component.html**

```html
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">

  <a class="navbar-brand" routerLink="/">Angular HTTP</a>

  <button class="navbar-toggler" type="button" data-toggle="collapse"
    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
    aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item" routerLinkActive="active">
        <a class="nav-link" routerLink="/kpop">
          Kpop <span class="sr-only">(current)</span>
        </a>
      </li>
      <li class="nav-item" routerLinkActive="active">
        <a class="nav-link" routerLink="/emp">Employee</a>
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

기본적인 화면구성을 완료했습니다. 브라우저로 결과를 확인하세요.

```bash
$ ng serve -o
```

인기있는 HTTP 연동기술인 axios를 사용해 보겠습니다. 디펜던시 추가가 필요합니다.

```bash
$ npm i axios
```

노드도 업그레이드가 빠르고 앵귤러 또한 6개월 마다 새 버전이 출시될 정도로 변화가 심합니다. 따라서 정확한 버전을 기록으로 남길 필요가 있습니다.

**package.json**

```json
{
  "name": "my-http",
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
    "axios": "^0.18.0",
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

## JSON 파일에서 데이터 가져오기

때로는 데이터가 고정적일 때까 있습니다. 남녀 구분이나 생년월일 정보를 화면에 표시해야 하는 경우는 정말 많습니다. 이러한 데이터는 잘 변하지 않죠. 이러한 정보를 확장자가 `.json` 파일에 저장해서 제공하기로 했다고 가정해 보죠. 이 경우에는 파일로부터 데이터를 꺼내서 사용하면 되겠습니다.

먼저 취급하는 데이터를 명시하는 용도의 클래스를 생성합니다. 더불어서 이 클래스의 `deserialize()` 함수는 자료형이 없는 객체를 자료형이 있는 객체로 변경하고자 할 때 사용하고자 만들었습니다.

```bash
$ ng g class kpop/kpop
```

**kpop.ts**

```ts
interface Serializable<T> {
  deserialize(input: object): T;
}

export class Kpop implements Serializable<Kpop>{
  id: number;
  name: string;
  image: string;

  deserialize(input): Kpop {
    this.id = input.id;
    this.name = input.name;
    this.image = input.image;

    return this;
  }
}
```

다음으로 서비스를 작성합니다. 이 서비스가 `.json` 파일로부터 데이터를 구하는 역할을 수행할 것 입니다. 간단히 JSON 문자열을 갖고 있는 파일을 `assets` 폴더 밑에 배치합니다.

**src/assets/server/kpop.json**

```json
{
  "idols": [{
      "id": 1,
      "name": "Apink",
      "image": "apink.jpg"
    },
    {
      "id": 2,
      "name": "Blackpink",
      "image": "blackpink.jpg"
    },
    {
      "id": 3,
      "name": "IZONE",
      "image": "izone.jpg"
    }
  ]
}
```

이미지가 3장 필요합니다. 이미지를 구해서 `assets/image` 폴더 밑에 배치합니다. 이미지 파일명은 위 정보를 보시고 일치되게 작성해 주십시오.

**kpop-http.service.ts**

```ts
import { Injectable } from '@angular/core';
import { Kpop } from './kpop';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class KpopHttpService {
  configUrl = './assets/server/kpop.json';

  constructor(private http: HttpClient) { }

  // http.get 함수는 JSON 문자열을 받아서 객체상태로 바꾼 후
  // 콜백함수의 파라미터 res에 전달한다.
  // 단순히, JSON.parse('JSON 문자열') 처리가 된 상태이다.
  getIdols(): Promise<Kpop[]> {
    return this.http.get(this.configUrl)
      .pipe(map(res => {
        // 배열을 객체가 감싸고 있다. 단순히 객체를 벗기기 위해서
        // 자료형 클래스를 도입하는 것은 마음에 들지 않으므로
        // 간단히 Type Assertion 으로 처리한다.
        let idolsNoType = (<any>res).idols;

        // 배열 객체인 상태이긴 하지만 배열 요소에 타입이 없는 상태다.
        console.log(idolsNoType); // [{…}, {…}, {…}]

        // 타입이 없는 객체를 타입이 있는 객체로 변경한다.
        // https://stackoverflow.com/a/22886730/6103920
        // 타입이 없는 상태로 사용하는 것은 TS 답지 않다고 할 수 있다.
        let idolsWithType: Kpop[] = [];
        for (let i = 0; i < idolsNoType.length; i++) {
          idolsWithType.push(new Kpop().deserialize(idolsNoType[i]));
        }
        // 이제 타입이 있는 객체를 요소로 가지는 배열을 얻었다.
        console.log(idolsWithType); // [Kpop, Kpop, Kpop]

        return idolsWithType;
      }))
      .toPromise();
  }

}
```

`toPromise()` 함수를 추가하면 Observable 객체를 프라미스 객체로 변경할 수 있습니다. 원하는 형태의 객체를 선택해서 사용하시면 됩니다.

**kpop.component.ts**

```ts
import { Component, OnInit } from '@angular/core';
import { KpopHttpService } from './kpop-http.service';
import { Kpop } from './kpop';

@Component({
  selector: 'app-kpop',
  templateUrl: './kpop.component.html',
  styleUrls: ['./kpop.component.scss']
})
export class KpopComponent implements OnInit {
  idols: Kpop[];

  constructor(private kpopHttpService: KpopHttpService) { }

  ngOnInit() {
    this.kpopHttpService.getIdols()
      .then(idols => {
        this.idols = idols;
      });
  }

}
```

**kpop.component.html**

```html
<h3 class="mb-4">Kpop Idols</h3>

<div class="row">
  <div class="col-md-3" *ngFor="let idol of idols; let i=index">
    <div class="card">
      <div class="card-body">
        <img class="img-thumbnail mx-auto d-block mb-1" src="./assets/image/{{idol.image}}">
        <h5 class="card-title">{{idol.name}}</h5>
        <p class="card-text">Some quick example text to build on the card title.</p>
        <div class="row">
          <div class="col">
            <a href="#" class="card-link">Some</a>
          </div>
          <div class="col text-right">
            <a href="#" class="card-link">Another</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

화면을 확인합니다.

### `async` Pipe

`async` 파이프를 사용해 보겠습니다. 이를 위해서 클래스가 프라미스나 옵저버블 객체를 취급하는 변수가 필요합니다. 다음 코드를 추가합니다. 차이점이 무엇인지 코드를 살펴보세요.

**kpop.component.ts**

```ts
idolsPromise: Promise<Kpop[]>;

ngOnInit() {
  this.idolsPromise = this.kpopHttpService.getIdols();
}
```

**kpop.component.html**

```html
<hr>

<div class="row">
  <div class="col-md-3" *ngFor="let idol of idolsPromise | async; let i=index">
    <div class="card">
      <img class="card-img-top" src="./assets/image/{{idol.image}}">
      <div class="card-body">
        <h5 class="card-title">{{idol.name}}</h5>
        <p class="card-text">Some quick example text to build on the card title.</p>
        <a href="#" class="btn btn-primary btn-sm">Go somewhere</a>
      </div>
    </div>
  </div>
</div>
```

`*ngFor` 부분에 코드를 보세요. 프라미스를 취급하는 `idolsPromise` 변수를 `async` 파이프와 함께 설정했습니다. 앞서서 처리하는 방식과 결과는 같습니다. 개발자가 작성하는 클래스의 코드가 조금 짧아지는 정도에 효과가 있습니다.

## 원격 서버로부터 데이터 받아오기

이번에는 원격 서버를 구축한 다음 앵귤러와 원격서버가 대화하는 방법을 살펴보겠습니다. 원격 서버 구축기술로는 어떤 것이든 상관이 없습니다. HTTP 통신을 지원하고 JSON 포맷의 문자열로 데이터를 주고 받을 수 있다면 말이죠.

### 테스트를 위한 Fake Server 구축

제대로 원격 서버 프로그램을 구성하기 위해서는 상당한 시간이 필요합니다. 그래서 빠르게 원격 서버 역할을 수행하는 테스트 용도의 기술을 소개하고자 합니다.

```bash
$ npm i -g json-server
```

`json-server` 기술의 설명은 다음 사이트를 참고하세요.  
`https://www.npmjs.com/package/json-server`

적당한 위치에 `fake-serever` 라는 폴더를 만들고 그 밑으로 `db.json` 파일을 생성합니다.

**db.json**

```json
{
  "posts": [
    { "id": 1, "title": "json-server", "author": "typicode" }
  ],
  "comments": [
    { "id": 1, "body": "some comment", "postId": 1 }
  ],
  "profile": { "name": "typicode" },
  "employees": [
    { "id": 1, "firstName": "Denzel", "lastName": "Washington" },
    { "id": 2, "firstName": "Johnny", "lastName": "Depp" },
    { "id": 3, "firstName": "Hugh", "lastName": "Jackman" },
    { "id": 4, "firstName": "Tom", "lastName": "Cruise" },
    { "id": 5, "firstName": "Chris", "lastName": "Pine" }
  ]
}
```

`.json` 확장자의 파일 내용은 자바스크립트 컴파일러가 처리하는 것이 아니므로 데이터 선언 시 주의가 필요합니다. 프로퍼티 키에 쌍따옴표를 생략할 수 없습니다. 값으로는 number, string, boolean 등이 가능하며 객체는 `{}` 중괄호로 배열은 `[]` 대괄호로 표시합니다.

```bash
$ json-server --watch db.json

  \{^_^}/ hi!

  Loading db.json
  Done

  Resources
  http://localhost:3000/posts
  http://localhost:3000/comments
  http://localhost:3000/profile
  http://localhost:3000/employees

  Home
  http://localhost:3000

  Type s + enter at any time to create a snapshot of the database
  Watching...
```

`http://localhost:3000/employees` 주소로 접속해 봅니다. 이 주소를 개발 시 사용할 것 입니다.

콘솔에서 `s + enter` 키를 눌러서 스냅샷 파일을 하나 만들어 둡니다. 수정, 삭제 테스트 시 실제 파일의 내용이 바뀝니다. 스냅샷 파일은 초기화할 때 도움이 됩니다.

### 클라이언트 사이드 개발

원격 서버는 준비가 되었으니 다음으로 클라이언트 사이드 개발을 진행합니다.

```bash
$ ng g class emp/employee
```

**employee.ts**

```ts
interface Serializable<T> {
  deserialize(input: object): T;
}

export class Employee implements Serializable<Employee>{
  id: number;
  firstName: string;
  lastName: string;

  deserialize(input): Employee {
    this.id = input.id;
    this.firstName = input.firstName;
    this.lastName = input.lastName;

    return this;
  }
}
```

**emp-http.service.ts**

```ts
import { Injectable } from '@angular/core';
import axios from 'axios';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmpHttpService {
  URL = 'http://localhost:3000/employees';

  // GET    /employees
  // GET    /employees/1
  // POST   /employees
  // PUT    /employees/1
  // PATCH  /employees/1
  // DELETE /employees/1

  constructor() { }

  findAllClassic(): Promise<void | Employee[]> {
    return axios.get(this.URL)
      .then(function(response) {
        let empsNoType = response.data;

        let empsWithType: Employee[] = [];
        for (let i = 0; i < empsNoType.length; i++) {
          empsWithType.push(new Employee().deserialize(empsNoType[i]));
        }

        return empsWithType;
      })
      .catch(function(error) {
        console.log(error);
      })
  }

  async findAll(): Promise<Employee[]> {
    try {
      let response = await axios.get(this.URL);
      let empsNoType = response.data;

      let empsWithType: Employee[] = [];
      for (let i = 0; i < empsNoType.length; i++) {
        empsWithType.push(new Employee().deserialize(empsNoType[i]));
      }
      return empsWithType;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findOne(id: number): Promise<Employee> {
    try {
      let response = await axios.get(this.URL + '/' + id);
      return new Employee().deserialize(response.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async addOne(emp: Employee): Promise<Employee> {
    try {
      let response = await axios.post(this.URL, emp);
      return new Employee().deserialize(response.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateOne(emp: Employee): Promise<Employee> {
    try {
      let response = await axios.put(this.URL + '/' + emp.id, emp);
      return new Employee().deserialize(response.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteOne(id: number): Promise<boolean> {
    try {
      await axios.delete(this.URL + '/' + id);
      return true;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

}
```

HTTP 연동기술로 `axios`를 사용합니다. 자세한 설명은 다음 사이트를 참고하세요.  
`https://github.com/axios/axios#example`

`findAllClassic()` 함수는 평범하게 프라미스를 사용하는 함수입니다. 이와 달리 함수명 앞에 `async` 키워드가 붙어 있는 것은 ES8에서 제안하는 `async-await` 함수입니다. 비동기 처리를 동기방식으로 작성하여 가독성을 향상시킬 수 있어서 매우 기쁘게 생각합니다.

**emp.component.ts**

```ts
import { Component, OnInit } from '@angular/core';
import { EmpHttpService } from './emp-http.service';
import { Employee } from './employee';

@Component({
  selector: 'app-emp',
  templateUrl: './emp.component.html',
  styleUrls: ['./emp.component.scss']
})
export class EmpComponent implements OnInit {
  error: any;
  emps: Employee[];
  empNew: Employee = new Employee();
  empUpdateBackup: Employee = null;
  empUpdateId: number = 0;

  constructor(private empHttpService: EmpHttpService) { }

  findAllClassic() {
    this.empHttpService.findAllClassic().then(result => {
      if (result) {
        this.emps = result;
      }
    }).catch(error => this.error = error);
  }

  ngOnInit() {
    // this.findAllClassic();
    this.findAll();
  }

  async findAll() {
    try {
      this.emps = await this.empHttpService.findAll();
    } catch (error) {
      this.error = error;
    }
  }

  async addOne() {
    try {
      let emp = await this.empHttpService.addOne(this.empNew);
      this.emps.push(emp);
      this.empNew = new Employee();
    } catch (error) {
      this.error = error;
    }
  }

  async updateOne(emp) {
    if (window.confirm(`Are you sure to update?`)) {
      try {
        let nothingToDo = await this.empHttpService.updateOne(emp);
        this.empUpdateBackup = null;
        this.empUpdateId = 0;
      } catch (error) {
        this.error = error;
      }
    }
  }

  async deleteOne(id: number) {
    if (window.confirm(`Are you sure to delete of #${id}?`)) {
      try {
        if (await this.empHttpService.deleteOne(id)) {
          this.emps.splice(this.emps.findIndex(item => item.id === id), 1);
        }
      } catch (error) {
        this.error = error;
      }
    }
  }

  updateMode(id: number, event) {
    // 이미 업데이트 모드인 다른 행이 있다면 취소로 보고 되돌려 놓는 작업을 수행한다.
    if (this.empUpdateId !== 0 && this.empUpdateBackup !== null) {
        this.updateCancel();
    }

    // 사용자가 클릭한 테이블의 행,열 정보를 이용할 수 있다.
    // 이를 이용한다면 셀단위로 수정모드를 지원할 수 있다.
    // 소개를 위해서 언급했지만 사용하지는 않고 있다.
    console.log(event.target.dataset.row + ',' + event.target.cellIndex);

    // 지금은 키(id) 값으로 제어해 보자. 행 전체를 수정모드로 변경하는 방식을 사용한다.
    this.empUpdateBackup = JSON.parse(JSON.stringify(this.emps.find(item => item.id === id)));
    this.empUpdateId = id;
  }

  updateCancel() {
    this.emps.splice(this.emps.findIndex(item => item.id === this.empUpdateId), 1, this.empUpdateBackup);
    this.empUpdateId = 0;
  }
}
```

**emp.component.scss**

```scss
table tfoot td,
table tfoot th {
  border-top: 1px solid darkgray;
  border-bottom: 2px solid black;
}

table tr td button {
  width: 80px;
}
```

**emp.component.html**

```html
<h3 class="mb-4">List of Employees</h3>

<table class="table table-striped table-hover">
  <caption>List of Employees</caption>
  <colgroup>
    <col style="width: 10%; background-color: whitesmoke">
    <col style="width: 30%">
    <col style="width: 30%">
    <col style="width: 30%; background-color: whitesmoke">
  </colgroup>
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Control</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let emp of emps; let i=index" (dblclick)="updateMode(emp.id, $event)">
      <ng-template [ngIf]="empUpdateId===emp.id">
        <th [attr.data-row]="i" scope="row">{{emp.id}}</th>
        <td [attr.data-row]="i">
          <input class="form-control" type="text" name="firstName" [(ngModel)]="emp.firstName"
            #firstNameUpdate="ngModel" required>
        </td>
        <td [attr.data-row]="i">
          <input class="form-control" type="text" name="lastName" [(ngModel)]="emp.lastName"
            #lastNameUpdate="ngModel" required>
        </td>
        <td [attr.data-row]="i" class="text-right">
          <button class="btn btn-outline-dark" type="button" (click)="updateOne(emp)"
            [disabled]="firstNameUpdate.invalid || lastNameUpdate.invalid">Update</button>
          {{' '}}
          <button class="btn btn-outline-secondary" type="button"
            (click)="updateCancel()">Cancel</button>
        </td>
      </ng-template>
      <ng-template [ngIf]="empUpdateId!==emp.id">
        <th [attr.data-row]="i" scope="row">{{emp.id}}</th>
        <td [attr.data-row]="i">{{emp.firstName}}</td>
        <td [attr.data-row]="i">{{emp.lastName}}</td>
        <td [attr.data-row]="i" class="text-right">
          <button class="btn btn-secondary" type="button" (click)="deleteOne(emp.id)">Delete</button>
        </td>
      </ng-template>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row">#</th>
      <td>
        <input class="form-control" type="text" name="firstName" [(ngModel)]="empNew.firstName"
          #firstName="ngModel" required>
      </td>
      <td>
        <input class="form-control" type="text" name="lastName" [(ngModel)]="empNew.lastName"
          #lastName="ngModel" required>
      </td>
      <td class="text-right">
        <button class="btn btn-dark" type="button" (click)="addOne()"
          [disabled]="firstName.invalid || lastName.invalid">Add</button>
      </td>
    </tr>
  </tfoot>
</table>
```

`[attr.data-row]="i"` 방식처럼 사용해야 합니다. 그냥 `data-row="{{i}}"` 라고 설정하면 에러가 발생합니다.
