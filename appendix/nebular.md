# Nebular

Nebular는 다음 앵귤러 앱에 필수적으로 필요한 모듈의 집합입니다. Nebular의 목적은 전형적인 작업을 보다 빠르고 효율적으로 해결하여 반복적인 업무로부터 떠나서 비즈니스 로직에 집중할 수 있게 하는 것입니다.

`https://akveo.github.io/nebular/docs/getting-started/what-is-nebular#whats-included`

### 구성

**Nebular Theme `@nebular/theme`**  
* `Theme System` - set of SCSS rules, which allows you to modify application look & feel by changing variables, with fewer custom styles.
* `UI Kit` - pure Angular components with two style themes and no 3rd party dependencies.
* `Server-side rendering` compatibility!
* `Right-to-left writing system` support for all components.

**Nebular Auth `@nebular/auth`**  
* `Authentication components` (login/register/reset password/restore password).
* Multiple configurable `authentication Strategies` (backend connectors).
* Helpers for `token management` (storing, passing with HTTP requests, etc).

**Nebular Security `@nebular/security`**  
* Module for `roles and permissions management`.

**Nebular Bootstrap `@nebular/bootstrap`**  
* Style overriding for `Bootstrap`, so that the application has a consistent look & feel across libraries.

**Admin Dashboard Starter Kit `ngx-admin`**
* Angular application based on Nebular modules with beautiful IOT components.

**Other Ideas**
* `@nebular/dashboard` - module for draggable/resizable dashboards creation.
* `@nebular/data` - application data & state management.

### Nebular 목적

요즘에는 많은 멋진 프런트 엔드 프레임 워크가 있습니다. 그들은 우리의 삶을보다 편안하게 만들어주는 많은 유용한 기능을 제공합니다. **우리의 의도는 새로운 것을 창조하는 것이 아닙니다.** 우리는 모듈 개발자가 자신의 창조물에 투자한 시간과 복잡성을 잘 알고 있기 때문입니다. 그러나 개발자로서 우리는 요즘 프론트 엔드 개발이 단절된 것으로 생각합니다. 라이브러리를 검색하고 다른 설치 과정을 거쳐야 하며 모든 것이 다르게 보일 때가 있습니다. 때로는 그냥 앉아서 시작할 수 없다는 것을 짜증나게 할 수도 있습니다. 이것이 우리가 가장 유용한 모듈과 라이브러리를 함께 모으고, 통합 된 응용 프로그램과 그래픽 인터페이스에 조인하여 더 쉬운 설치를위한 훌륭한 툴킷을 만드는 사명을 수행하는 이유입니다.

```bash
$ ng new my-nebular
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? SCSS
```

```bash
$ ng add @nebular/theme
? Which Nebular theme do you want to use: default
? Use customizable scss themes? No
? Set up browser animations for Nebular? Yes
UPDATE src/app/app.module.ts (634 bytes)
UPDATE angular.json (3970 bytes)
UPDATE src/app/app.component.html (1472 bytes)
```

**package.json**

```json
{
  "name": "my-nebular",
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
    "@angular/cdk": "~7.1.0",
    "@angular/common": "~7.1.0",
    "@angular/compiler": "~7.1.0",
    "@angular/core": "~7.1.0",
    "@angular/forms": "~7.1.0",
    "@angular/platform-browser": "~7.1.0",
    "@angular/platform-browser-dynamic": "~7.1.0",
    "@angular/router": "~7.1.0",
    "@nebular/theme": "^3.1.0",
    "core-js": "^2.5.4",
    "nebular-icons": "^1.1.0",
    "rxjs": "~6.3.3",
    "tslib": "^1.9.0",
    "zone.js": "~0.8.26"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "~0.11.0",
    "@angular/cli": "~7.1.1",
    "@angular/compiler-cli": "~7.1.0",
    "@angular/language-service": "~7.1.0",
    "@schematics/angular": "~7.1.0",
    "@types/jasmine": "~2.8.8",
    "@types/jasminewd2": "~2.0.3",
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

**app.module.ts**

```ts
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    // this will enable the default theme,
    // you can change this by passing `{ name: 'cosmic' }` to enable the dark theme
    // NbThemeModule.forRoot(),
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule
  ],
})
```

**angular.json**

```json
"styles": [
  "./node_modules/@nebular/theme/styles/prebuilt/default.css",
  "src/styles.scss"
],
```

**app.component.html**

```html
<nb-layout>

  <nb-layout-header fixed>
  <!-- Insert header here -->
  </nb-layout-header>

  <nb-layout-column>

    <!-- 원래 있던 콘텐츠의 배치 위치 -->
    
  </nb-layout-column>

  <nb-layout-footer fixed>
  <!-- Insert footer here -->
  </nb-layout-footer>

