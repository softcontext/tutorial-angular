# primeng

```bash
$ ng new my-primeng
$ cd my-primeng
```

## Download

```bash
$ npm install primeng --save
$ npm install primeicons --save
$ npm install font-awesome --save
```

font-awesome은 추가적으로 아이콘을 사용해 보기 위해서 설치합니다.

## Dependencies

**angular.json**

```json
"styles": [
  "node_modules/primeicons/primeicons.css",
  "node_modules/primeng/resources/themes/nova-light/theme.css",
  "node_modules/primeng/resources/primeng.min.css",
  "src/styles.scss"
],
"scripts": []
```

**styles.scss**

```scss
@import '~font-awesome/css/font-awesome.css';
```

## 컴포넌트 생성

```bash
$ ng g c layout/header
$ ng g c fragment/home
$ ng g c fragment/binding/example1
```

## Import

**app.module.ts**

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { HeaderComponent } from './layout/header/header.component';
import { HomeComponent } from './fragment/home/home.component';
import { Example1Component } from './fragment/binding/example1/example1.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    Example1Component
  ],
  imports: [
    BrowserModule, AppRoutingModule,
    FormsModule, BrowserAnimationsModule,
    MenubarModule, ButtonModule, InputTextModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Animations 처리를 위해서 BrowserAnimationsModule 모듈 임포트가 필요합니다. 공식 사이트에 설명은 임포트와 관련하여 누락된 부분이 존재합니다. 사용하는 컴포넌트에서 `<input>` 태그가 있다면 관련하여 `InputTextModule` 모듈이 임포트되야 한다고 생각하는 것이 좋겠습니다.

## 사용 실습

**app.component.html**

```html
<app-header></app-header>
<router-outlet></router-outlet>
```

**header.component.ts**

```ts
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  items: MenuItem[];

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/home']
      },
      {
        label: 'Binding',
        icon: 'fa fa-chain',
        routerLink: ['/binding','example1']
      },
      {
        label: 'File',
        icon: 'pi pi-fw pi-file',
        items: [{
          label: 'New',
          icon: 'pi pi-fw pi-plus',
          items: [
            { label: 'Project' },
            { label: 'Other' },
          ]
        },
        { label: 'Open' },
        { separator: true },
        { label: 'Quit' }
        ]
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [
          { label: 'Delete', icon: 'pi pi-fw pi-trash' },
          { separator: true },
          { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
        ]
      },
      {
        label: 'Help',
        icon: 'pi pi-fw pi-question',
        items: [
          {
            label: 'Contents'
          },
          {
            label: 'Search',
            icon: 'pi pi-fw pi-search',
            items: [
              {
                label: 'Text',
                items: [
                  {
                    label: 'Workspace'
                  }
                ]
              },
              {
                label: 'File'
              }
            ]
          }
        ]
      },
      {
        label: 'Actions',
        icon: 'pi pi-fw pi-cog',
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
              { label: 'Save', icon: 'pi pi-fw pi-save' },
              { label: 'Update', icon: 'pi pi-fw pi-save' },
            ]
          },
          {
            label: 'Other',
            icon: 'pi pi-fw pi-tags',
            items: [
              { label: 'Delete', icon: 'pi pi-fw pi-minus' }
            ]
          }
        ]
      },
      {
        label: 'Quit', icon: 'pi pi-fw pi-times'
      }
    ];
  }

}
```

소스 일부분에서 `pi` 아이콘 대신 `fa` 아이콘을 사용하고 있습니다. 찾아보시고 다른 것으로 변경해 보시기 바랍니다.

**header.component.html**

```html
<p-menubar [model]="items">
  <div>
    <input type="text" pInputText placeholder="Search">
    <button pButton label="Logout" icon="fa fa-sign-out" style="margin-left:.25em"></button>
  </div>
</p-menubar>
```

테스트를 진행합니다.
