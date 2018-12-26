# Component Communication

컴포넌트들 사이에 데이터를 주고 받는 처리방법을 살펴봅니다.

## 1. 하나의 `<router-outlet>` 영역을 교대로 차지하는 경우

두 개의 컴포넌트가 교대로 화면에 배치되는 경우, 한 컴포넌트에서 다른 컴포넌트로 직접 데이터를 전달할 수 없습니다. 한 컴포넌트가 객체상태일 때 다른 컴포넌트는 그렇지 못하기 때문에 직접 대화가 불가능합니다. 컴포넌트가 파괴되기 전에 데이터를 백업해서 유지할 방법이 필요합니다. 서비스를 이 때 사용하시면 됩니다.

## 2. 부모-자식 관계인 경우

컴포넌트들 사이의 부모-자식 관계는 컴포넌 생성 시나 모듈 등록 시 결정되는 것이 아니라 HTML에서 컴포넌트들을 중첩해서 사용할 때 결정됩니다. 부모-자식 관계인 컴포넌트들은 직접 대화가 가능합니다. 부모 컴포넌트가 자식의 커스텀 태그를 사용할 때 커스텀 속성을 설정하여 자식 클래스의 변수에 직접 전달할 수 있습니다. 이 때, `@Input` 데코레이터를 사용합니다. 반대로 자식에서 부모에게 데이터를 전달하고자 할 때는 `EventEmitter`와 `@Output` 데코레이터를 사용하여 설정합니다.

## 3. 형제 관계인 경우

두 개의 컴포넌트가 동시에 화면에 배치되어 있는 경우, 이 둘 사이에 직접적인 대화는 불가능합니다. 서로 상대방의 존재를 모르기 때문입니다. 그런데, 이 컴포넌트들을 자식으로 갖고 있는 부모 컴포넌트는 자식 컴포넌트의 참조를 획득할 수 있으므로 부모를 통해서 형제 관계인 두 컴포넌트가 대화할 수 있게 됩니다. 여기서 형제란 직접 상대방을 알고 있는 상태를 의미하는 것이 아니라 같은 레벨에 배치된 컴포넌트들이라는 뜻으로 이해를 돕고자 선택한 단어입니다. 

**데이터의 흐름**

-   A 컴포넌트 ==> 부모 컴포넌트 ==> B 컴포넌트
-   A 컴포넌트 &lt;== 부모 컴포넌트 &lt;== B 컴포넌트

이러한 관계를 사용하기 위해서 다수의 `@Input`, `@Output` 데코레이터 설정이 필요하게 됩니다. 중첩의 단계가 깊어진다면 다루기 까다롭게 됩니다. 따라서, 이러한 처리방식을 사용하지 말고 비동기 대화 중계자를 도입하여 이용하는 것이 훨씬 좋습니다. `Rxjs`의 `Subject-Observable` 기술을 사용하여 쉽게 구성할 수 있습니다. 이를 위한 서비스 객체가 필요합니다.

**비동기 대화 설정이 정말 많은 경우**

수 많은 컴포넌트들이 비동기 대화를 원해서 정말 많은 `발행-구독` 관계를 맺게 된다면 이 또한 관리하기에 버겁게 됩니다. 이러한 시점에 다다르게 된다면 `FLUX`의 개념을 도입해 봄직 합니다. 참고하시기 바랍니다.

# 예제 프로젝트

```bash
$ ng new my-component-comm
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? SCSS   [ http://sass-lang.com   ]
```

```bash
$ ng g s common/log
$ ng g i common/log

$ ng g c one/home
$ ng g c one/about
$ ng g s one/data-holder
$ ng g i one/data

$ ng g c two/parent
$ ng g c two/child

$ ng g c three/panel
$ ng g c three/display
$ ng g s three/event-bridge
$ ng g c three/control
```

**index.html**