</nb-layout>
```

작업결과를 확인합니다. 다음으로 사이드바를 추가하는 작업을 수행합니다.

**app.modulet.ts**

```ts
import { NbSidebarModule, NbSidebarService } from '@nebular/theme';

@NgModule({
  imports: [
    ...
    NbSidebarModule
  ],
  providers: [NbSidebarService],
})
```

**app.component.html**

```html
<nb-layout>

  <nb-layout-header fixed>
    Company Name
  </nb-layout-header>

  <nb-sidebar>Sidebar Content</nb-sidebar>

  <nb-layout-column>

    Page Content

    <router-outlet></router-outlet>

  </nb-layout-column>

</nb-layout>
```

`<nb-sidebar>`를 추가하고 `<nb-layout-footer>`를 제거합니다. 화면을 확인합니다.

<img src="../image/nebular/sample-page.png" width="90%"/>

여기까지는 문제없이 잘 따라오셨으리라 생각합니다. 그런데 컴포넌트를 고르고 이를 사용하는 방법을 익힌 후 실제로 적용해 보면 에러가 자주 발생합니다. 이를 해결해 가는 과정 또한 학습의 일부라고 생각하시고 계속해서 앞으로 나아가 주시기를 바랍니다.

## ngx-admin-starter 

공식 사이트에 설명이 심플합니다. 필요한 정보를 소스 코드로부터 얻기위해서 데모 프로젝트를 살펴보는 것이 좋겠습니다.

`https://akveo.github.io/nebular/docs/guides/install-based-on-starter-kit#download-the-code`

```
$ git clone https://github.com/akveo/ngx-admin.git
$ cd ngx-admin && npm i
$ ng serve --port=4201
```

기본 화면구조는 다음 파일이 처리하고 있습니다.

**src/app/pages/pages.component.ts**

```ts
import { Component } from '@angular/core';
import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent {
  menu = MENU_ITEMS;
}
```

`<ngx-sample-layout>`에 해당하는 컴포넌트를 찾아야 구조의 상세 정보를 알 수 있겠군요. `ctrl+shift+f` 키를 누른 다음 검색어로 `ngx-sample-layout`를 입력하고 `Find All` 버튼을 클릭합니다. 이제 진짜로 기본 화면구조를 처리하는 파일을 찾았습니다. 여기서부터 분석을 시작해 나가면 되겠습니다.

**src/app/@theme/layouts/sample/sample.layout.ts**

