# ngx-bootstrap

`https://valor-software.com/ngx-bootstrap/#/`

# 연습 프로젝트 생성

```bash
$ ng new my-ngx-bootstrap
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? SCSS
```

```bash
$ cd my-ngx-bootstrap
$ ng add ngx-bootstrap 

Installing packages for tooling via npm.
    ✅️ Added "bootstrap
    ✅️ Added "ngx-bootstrap
    🔍 Installing packages...
UPDATE package.json (1372 bytes)
UPDATE angular.json (4237 bytes)

npm WARN bootstrap@4.2.1 requires a peer of jquery@1.9.1 - 3 but none is installed. 
  You must install peer dependencies yourself.
npm WARN bootstrap@4.2.1 requires a peer of popper.js@^1.14.6 but none is installed. 
  You must install peer dependencies yourself.
```

**angular.json**

```json
"styles": [
  "./node_modules/bootstrap/dist/css/bootstrap.min.css",
  "./node_modules/ngx-bootstrap/datepicker/bs-datepicker.css",
  "src/styles.scss"
],
```

`bs-datepicker.css` 파일하나만 설정된 것이 특이합니다. 이름이 `ngx-bootstrap.css`가 아니라는 점이 특이하네요. 다음 링크에서 그 이유를 알 수 있습니다.  
`https://valor-software.com/ngx-bootstrap/#/datepicker#basic`

로그에서 권고하는 내용에 따라서 디펜던시를 추가합니다.

```bash
$ npm i jquery popper.js bootstrap
$ npm i @types/jquery --save-dev
$ npm i font-awesome
```

`bootstrap` 버전이 `^4.1.1`에서 `^4.2.1`로 올라갔지만 큰 차이는 없을 듯 합니다.

**angular.json**

```json
"styles": [
  "./node_modules/font-awesome/css/font-awesome.css",
  "./node_modules/bootstrap/dist/css/bootstrap.min.css",
  "./node_modules/ngx-bootstrap/datepicker/bs-datepicker.css",
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
  "name": "my-ngx-bootstrap",
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
    "ngx-bootstrap": "^3.1.4",
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
$ ng serve -o
```

## 사용해 보기

**app.module.ts**

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule,
    AppRoutingModule,

    BsDropdownModule.forRoot(),
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
    TooltipModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

**app.component.ts**

```ts
import { Component, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  myForm = new FormGroup({
    myDateYMD: new FormControl(new Date()),
  });

  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  message: string;

  confirm(): void {
    this.message = 'Confirmed!';
    this.modalRef.hide();
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }
}
```

**app.component.html**

```html
<div class="btn-group" dropdown>
  <button dropdownToggle type="button" class="btn btn-primary dropdown-toggle">
    Button dropdown <span class="caret"></span>
  </button>
  <ul *dropdownMenu class="dropdown-menu" role="menu">
    <li role="menuitem"><a class="dropdown-item" href="#">Action</a></li>
    <li role="menuitem"><a class="dropdown-item" href="#">Another action</a></li>
    <li role="menuitem"><a class="dropdown-item" href="#">Something else here</a></li>
    <li class="divider dropdown-divider"></li>
    <li role="menuitem"><a class="dropdown-item" href="#">Separated link</a>
    </li>
  </ul>
</div>

<hr>

<alert type="success">
  <strong>Well done!</strong> You successfully read this important alert message.
</alert>
<alert type="info">
  <strong>Heads up!</strong> This alert needs your attention, but it's not super important.
</alert>
<alert type="warning">
  <strong>Warning!</strong> Better check yourself, you're not looking too good.
</alert>
<alert type="danger">
  <strong>Oh snap!</strong> Change a few things up and try submitting again.
</alert>

<hr>

<form [formGroup]="myForm">
  <div class="row">
    <div class="col-xs-12 col-md-5 col-lg-4 form-group">
      <input class="form-control" #dpYMD="bsDatepicker" bsDatepicker formControlName="myDateYMD"
        [bsConfig]="{ dateInputFormat: 'YYYY-MM-DD' }">
    </div>
    <div class="col-xs-12 col-12 col-md-3 form-group">
      <button class="btn btn-success" (click)="dpYMD.toggle()"
        [attr.aria-expanded]="dpYMD.isOpen">Date Picker</button>
    </div>
  </div>
</form>

<pre>{{myForm.value.myDateYMD | date:'yyyy.MM.dd'}}</pre>

<hr>

<button type="button" class="btn btn-primary" (click)="openModal(template)">Open modal</button>

<ng-template #template>
  <div class="modal-header">
    <h4 class="modal-title pull-left">Modal</h4>
    <button type="button" class="close pull-right" aria-label="Close" (click)="modalRef.hide()">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque delectus enim esse excepturi, impedit,
      iste magnam officia optio, quam quis quisquam saepe sint unde velit vitae! Animi in iusto ut?</p>
    <button type="button" class="btn btn-primary" popover="Vivamus sagittis">popover</button>
    <button type="button" class="btn btn-primary" tooltip="Vivamus sagittis">tooltip</button>
    <button type="button" class="btn btn-primary" (click)="confirm()">Yes</button>
    <button type="button" class="btn btn-primary" (click)="decline()">No</button>
  </div>
</ng-template>

<pre class="card card-block card-header">{{message}}</pre>

<!-- <router-outlet></router-outlet> -->
```

`popover` 사용을 위해서 `PopoverModule` 모듈을 추가로 임포트 해야 하고 `tooltip` 사용을 위해서 `TooltipModule` 모듈을 추가로 임포트해야 합니다.

작업결과를 확인합니다.
