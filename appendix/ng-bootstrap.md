# ng-bootstrap

다음 사이트를 참고하세요.  
`https://ng-bootstrap.github.io/#/getting-started`

## 새 프로젝트

`$ ng new my-ng-bootstrap`

## 디펜던시

`$ cd my-ng-bootstrap`

`$ npm i @ng-bootstrap/ng-bootstrap`

**app.module.ts**

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatepickerComponent } from './example/datepicker/datepicker.component';

@NgModule({
  declarations: [
    AppComponent,
    DatepickerComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule,
    FormsModule, ReactiveFormsModule, NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## 새 컴포넌트

`$ ng g c example/datepicker`

**datepicker.component.ts**

```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {
  model;

  constructor() { }

  ngOnInit() { }

}
```

**datepicker.component.html**

```html
<form class="form-inline">
  <div class="form-group">
    <div class="input-group">
      <input class="form-control" placeholder="yyyy-mm-dd" name="dp"
        [(ngModel)]="model" ngbDatepicker #d="ngbDatepicker">
      <div class="input-group-append">
        <button class="btn btn-outline-secondary calendar" (click)="d.toggle()" type="button"></button>
      </div>
    </div>
  </div>
</form>

<hr />
<pre>Model: {{ model | json }}</pre>
```

## 디자인 디펜던시

**index.html**

```html
<link rel="stylesheet" 
href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" />
<link rel="stylesheet" 
href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.15.0/themes/prism.css" />
```

## 기동 컴포넌트

**app.component.html**

```html
<div class="container-fluid">
  <hr>
  <p>
    This is a demo example forked from the
    <strong>ng-bootstrap</strong> project: Angular powered Bootstrap.
    Visit
    <a href="https://ng-bootstrap.github.io/" target="_blank">
      https://ng-bootstrap.github.io
    </a> for more widgets and demos.
  </p>
  <hr>
  <app-datepicker></app-datepicker>
</div>

<router-outlet></router-outlet>
```

## 전역 CSS 설정

**styles.scss**

```scss
button.calendar,
button.calendar:active {
  width: 2.75rem;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAcCAYAAAAEN20fAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEUSURBVEiJ7ZQxToVAEIY/YCHGxN6XGOIpnpaEsBSeQC9ArZbm9TZ6ADyBNzAhQGGl8Riv4BLAWAgmkpBYkH1b8FWT2WK/zJ8ZJ4qiI6XUI3ANnGKWBnht2/ZBDRK3hgVGNsCd7/ui+JkEIrKtqurLpEWaphd933+IyI3LEIdpCYCiKD6HcuOa/nwOa0ScJEnk0BJg0UTUWJRl6RxCYEzEmomsIlPU3IPW+grIAbquy+q6fluy/28RIBeRMwDXdXMgXLj/B2uimRXpui4D9sBeRLKl+1N+L+t6RwbWrZliTTTr1oxYtzVWiTQAcRxvTX+eJMnlUDaO1vpZRO5NS0x48sIwfPc87xg4B04MCzQi8hIEwe4bl1DnFMCN2zsAAAAASUVORK5CYII=") !important;
  background-repeat: no-repeat;
  background-size: 23px;
  background-position: center;
}
```

## 테스트

테스트 서버를 기동하고 브라우저로 확인합니다. 공식 사이트를 참고하여 모달창 띄우는 방법을 실습해 보세요.