```ts
import { Component, OnDestroy } from '@angular/core';
import { delay, withLatestFrom, takeWhile } from 'rxjs/operators';
import {
  NbMediaBreakpoint,
  NbMediaBreakpointsService,
  NbMenuItem,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from '@nebular/theme';

import { StateService } from '../../../@core/data/state.service';

// TODO: move layouts into the framework
@Component({
  selector: 'ngx-sample-layout',
  styleUrls: ['./sample.layout.scss'],
  template: `
    <nb-layout [center]="layout.id === 'center-column'" windowMode>
      <nb-layout-header fixed>
        <ngx-header [position]="sidebar.id === 'start' ? 'normal': 'inverse'"></ngx-header>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar"
                   tag="menu-sidebar"
                   responsive
                   [end]="sidebar.id === 'end'">
        <nb-sidebar-header *ngIf="currentTheme !== 'corporate'">
          <a href="#" class="btn btn-hero-success main-btn">
            <i class="ion ion-social-github"></i> <span>Support Us</span>
          </a>
        </nb-sidebar-header>
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar>

      <nb-layout-column class="main-content">
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

      <nb-layout-column start class="small" *ngIf="layout.id === 'two-column' || layout.id === 'three-column'">
        <nb-menu [items]="subMenu"></nb-menu>
      </nb-layout-column>

      <nb-layout-column class="small" *ngIf="layout.id === 'three-column'">
        <nb-menu [items]="subMenu"></nb-menu>
      </nb-layout-column>

      <nb-layout-footer fixed>
        <ngx-footer></ngx-footer>
      </nb-layout-footer>

      <nb-sidebar class="settings-sidebar"
                   tag="settings-sidebar"
                   state="collapsed"
                   fixed
                   [end]="sidebar.id !== 'end'">
        <ngx-theme-settings></ngx-theme-settings>
      </nb-sidebar>
    </nb-layout>
  `,
})
export class SampleLayoutComponent implements OnDestroy {

  subMenu: NbMenuItem[] = [
    {
      title: 'PAGE LEVEL MENU',
      group: true,
    },
    {
      title: 'Buttons',
      icon: 'ion ion-android-radio-button-off',
      link: '/pages/ui-features/buttons',
    },
    {
      title: 'Grid',
      icon: 'ion ion-android-radio-button-off',
      link: '/pages/ui-features/grid',
    },
    {
      title: 'Icons',
      icon: 'ion ion-android-radio-button-off',
      link: '/pages/ui-features/icons',
    },
    {
      title: 'Modals',
      icon: 'ion ion-android-radio-button-off',
      link: '/pages/ui-features/modals',
    },
    {
      title: 'Typography',
      icon: 'ion ion-android-radio-button-off',
      link: '/pages/ui-features/typography',
    },
    {
      title: 'Animated Searches',
      icon: 'ion ion-android-radio-button-off',
      link: '/pages/ui-features/search-fields',
    },
    {
      title: 'Tabs',
      icon: 'ion ion-android-radio-button-off',
      link: '/pages/ui-features/tabs',
    },
  ];
  layout: any = {};
  sidebar: any = {};

  private alive = true;

  currentTheme: string;

  constructor(protected stateService: StateService,
              protected menuService: NbMenuService,
              protected themeService: NbThemeService,
              protected bpService: NbMediaBreakpointsService,
              protected sidebarService: NbSidebarService) {
    this.stateService.onLayoutState()
      .pipe(takeWhile(() => this.alive))
      .subscribe((layout: string) => this.layout = layout);

    this.stateService.onSidebarState()
      .pipe(takeWhile(() => this.alive))
      .subscribe((sidebar: string) => {
        this.sidebar = sidebar;
      });

    const isBp = this.bpService.getByName('is');
    this.menuService.onItemSelect()
      .pipe(
        takeWhile(() => this.alive),
        withLatestFrom(this.themeService.onMediaQueryChange()),
        delay(20),
      )
      .subscribe(([item, [bpFrom, bpTo]]: [any, [NbMediaBreakpoint, NbMediaBreakpoint]]) => {

        if (bpTo.width <= isBp.width) {
          this.sidebarService.collapse('menu-sidebar');
        }
      });

    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
```

첫 화면 접근 URL은 다음과 같습니다.  
`http://localhost:4201/#/pages/dashboard`

`dashboard`에 매핑되는 페이지는 다음 파일이 처리하고 있습니다.

**src/app/pages/e-commerce/e-commerce.component.html**

```html
<div class="row">
  <div class="col-xxl-5">
    <div class="row">
      <div class="col-md-6">
        <ngx-profit-card></ngx-profit-card>
      </div>
      <div class="col-md-6">
        <ngx-earning-card></ngx-earning-card>
      </div>
    </div>

    <ngx-traffic-reveal-card></ngx-traffic-reveal-card>
  </div>

  <div class="col-xxl-7">
    <ngx-ecommerce-charts></ngx-ecommerce-charts>
  </div>
</div>

<div class="row">
  <div class="col-xxl-9">
    <ngx-country-orders></ngx-country-orders>
  </div>

  <div class="col-xxl-3">
    <ngx-progress-section></ngx-progress-section>
  </div>
</div>

<div class="row">
  <div class="col-xxl-9">
    <ngx-ecommerce-visitors-analytics></ngx-ecommerce-visitors-analytics>
  </div>

  <div class="col-xxl-3">
    <ngx-user-activity></ngx-user-activity>
  </div>
</div>
```

`styles.scss` 파일은 프로젝트 루트에 있지 않고 `src/app/@theme/styles` 폴더 밑으로 옮겨 놓은 상태입니다.

**nebular icons**  

Nebular가 사용하는 아이콘들의 정보는 다음 사이트에서 확인할 수 있습니다.  
`http://akveo.com/ngx-admin/#/pages/ui-features/icons`

좋습니다. 대충 파악이 됬군요. 이제부터 공식 사이트의 설명이 부족하다고 생각되면 `4201` 포트로 돌고 있는 프로젝트의 소스코드를 참고하기로 합니다. 작업은 계속 `4200` 포트로 돌고 있는 프로젝트에서 진행합니다.

## Bootstrap Integration

부트스트랩을 사용해 보겠습니다.

`https://akveo.github.io/nebular/docs/guides/bootstrap-integration`