```html
<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>MyComponentComm</title>
  <base href="/">

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">

  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
    integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
    crossorigin="anonymous">
</head>

<body>
  <app-root></app-root>

  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
    integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
    crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js"
    integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut"
    crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js"
    integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k"
    crossorigin="anonymous"></script>
</body>

</html>
```

**app.module.ts**

```ts
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule // 추가
  ],
})
```

**app-routing.module.ts**

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './one/home/home.component';
import { AboutComponent } from './one/about/about.component';
import { ParentComponent } from './two/parent/parent.component';
import { PanelComponent } from './three/panel/panel.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'parent', component: ParentComponent },
  { path: 'panel', component: PanelComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

**environment.ts**

```ts
export const environment = {
  production: false,
  loggable: true
};
```

**log.ts**

```ts
export interface Log {
  tag: string;
  message: string;
  date: Date
}
```

**log.service.ts**

```ts
import { Injectable } from '@angular/core';
import { Log } from './log';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  data: Array<Log> = [];

  constructor() { }

  log(tag: string, message: string): void {
    if (environment.loggable) {
      this.data.push({ tag, message, date: new Date() });
    }
  }

  getData(): Array<Log> {
    return this.data;
  }

  clear(): Array<Log> {
    if (environment.loggable) {
      this.data = [];
      return this.data;
    }
    return null;
  }
}
```

**app.component.ts**

```ts
import { Component } from '@angular/core';
import { Log } from './common/log';
import { LogService } from './common/log.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  data: Array<Log> = [];

  constructor(private logService: LogService) {
    this.data = this.logService.getData();
  }

  clear() {
    this.data = this.logService.clear();
  }
}
```

**app.component.scss**

```scss
.container.outlet {
  margin-top: 1rem;
}

.logger {
  border: 1px solid silver;
  padding: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.logger > p {
  margin: 0;
}
```

**app.component.html**

```html
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" routerLink="/">Angular Wave</a>

  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item" routerLinkActive="active">
        <a class="nav-link" routerLink="home">One : Home</a>
      </li>
      <li class="nav-item" routerLinkActive="active">
        <a class="nav-link" routerLink="about">One : About</a>
      </li>
      <li class="nav-item" routerLinkActive="active">
        <a class="nav-link" routerLink="parent">Two : Parent</a>
      </li>
      <li class="nav-item" routerLinkActive="active">
        <a class="nav-link" routerLink="panel">Three : Panel</a>
      </li>
    </ul>
  </div>
</nav>

<div class="container outlet">
  <router-outlet></router-outlet>
</div>

<div class="container">
  <div class="logger">
    <button type="button" (click)="clear()">Clear</button>
    <p *ngFor="let log of data">{{log.date | date:'yyyy.MM.dd HH:mm:ss'}} <em>{{log.tag}}</em> {{log.message}}</p>
  </div>
</div>
```

## 1. 하나의 `<router-outlet>` 영역을 교대로 차지하는 경우

**data.ts**

```ts
export interface Data {
  title: string;
  date: Date;
}
```

**data-holder.service.ts**

```ts
import { Injectable } from '@angular/core';
import { Data } from './data';
import { LogService as debug } from '../common/log.service';

@Injectable({
  providedIn: 'root'
})
export class DataHolderService {
  data: Data = {
    title: null,
    date: null
  };

  constructor(private debug: debug) {
    this.debug.log('DataHolderService', 'constructor()');
  }

  setData(data: Data): void {
    this.debug.log('DataHolderService', 'setData()');
    this.data = this.deepCopy(data);
  }

  getData(): Data {
    this.debug.log('DataHolderService', 'getData()');
    return this.deepCopy(this.data);
  }

  deepCopy(obj: Data): Data {
    try {
      return JSON.parse(JSON.stringify(obj));
    } catch (ignore) {
      return obj;
    }
  }
}
```

**home.component.ts**

```ts
import { Component, OnInit } from '@angular/core';
import { Data } from '../data';
import { DataHolderService } from '../data-holder.service';
import { LogService as Debug } from '../../common/log.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data: Data = {
    title: null,
    date: null
  };

  constructor(
    private dataHolderService: DataHolderService,
    private debug: Debug) {
    this.debug.log('HomeComponent', 'constructor()');
  }

  ngOnInit() {
    this.debug.log('HomeComponent', 'ngOnInit()');
    this.lookup();
  }

  backup() {
    this.debug.log('HomeComponent', 'backup()');
    this.dataHolderService.setData(this.data);
  }

  lookup() {
    this.debug.log('HomeComponent', 'lookup()');
    this.data = this.dataHolderService.getData();
  }
}
```

**home.component.html**

```html
<p>
  home works!
</p>
<div class="container">
  <p>{{data.title}}</p>
  <input type="text" name="title" [(ngModel)]="data.title">{{' '}}
  <button type="button" (click)="backup()">Save</button>
  <p>{{data.date | date:'yyyy.MM.dd HH:mm:ss'}}</p>
</div>
```

**about.component.ts**

```ts
import { Component, OnInit } from '@angular/core';
import { Data } from '../data';
import { DataHolderService } from '../data-holder.service';
import { LogService as Debug } from '../../common/log.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  data: Data = {
    title: null,
    date: null
  };

  constructor(
    private dataHolderService: DataHolderService,
    private debug: Debug) {
    this.debug.log('AboutComponent', 'constructor()');
  }

  ngOnInit() {
    this.debug.log('AboutComponent', 'ngOnInit()');
    this.lookup();
  }

  backup() {
    this.debug.log('AboutComponent', 'backup()');
    this.dataHolderService.setData(this.data);
  }

  lookup() {
    this.debug.log('AboutComponent', 'lookup()');
    this.data = this.dataHolderService.getData();
  }
}
```

**about.component.html**

```html
<p>
  about works!
</p>
<div class="container">
  <p>{{data.title}}</p>
  <input type="text" name="title" [(ngModel)]="data.title">{{' '}}
  <button type="button" (click)="backup()">Save</button>
  <p>{{data.date | date:'yyyy.MM.dd HH:mm:ss'}}</p>
</div>
```

## 2. 부모-자식 관계인 경우

**parent.component.ts**

```ts
import { Component, OnInit } from '@angular/core';

export class Book {
  id: number;
  title: string;
  price: number;
  date: string;
  img: string;
}

// 전역 상수 객체를 제공하는 서비스를 통해 이용하는 것을 권장합니다.
const IMG_HOLDER_URL = 'https://via.placeholder.com/286x100';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {
  selectedBooks: Array<Book> = [];
  books: Array<Book> = [
    { id: 1, title: '타샤의 정원', price: 15800, date: '20170831', img: IMG_HOLDER_URL + '?text=A' },
    { id: 2, title: '언어의 온도', price: 13800, date: '20160801', img: IMG_HOLDER_URL + '?text=B' },
    { id: 3, title: '보노보노처럼 살다니 다행이야', price: 16000, date: '20170401', img: IMG_HOLDER_URL + '?text=C' },
    { id: 4, title: '청춘의 독서', price: 14800, date: '20170701', img: IMG_HOLDER_URL + '?text=D' },
    { id: 5, title: '나는 나로 살기로 했다', price: 13800, date: '20161101', img: IMG_HOLDER_URL + '?text=E' }
  ];

  constructor() { }

  ngOnInit() { }

  display(signal: any) {
    if (signal.direction === 'Up') {
      this.selectedBooks.push(this.books.find(book => book.id === signal.id));
      this.books.splice(this.books.findIndex(book => book.id === signal.id), 1);
    } else { // down
      this.books.push(this.selectedBooks.find(book => book.id === signal.id));
      this.selectedBooks.splice(this.selectedBooks.findIndex(book => book.id === signal.id), 1);
    }
  }

}
```

**parent.component.html**

```html
<h3>Bookshelf</h3>

<hr>

<div class="row">
  <ng-template ngFor let-book let-i="index" [ngForOf]="selectedBooks">
    <app-child [book]="book" [btnText]="'Down'" (selectedBookId)="display($event)"></app-child>
  </ng-template>
</div>

<hr>

<div class="row">
  <ng-template ngFor let-book let-i="index" [ngForOf]="books">
    <app-child [book]="book" [btnText]="'Up'" (selectedBookId)="display($event)"></app-child>
  </ng-template>
</div>
```

**child.component.ts**

```ts
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../parent/parent.component';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {
  @Input('book') book: Book;
  @Input('btnText') btnText: string;
  @Output('selectedBookId') eventEmitter = new EventEmitter<any>();

  constructor() {
    console.log('ChildComponent()');
  }

  ngOnInit() { }

  select(id: number) {
    this.eventEmitter.emit({ id, direction: this.btnText });
  }
}
```

**child.component.html**

```html
<div class="col mb-2">
  <div class="card" style="width: 18rem;">
    <img class="card-img-top" [src]="book.img">
    <div class="card-body">
      <h5 class="card-title">{{book.title}}</h5>
      <p class="card-text">This is a wider card with supporting text below
        as a natural lead-in to additional content.</p>
      <div class="row mb-2">
        <div class="col">
          <p class="card-text text-left">
            <small class="text-muted text-left">{{book.date | strDate}}</small>
          </p>
        </div>
        <div class="col">
          <p class="card-text text-right">
            <small class="text-muted text-right">{{book.price | currency:'KRW':'symbol'}}</small>
          </p>
        </div>
      </div>
      <button class="btn btn-primary px-4" type="button" (click)="select(book.id)">{{btnText}}</button>
    </div>
  </div>
</div>
```

추가적으로 앞서서 작성한 날짜 문자열을 받아서 구분 기호를 추가한 문자열을 리턴하는 `strDate` 파이프를 사용하고 있습니다.

## 3. 형제 관계인 경우

**event-bridge.service.ts**

```ts
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventBridgeService {
  subject: Subject<any> = new Subject();

  constructor() { }

  observe(): Observable<any> {
    return this.subject.asObservable();
  }

  publish(signal: string) {
    this.subject.next({ signal });
  }
}
```

**panel.component.html**

```html
<h3>Dashboard</h3>

<div class="card" style="width: 20rem;">
  <div class="card-body">
    <app-display></app-display>
    <p class="card-text">The IMF said the global economy is now expected to grow at 3.7 percent this year.</p>
    <app-control></app-control>
  </div>
</div>
```

**display.component.ts**

```ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventBridgeService } from '../event-bridge.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit, OnDestroy {
  count: number = 0;
  subscription: Subscription;

  constructor(private eventBridgeService: EventBridgeService) { }

  ngOnInit() {
    this.subscription = this.eventBridgeService.observe().subscribe(data => {
      if (data.signal === '+') {
        this.count++;
      } else {
        this.count--;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
```

메모리 누수를 방지하기 위해서 컴포넌트가 파괴될 때 구독해제를 하는 작업을 잊지 마세요.

**display.component.html**

```html
<h5 class="card-title">
  Count: {{count}}
</h5>
```

**control.component.ts**

```ts
import { Component, OnInit } from '@angular/core';
import { EventBridgeService } from '../event-bridge.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

  constructor(private eventBridgeService: EventBridgeService) { }

  ngOnInit() { }

  increase() {
    this.eventBridgeService.publish('+');
  }

  decrease() {
    this.eventBridgeService.publish('-');
  }
}
```

**control.component.html**

```html
<div class="row">
  <div class="col">
    <p class="card-text text-left">
      <button class="btn btn-primary" type="button" (click)="increase()">+ Increase</button>
    </p>
  </div>
  <div class="col">
    <p class="card-text text-right">
      <button class="btn btn-danger" type="button" (click)="decrease()">- Decrease</button>
    </p>
  </div>
</div>
```