```bash
$ npm i @nebular/bootstrap bootstrap
```

**angular.json**

```json
"styles": [
  "./node_modules/bootstrap/dist/css/bootstrap.css",
  "./node_modules/@nebular/theme/styles/prebuilt/default.css",
  "src/styles.scss"
],
```

`jquery`, `popper.js` 관련 설정이 보이지 않는군요. 대체했기 때문에 필요없는 것인지는 조금 더 진행해 보고 판단하는것이 좋겠습니다.

부트스트랩 적용 여부를 확인하기 위해서 버튼을 하나 배치해 보겠습니다.

**app.component.html**

```html
<nb-layout-column>
  Page Content <button type="button" class="btn btn-primary">Button</button>
  <router-outlet></router-outlet>
</nb-layout-column>
```

`class="btn btn-primary"` 부트스트랩 클래스를 적용해서 버튼이 파란색으로 잘 보이는 군요.

## Layout

사이드바에 햄버거 아이콘을 표시하고 활성화 시켜서 사이드바가 움직이도록 활성화 해 보겠습니다.

`https://akveo.github.io/nebular/docs/components/layout/overview`

**app.module.ts**

```ts
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';
import { NbSidebarModule, NbSidebarService } from '@nebular/theme';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    
    BrowserAnimationsModule,
    // NbThemeModule.forRoot({ name: 'default' }),
    NbThemeModule.forRoot({ name: 'cooperate' }),
    NbLayoutModule,
    
    NbSidebarModule,
  ],
  providers: [NbSidebarService],
})
```

`NbSidebarModule` 모듈을 임포트하고 `NbSidebarService` 서비스를 등록합니다. 하는 김에 테마도 변경해 보겠습니다. `default`, `corporate` 및 `cosmic` 테마를 지원합니다. 

다음 작업으로 설정파일을 변경합니다. 

**angular.json**

```json
"styles": [
  "./node_modules/bootstrap/dist/css/bootstrap.css",
  "./node_modules/@nebular/theme/styles/prebuilt/corporate.css",
  "src/styles.scss"
],
```

**app.component.scss**

```scss
:host nb-layout-header a {
  font-size: 2rem;
  text-decoration: none;
}

:host nb-layout-column {
  height: 50vw;
}

:host nb-layout-column:first-child {
  background: #f4f4f7;
}
```

**app.component.html**

```html
<nb-layout>

  <nb-layout-header fixed>
    <a href="#" (click)="toggle()"><i class="nb-menu"></i></a>
  </nb-layout-header>

  <nb-sidebar>Sidebar Content</nb-sidebar>

  <nb-layout-column>
    Page Content <button type="button" class="btn btn-primary">Button</button>
    <router-outlet></router-outlet>
  </nb-layout-column>

</nb-layout>
```

**app.component.ts**

```ts
import { Component } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private sidebarService: NbSidebarService) { }

  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }
}
```

공식 사이트의 설명이 요구하는 작업을 모두 수행했습니다. 그런데 아이콘이 보이지 않습니다. 버그일까요?

`Bootstrap Integration` 부분에서 설치해 놓은 데모 프로젝트의 설정부분을 참고로 하여 다음 작업을 추가적으로 수행해야 한다고 판단했습니다.

```bash
$ npm i nebular-icons
```

**angular.json**

```json
"styles": [
  "./node_modules/bootstrap/dist/css/bootstrap.css",
  "./node_modules/nebular-icons/scss/nebular-icons.scss",
  "./node_modules/@nebular/theme/styles/prebuilt/corporate.css",
  "src/styles.scss"
],
```

`angular.json` 파일을 수정했기 때문에 웹팩 테스트 서버를 재 기동합니다. 이제 보이는 군요! 화면 좌 상단에 햄버거 아이콘을 클릭하여 사이드바가 접히는지 확인하세요. 잘 되시죠? 좋습니다.

상단에 네이게이션 바는 없고 대신 사이드바를 주 메뉴로 사용한다고 판단됩니다. 상단 부분은 검색이나 사용자 관련 메뉴 등을 배치해서 사용하는 형태입니다. 공식 사이트에서 상단 네비게이션바 컴포넌트 찾을 수가 없습니다. 필요하다면 부트스트랩 네비게이션바를 사용해 보세요.

그러면 다음 작업으로 사이드바에 메인 메뉴를 추가해 보겠습니다.

## Menu

`https://akveo.github.io/nebular/docs/components/menu/overview#nbmenucomponent`

복잡할 것이 분명해 보이므로 컴포넌트를 만들어서 관련 설정을 분리하겠습니다.

```bash
$ ng g c layout/sidebar
```

**app.component.html**

```html
<nb-layout>

  <nb-layout-header fixed>
    <a href="#" (click)="toggle()"><i class="nb-menu"></i></a>
  </nb-layout-header>

  <nb-sidebar>
    <app-sidebar></app-sidebar>
  </nb-sidebar>

  <nb-layout-column>
    Page Content <button type="button" class="btn btn-primary">Button</button>
    <router-outlet></router-outlet>
  </nb-layout-column>

</nb-layout>
```

**sidebar.component.ts**

```ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbMenuService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { MENU_ITEMS } from '../../pages/pages-menu';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  menuItems = MENU_ITEMS;

  private alive: boolean = true;
  selectedItem: string;

  constructor(private menuService: NbMenuService) { }

  ngOnInit() { }

  ngOnDestroy() {
    this.alive = false;
  }

  addMenuItem() {
    this.menuService.addItems([{
      title: '@nebular/theme',
      target: '_blank',
      icon: 'nb-plus',
      url: 'https://github.com/akveo/ngx-admin',
    }], 'menu');
  }

  collapseAll() {
    this.menuService.collapseAll('menu');
  }

  navigateHome() {
    this.menuService.navigateHome('menu');
  }

  getSelectedItem() {
    this.menuService.getSelectedItem('menu')
      .pipe(takeWhile(() => this.alive))
      .subscribe((menuBag) => {
        this.selectedItem = menuBag.item.title;
      });
  }
}
```

`MENU_ITEMS` 부분에 에러가 발생합니다. 관련 파일 소스를 제공하고 있지 않습니다. `4201` 포트에서 돌고 있는 데모 프로젝트를 참고하여 필요한 파일을 찾았습니다.

데모 프로젝트의 `src/app/pages/pages-menu.ts` 파일을 복사해서 작업 프로젝트의 `src/app/pages/pages-menu.ts` 위치에 복사해 넣습니다.

**sidebar.component.scss**

```scss
[nbButton] {
  margin-right: 1rem;
  margin-bottom: 1rem;
}

h3 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
```

**sidebar.component.html**

```html
<nb-card size="xxlarge">
  <nb-card-body>
    <nb-menu tag="menu" [items]="menuItems"></nb-menu>
    <router-outlet></router-outlet>
    <!-- Menu Control -->
    <h3>Selected item: {{ selectedItem }}</h3>
    <button nbButton (click)="addMenuItem()">Add Menu Item</button>
    <button nbButton (click)="collapseAll()">Collapse all menu items</button>
    <button nbButton (click)="navigateHome()">Home</button>
    <button nbButton (click)="getSelectedItem()">Get Selected Item</button>
  </nb-card-body>
</nb-card>
```

여기까지 공식 사이트에 설명대로 작업을 완료했습니다. 확인을 해보시면 에러가 발생합니다. 하나씩 해결해 보겠습니다. 잘 따라오셔야 합니다. ^^;

**에러 1**  

```bash
Can't bind to 'items' since it isn't a known property of 'nb-menu'.
```

`nb-menu` 컴포넌트를 제공하는 모듈의 임포트가 필요합니다.

**에러 2**  

```bash
'nb-card-body' is not a known element
```

`nb-card-body` 컴포넌트를 제공하는 모듈의 임포트가 필요합니다.

**에러 3**  

```bash
StaticInjectorError(AppModule)[SidebarComponent -> NbMenuService]
```

`NbMenuService` 서비스를 공급하는 프로바이더가 없습니다. `NbMenuService` 서비스를 모듈에 등록해야 합니다.

**에러 4**  

```bash
StaticInjectorError(AppModule)[NbMenuComponent -> NbMenuInternalService
```

`NbMenuInternalService` 서비스를 공급하는 프로바이더가 없습니다. 그런데 `NbMenuComponent` 컴포넌트는 우리가 만든 컴포넌트가 아닙니다. 어쩌라는 걸까요? 에러메시지로 구글링을 해서 해답을 찾습니다. `NbMenuModule` 모듈은 그냥 임포트하면 안되고 함수를 호출해서 함수가 리턴하는 모듈을 설정해야 하는군요! `NbMenuModule.forRoot()` 코드를 사용하면 디폴트 설정 코드가 처리해서 `NbMenuInternalService` 서비스가 모듈 프로바이더에 등록된다고 이해하면 되겠습니다.

**app.module.ts**

```ts
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { NbMenuModule, NbCardModule, NbMenuService } from '@nebular/theme';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,

    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'corporate' }),
    NbLayoutModule,

    NbSidebarModule,

    NbMenuModule.forRoot(), // 에러 1, 에러 4
    NbCardModule, // 에러 2
  ],
  providers: [NbSidebarService, NbMenuService], // 에러 3
})
```

자 이제 화면이 보입니다. 참으로 가시밭길이군요. 여러분 고생이 많습니다. API 설명을 작성하는 개발자들은 교육자들이 아니기 때문에 많은 부분을 누락하는 경향이 있습니다. 이는 구글 개발자들도 마찬가지입니다. 오픈 소스의 단점으로 부족한 문서화를 지적하는 이유가 여기에 기인합니다.

그런데, 뭔가 이상합니다. 메뉴 하단에 버튼이 깨져 보입니다. 이 버튼은 코드적으로 메뉴를 제어할 수 있다는 것을 보여주기 위해서 존재합니다. 원래 정식 메뉴라면 여기에 있는 버튼은 삭제되어야 합니다. 더불어서 버튼이 너무 크게 보입니다. 이를 해결해 보겠습니다.

`https://akveo.github.io/nebular/docs/components/button/overview#nbbuttoncomponent`

**app.module.ts**

```ts
import { NbMenuModule, NbCardModule, NbMenuService, NbButtonModule } from '@nebular/theme';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,

    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'corporate' }),
    NbLayoutModule,

    NbSidebarModule,

    NbMenuModule.forRoot(), // 에러 1, 에러 4
    NbCardModule, // 에러 2
    NbButtonModule
  ],
  providers: [NbSidebarService, NbMenuService], // 에러 3
})
```

`NbButtonModule` 모듈을 추가합니다.

**sidebar.component.html**

```html
<button nbButton size="xsmall" (click)="addMenuItem()">Add Menu Item</button>
```

`size="xsmall"` 속성을 추가합니다. 자 화면을 확인합니다. 잘 해결이 됬군요. 수고하셨습니다.

## 아이콘 변경

메뉴의 아이콘과 글자가 너무 큽니다. 다음처럼 스타일 설정을 추가하면 됩니다.

**styles.scss**

```scss
html {
  font-size: 14px;
}
```

메뉴의 아이콘을 다른 걸로 바꾸어 보겠습니다. 다음 사이트를 참조하세요.

`http://akveo.com/ngx-admin/#/pages/ui-features/icons`

`eva` 아이콘 정보와 사용방법은 다음 사이트에서 학습합니다.

`https://www.npmjs.com/package/eva-icons`

**pages-menu.ts**

```ts
export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'E-commerce',
    // icon: 'nb-e-commerce',
    // icon: 'nb-heart',
    icon: 'eva eva-gift',
    link: '/pages/dashboard',
    home: true,
  },
  ...
]
```

`nb-e-commerce` 아이콘을 `nb-heart` 아이콘으로 변경하면 잘 적용됩니다. 그런데 `eva eva-gift` 아이콘으로 변경하면 표시되지 않습니다.

`eva` 아이콘 디펜던시가 없습니다. 디펜던시를 추가합니다.

```bash
$ npm i eva-icons
```

`eva` 아이콘의 CSS를 임포트합니다.

**angular.json**

```json
"styles": [
  "./node_modules/bootstrap/dist/css/bootstrap.css",
  "./node_modules/eva-icons/style/eva-icons.css",
  "./node_modules/nebular-icons/scss/nebular-icons.scss",
  "./node_modules/@nebular/theme/styles/prebuilt/corporate.css",
  "src/styles.scss"
],
```

이제 잘 보이는군요! 데모 프로젝를 살펴보니 스타일을 SASS로 작성했습니다. 입맛에 맞게 수정하려면 이와 관련한 지식의 습득이 선행되어야 하겠습니다. 그렇게 하기 곤란하다면 퍼블리셔와 협업하거나 데모 프로젝트를 기반으로 수정해서 작업하는 것도 괜찮아 보입니다. 관리모드 화면이라면 말이죠.

지금까지 간단하게 네뷸라 사용법을 살펴보았습니다. 네뷸라는 자주 사용하는 UI 라이브러리와 관련기술을 모은 것으로써 템플릿 라이브러에 해당합니다. 이를 사용하면 보다 빠르게 화면을 구성할 수 있습니다. auth, security 관련 모듈도 지원한다는 것도 매우 매력적으로 느껴집니다.
