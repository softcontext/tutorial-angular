# Module

앵귤러 앱은 모듈로 구성되며 앵귤러는 NgModules 이라는 자체 모듈 시스템을 사용합니다. 모든 앵귤러 앱에는 적어도 하나의 NgModule 클래스가 존재합니다. 루트 모듈은 작은 응용 프로그램에서 유일한 모듈 일 수 있지만 대부분의 응용 프로그램은 많은 기능 모듈을 필요로 합니다. NgModule 클래스는 `@NgModule` 데코레이터가 있는 클래스입니다. `@NgModule` 데코레이터는 모듈을 설정하는 정보를 가진 메타 데이터 객체를 취하는 데코레이터 함수입니다. 설정 정보를 가진 객체에서 가장 중요한 속성은 다음과 같습니다.

* `declarations`  
이 모듈에 속한 뷰 클래스를 정의합니다. 앵귤러에는 세 가지 뷰 관련 클래스가 있습니다. Component, Directive 및 Pipe가 그것 입니다. 뷰 클래스를 다른 모듈에서 선택자 또는 이름으로 직접 사용하기 위해서는 명시적으로 `exports` 속성에 등록해야 합니다.

* `exports`  
다른 모듈의 구성 요소 템플릿에서 볼 수 있고 사용할 수 있어야 하는 뷰 클래스를 정의합니다. 

* `imports`  
다른 모듈이 제공하는 뷰 클래스를 사용하기 위해서는 해당 자원을 `exports` 하고 있는 대상 모듈을 여기에 정의해야 합니다.

* `providers`  
서비스 생성자 함수를 정의합니다. 앱의 모든 부분에서 액세스 할 수 있게 됩니다. 서비스는 명시적으로 `exports` 하지 않아도 다른 모듈에 제공됩니다. 보다 자세히 설명하자면 루트 모듈이 다른 모듈을 임포트하면 서비스 클래스들을 모두 루트 모듈의 프로바이더가 객체로 생성하고 모듈의 인젝터가 DI 서비스를 제공합니다.

* `bootstrap`  
루트 컴포넌트라고 부르는 다른 모든 뷰를 호스팅하는 기본 뷰 컴포넌트를 정의합니다. 루트 모듈만이 `bootstrap: [AppComponent]` 속성을 설정해야 합니다.

루트 모듈은 최초로 기동하는 모듈이므로 타 모듈이 이를 임포트할 수 없기 때문에 아무 것도 exports 할 필요가 없습니다. 

루트 컴포넌트인 `AppComponent`는 `body` 태그의 역할을 수행합니다. 이는 브라우저에게 전달되는 `index.html` 파일의 `body` 태그의 자식으로 `AppComponent`를 가리키는 `<app-root></app-root>` 설정만이 존재하기 때문입니다. `<app-root>` 태그의 시작태그와 마감태그 사이에 내용은 처음에는 표시되지만 컴포넌트 생성작업이 끝나서 배치되면 덮어씌어져서 사라지게 됩니다.

## 앵귤러가 제공하는 모듈

* `@angular/animations` : 애니메이션 관련 모듈, Angular Material 라이브러리가 제공하는 UI 컴포넌트를 사용할 때 필요
* `@angular/common` : 빌트인 파이프, 속성 디렉티브(ngClass, ngStyle), 구조 디렉티브(ngIf, ngFor, ngSwitch) 등을 제공
* `@angualr/core` : 핵심 모듈, 컴포넌트 라이프 사이클 인터페이스 및 대부분의 데코레이터를 제공
* `@angular/forms` : 폼처리(ngModel), 데이터 검증 관련 모듈
* `@angular/http` : HTTP 통신 관련 모듈, 이를 사용하지 않고 `axios` 같은 외부 모듈을 사용하기도 함
* `@angular/platform-browser` : 브라우저 연동 관련 모듈, 새니타이저(HTML Escape) 제공
* `@angular/router` : 라우팅 처리 관련 모듈

## 루트 모듈: AppModule

앵귤러는 루트 모듈이라는 최상위 모듈을 통해 앱을 구성합니다. 앱 영역에서 사용하는 컴포넌트, 지시자, 파이프, 서비스를 가질 수 있으며 사용하는 다른 모듈을 등록하고 관리합니다. 모듈은 관심사에 따라 모듈을 분리하여 사용하는 것이 좋습니다. 컴포넌트의 재 사용성을 극대화하기 위해서 컴포넌트와 컴포넌트가 강 결합으로 사용하는 자원을 하나의 모듈로 묶는 것이 최신 유행이며 대부분의 UI 컴포넌트 라이브러리가 이렇게 서비스를 제공하고 있습니다. 루트 모듈은 프로젝트 스캐폴딩 시 자동으로 생성되므로 개발자가 추가적으로 생성해야 하는 모듈은 다음과 같습니다.

* `핵심 모듈: Core Module`  
항상 사용하는 기능을 모은 모듈입니다. 주로 루트 모듈에서 임포트해서 사용합니다.

* `특징 모듈: Feature Module`  
특정 기능을 처리하는 모듈입니다. 일반적으로 관심사에 따라 모듈을 따로 구성합니다. 주로 루트 모듈에서 임포트해서 사용합니다.

* `공유 모듈: Share Module`  
여러 모듈에서 반복적으로 사용되는 기능을 모은 모듈입니다. 주로 특징 모듈에서 임포트해서 사용합니다. 공유 모듈은 일종의 유틸리티 라이브러리 같은 모듈입니다.

추가로 모듈의 라우팅 로직을 별도로 분리한 모듈 전용 라우팅 모듈을 사용하기도 합니다.  기술적으로는 라우팅 모듈을 재 사용할 수 있지만 현실적으로 관련한 컴포넌트들과 연동 URI가 모두 같은 경우는 거의 없을 것이므로 라우팅 모듈은 특정 모듈의 라우팅 로직을 분리한 용도라고 보는 것이 타당하겠습니다.

# 모듈 연습을 위한 프로젝트 생성

```bash
$ ng new my-module
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? SCSS   [ http://sass-lang.com   ]
```

* 루트 모듈 파일이 생성됩니다.
  - `app.module.ts`
* 루트 컴포넌트 관련 파일이 생성됩니다.
  - `app.component.ts`
  - `app.component.html`
  - `app.component.scss`
  - `app.component.spec.ts`
* 프로젝트 생성 시 동의했다면 라우팅 처리를 위한 모듈 파일이 추가로 생성됩니다.
  - `app-routing.module.ts`

## 새 모듈 생성

기본적으로 컴포넌트와 모듈은 해당 이름의 폴더가 생성되고 폴더 밑으로 필요한 파일이 생성됩니다. 폴더가 이미 존재한다면 폴더를 새로 생성하지는 않습니다.

핵심 모듈을 생성합니다. CLI 명령을 하나씩 수행한 후에는 꼭 변화를 살펴보시기 바랍니다.

```bash
$ ng g m core --module=app
CREATE src/app/core/core.module.ts (188 bytes)
UPDATE src/app/app.module.ts (466 bytes)
```

위 명령은 `ng generate module core --module=app` 명령을 줄여서 사용한 것입니다. 새 모듈을 만들 때 `--module=app` 옵션을 사용하면 루트 모듈인 `app` 모듈에서 `core` 모듈을 임포트하는 설정이 추가됩니다.

**app.module.ts**

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule // --module=app
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

`BrowserModule` 모듈을 임포트하면 `CommonModule` 모듈의 임포트 설정은 생략할 수 있습니다. `CommonModule` 모듈은 빌트인 파이프, 디렉티브 등을 제공하므로 항상 필요한 모듈이라 할 수 있습니다. `BrowserModule` 모듈은 루트 모듈만 임포트하면 됩니다.

그래서, 루트 모듈은 다음 설정을 사용합니다.  
`import { BrowserModule } from '@angular/platform-browser';`

그리고, 서브 모듈은 대신 다음 설정을 사용합니다.  
`import { CommonModule } from '@angular/common';`

다음으로 특징 모듈을 생성합니다.

```bash
$ ng g m member --module=app --routing=true
CREATE src/app/member/member-routing.module.ts (249 bytes)
CREATE src/app/member/member.module.ts (279 bytes)
UPDATE src/app/app.module.ts (531 bytes)
```

`--routing=true` 옵션을 사용하면 라우팅 설정을 위한 `member-routing.module.ts` 파일이 추가적으로 생생성됩니다. 

이번에는 공유 모듈을 생성합니다.

```bash
$ ng g m share --module=member
CREATE src/app/share/share.module.ts (189 bytes)
UPDATE src/app/member/member.module.ts (349 bytes)
```

`share` 모듈을 `member` 모듈이 임포트하여 사용할 예정입니다. `member` 모듈을 `app` 모듈이 임포트 하고 있으므로 루트 모듈인 `app` 모듈에서 `share` 모듈이 제공하는 자원을 사용할 수 있게 됩니다.

특징 모듈을 하나 더 생성합니다. 이 모듈은 다른 모듈에서 명시적으로 임포트하지 않습니다.

```bash
$ ng g m player
CREATE src/app/player/player.module.ts (190 bytes)
```

player 모듈은 루트 모듈에서 정적으로 임포트하지 않고 라우팅 설정으로 사용자가 해당 모듈의 컴포넌트를 요구할 때 모듈을 인스턴스하는 방식으로 사용할 것입니다. 이를 `Lazy Loading Module` 이라고 부릅니다.

## 컴포넌트를 특정 모듈에 등록하기

앵귤러에서는 자동으로 생성된 `app.component`는 HTML의 `body` 태그의 역할을 위임받습니다. 그래서 루트 컴포넌트를 전체화면으로 취급할 수 있습니다. 화면을 블록화하여 조립하는 것이 관리하기에 더 좋으므로 되도록 루트 컴포넌트에서 엘리먼트를 직접 사용하는 것은 좋지 않습니다. 

첫 화면을 담당할 컴포넌트를 생성합니다.

```bash
$ ng g c home
CREATE src/app/home/home.component.html (23 bytes)
CREATE src/app/home/home.component.spec.ts (614 bytes)
CREATE src/app/home/home.component.ts (262 bytes)
CREATE src/app/home/home.component.scss (0 bytes)
UPDATE src/app/app.module.ts (467 bytes)
```

컴포넌트를 만들 때 모듈을 지정하지 않으면 기본적으로 루트 모듈에 컴포넌트가 등록됩니다.

타이틀은 언제나 사용할 것이므로 `core` 모듈에 등록하는 것이 좋겠습니다.

```bash
$ ng g c core/title --export=true
CREATE src/app/core/title/title.component.html (24 bytes)
CREATE src/app/core/title/title.component.spec.ts (621 bytes)
CREATE src/app/core/title/title.component.ts (266 bytes)
CREATE src/app/core/title/title.component.scss (0 bytes)
UPDATE src/app/core/core.module.ts (260 bytes)
```

컴포넌트를 만들 때 `title` 이라는 컴포넌트명 앞에 `core` 폴더를 지정했습니다. 이 때, `core` 폴더 밑에 `core.module.ts` 모듈 파일이 존재하면 `CoreModule` 모듈에 컴포넌트가 자동으로 등록됩니다. `--export=true` 옵션을 사용하면 `title` 컴포넌트를 익스포트하는 설정이 `core` 모듈에 추가됩니다. 익스포트된 컴포넌트는 `core` 모듈을 임포트한 모듈의 컴포넌트에서 바로 셀렉터를 사용할 수 있게 됩니다.

**core.module.ts**

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './title/title.component';

@NgModule({
  declarations: [TitleComponent],
  imports: [
    CommonModule
  ],
  exports: [TitleComponent] // --export=true
})
export class CoreModule { }
```

`member` 컴포넌트를 생성하고 `member` 모듈에 `member` 컴포넌트를 등록합니다.

```bash
$ ng g c member --module=member
CREATE src/app/member/member.component.html (25 bytes)
CREATE src/app/member/member.component.spec.ts (628 bytes)
CREATE src/app/member/member.component.ts (270 bytes)
CREATE src/app/member/member.component.scss (0 bytes)
UPDATE src/app/member/member.module.ts (259 bytes)
```

컴포넌트를 만들 때 옵션으로 `member`를 지정했으므로 `member` 모듈에 컴포넌트가 등록됩니다. 이미 `member` 폴더가 존재하므로 컴포넌트를 위한 폴더는 추가적으로 생성되지 않습니다.

**member.module.ts**

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberRoutingModule } from './member-routing.module';
import { ShareModule } from '../share/share.module';
import { MemberComponent } from './member.component';

@NgModule({
  declarations: [MemberComponent], // --module=member
  imports: [
    CommonModule,
    MemberRoutingModule,
    ShareModule
  ]
})
export class MemberModule { }
```

다음으로 `player` 모듈에 `player` 컴포넌트를 생성합니다.

```bash
$ ng g c player --module=player
CREATE src/app/player/player.component.html (25 bytes)
CREATE src/app/player/player.component.spec.ts (628 bytes)
CREATE src/app/player/player.component.ts (270 bytes)
CREATE src/app/player/player.component.scss (0 bytes)
UPDATE src/app/player/player.module.ts (259 bytes)
```

컴포넌트를 만들 때 옵션으로 `player`를 지정했으므로 `player` 모듈에 컴포넌트가 등록됩니다. 이미 `player` 폴더가 존재하므로 컴포넌트를 위한 폴더는 추가적으로 생성되지 않습니다.

## 서비스를 특정 모듈에 등록하기

서비스는 컴포넌트와 달리 전용 폴더가 생성되지 않습니다. 서비스명만 주는 경우 `src/app` 폴더 밑으로 서비스 파일이 생성됩니다.

```bash
$ ng g s share/data-share
CREATE src/app/share/data-share.service.spec.ts (349 bytes)
CREATE src/app/share/data-share.service.ts (138 bytes)
```

이미 `share` 폴더가 존재하고 있는 상태입니다. 서비스는 기본적으로 위치에 상관 없이 루트 모듈에 등록되도록 설정됩니다. 이와 관련한 설정은 다음과 같습니다.

`@Injectable({ providedIn: 'root' })`

6버전에서 도입된 새로운 문법으로 위 설정으로 서비스는 루트 모듈의 프로바이더가 처리합니다. 서비스를 `share` 모듈에 등록하려면 위 설정 객체를 삭제하고 `share` 모듈에 다음 설정을 추가하면 됩니다.

**data-share.service.ts**

```ts
import { Injectable } from '@angular/core';

@Injectable(
  // { providedIn: 'root' } // 삭제
)
export class DataShareService {
  data: string = 'DataShareService';

  constructor() { }
}
```

**share.module.ts**

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataShareService } from './data-share.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [DataShareService] // 직접 등록
})
export class ShareModule { }
```

컴포넌트와 달리 서비스는 명시적으로 익스포트 하지 않아도 다른 모듈에게 제공됩니다. 임포트 된 다수의 모듈이 갖고 있는 서비스는 모두 루트 모듈의 컨테이너에서 싱글톤으로 관리됩니다.

서비스를 여러개 만들어서 앞서 설정에 따른 차이점이 있는지 살펴보겠습니다.

```bash
$ ng g s core/user-http
CREATE src/app/core/user-http.service.spec.ts (344 bytes)
CREATE src/app/core/user-http.service.ts (137 bytes)
```

**user-http.service.ts**

```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {
  data: string = 'UserHttpService';

  constructor() { }
}
```

기본적으로 서비스는 파일이 만들어지는 위치가 중요하지 않습니다. 서비스 생성 시 `core/` 폴더를 지정했다고 특별히 달라지는 것이 없습니다.

```bash
$ ng g s player/player-http
CREATE src/app/player/player-http.service.spec.ts (354 bytes)
CREATE src/app/player/player-http.service.ts (139 bytes)
```

**player-http.service.ts**

```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerHttpService {
  data: string = 'PlayerHttpService';

  constructor() { }
}
```

서비스는 위치에 상관없이 서비스 설정이 `providedIn: 'root'` 설정이냐 아니냐로 구분하시면 됩니다. 대부분 기본 설정을 그대로 두고 사용하시면 됩니다.

```bash
$ ng g s player/coach-http
CREATE src/app/player/coach-http.service.spec.ts (349 bytes)
CREATE src/app/player/coach-http.service.ts (138 bytes)
```

**coach-http.service.ts**

```ts
import { Injectable } from '@angular/core';

@Injectable(
  // { providedIn: 'root' } // 삭제
)
export class CoachHttpService {
  data: string = 'CoachHttpService';

  constructor() { }
}
```

**player.module.ts**

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { CoachHttpService } from './coach-http.service';

@NgModule({
  declarations: [PlayerComponent],
  imports: [
    CommonModule
  ],
  providers: [CoachHttpService] // 직접 등록
})
export class PlayerModule { }
```

서비스 생성 시 설정된 기본설정을 지우고 특정 모듈에 서비스를 등록할 수 있습니다. 보통 이러한 작업을 수행할 때는 해당 서비스를 다른 모듈에서 이용할 필요가 없다고 판단될 때 입니다. 하지만 이 모듈을 루트 모듈이 명시적으로 임포트하면 이 모듈이 가진 서비스를 이용할 수 있습니다. 문제가 되는 것은 정적으로 모듈을 임포트하지 않고 동적(라우팅 연동 시)으로 임포트할 때 입니다.

## 작업 결과

```bash
: 전용 모듈 임 (해당 모듈만 사용 함)
* 등록 됨 (해당 모듈이 소유 함)
+ 임포트 당함
# 익스포트 함 (명시적인 제공 선언)
@providedIn 서비스 클래스에 설정 함
@providers 모듈 클래스에 설정 함

app.module : app-routing.module #
* home.component
* user-http.service @providedIn
* player-http.service @providedIn

  + core.module
  * title.component #

  + member.module : member-routing.module #
  * member.component

    + share.module
    * data-share.service @providers
    
---정적으로 연관되어 있지 않음(라우팅 처리로 연동)---

player.module
* player.component
* coach-http.service @providers
```

## 라우팅으로 여러 모듈의 컴포넌트 사용하기

**app.module.ts**

```ts
import { BrowserModule } from '@angular/platform-browser';
// import { CommonModule } from '@angular/common'; // BrowserModule을 임포트하면 생략가능
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { MemberModule } from './member/member.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    MemberModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

**app-routing.module.ts**

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { TitleComponent } from './core/title/title.component';
import { MemberComponent } from './member/member.component';
// import { PlayerComponent } from './player/player.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'title', component: TitleComponent },
  { path: 'member', component: MemberComponent },

  // Uncaught Error:
  // Component PlayerComponent is not part of any NgModule
  // or the module has not been imported into your module.
  // { path: 'player', component: PlayerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

**app.component.html**

```html
<div class="title">
  <app-title></app-title>
</div>

<div class="navi">
  <nav>
    <a routerLink="home">Home</a>{{' '}}
    <a routerLink="title">Title</a>{{' '}}
    <a routerLink="member">Member</a>
  </nav>
</div>

<div class="outlet">
  <router-outlet></router-outlet>
</div>
```

**app.component.scss**

```scss
/deep/ .title > app-title > p {
  font-size: 2rem;
}

.navi,
.outlet {
  padding: 1rem;
}

.outlet {
  border: 1px solid silver;
}
```

`/deep/` 설정은 기본적으로 적용되는 ViewEncapsulation.Emulated 방식에서 컴포넌트의 CSS 설정은 해당 컴포넌트의 HTML 엘리먼트에게만 영향을 주기 위한 구분 선택자 속성을 붙이지 않도록 조치합니다. 단어의 뜻으로만 보면 마치 컴포넌트 자신과 자신의 자식 컴포넌트에게만 영향을 줄 것 같지만 그렇지 않으니 주의가 필요합니다. 오히려 `global` 이라는 의미로 생각하는 것이 더 좋을 듯 합니다. 

CSS 선택자에서 커스텀 태그 `app-title`를 이용할 수 있다는 데 주목해 주십시오. 이는 컴포넌트를 사용하는 측에서 컴포넌트 내부 CSS에 영향을 주어 컴포넌트를 사용할 때 입맛대로 디자인을 적용할 수 있다는 의미가 됩니다.

`.title` 클래스 밑으로 사용하는 `app-title` 컴포넌트의 `p` 태그는 글자가 커지겠지만 클래스 없이 그냥 사용하는 `app-title` 컴포넌트의 `p` 태그에는 영향을 주지않습니다.

CSS에 대한 추가적인 설명은 뒤에서 별도로 하는걸로 하고 이만 작업 결과를 확인해 보겠습니다. 화면에서 여러 링크를 클릭해 보시기 바랍니다.

`app` 루트 모듈이 가진 `home` 컴포넌트를 라우팅 매핑에서 사용할 수 있습니다.  
`core` 모듈이 가진 `title` 컴포넌트를 라우팅 매핑에서 사용할 수 있습니다.  
`member` 모듈이 가진 `member` 컴포넌트를 라우팅 매핑에서 사용할 수 있습니다.  

하지만,  

`player` 모듈이 가진 `player` 컴포넌트를 라우팅 매핑에서 사용할 수 없습니다.

사용하려고 하면 다음과 같은 에러 메시지를 보게됩니다.

```bash
Uncaught Error:
Component PlayerComponent is not part of any NgModule
or the module has not been imported into your module.
```

결론적으로 루트 모듈이 가지거나 루트 모듈이 임포트 한 모듈이 가진 컴포넌트는 사용할 수 있으나 그렇지 않은 모듈의 컴포넌트는 사용할 수 없는 것으로 정리가 됩니다.

## selector로 여러 모듈의 컴포넌트 사용하기

컴포넌트를 선언할 때 `selector` 속성에 설정한 문자열을 마치 커스텀 태그처럼 사용할 수 있습니다. 명쾌한 설명을 위해 `selector`라는 용어보다 커스텀 태그라는 용어를 사용하겠습니다.

**app.component.html**

```html
<div class="title">
  <app-home></app-home>
  <app-title></app-title>
  <!--
  Uncaught Error: Template parse errors:
  'app-member' is not a known element:
  1. If 'app-member' is an Angular component,
    then verify that it is part of this module.
  2. If 'app-member' is a Web Component
    then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas'
    of this component to suppress this message. ("<div class="title">
   -->
  <!-- <app-member></app-member> -->
  <!-- <app-player></app-player> -->
</div>

<div class="navi">
  <nav>
    <a routerLink="home">Home</a>{{' '}}
    <a routerLink="title">Title</a>{{' '}}
    <a routerLink="member">Member</a>
  </nav>
</div>

<div class="outlet">
  <router-outlet></router-outlet>
</div>
```

여러 컴포넌트를 커스텀 태그로 배치할 수 있는지 결과를 확인해 보겠습니다.

`app` 루트 모듈이 가진 `home` 컴포넌트를 커스텀 태그로 사용할 수 있습니다.  
`core` 모듈이 가진 `title` 컴포넌트를 커스텀 태그로 사용할 수 있습니다.  

하지만,  

`member` 모듈이 가진 `member` 컴포넌트를 커스텀 태그로 사용할 수 없습니다.  

그리고,  

`player` 모듈이 가진 `player` 컴포넌트를 커스텀 태그로 사용할 수 없습니다.

사용하려고 하면 다음과 같은 에러 메시지를 보게됩니다.

```bash
Uncaught Error: Template parse errors:
'app-member' is not a known element:
1. If 'app-member' is an Angular component,
  then verify that it is part of this module.
2. If 'app-member' is a Web Component
  then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas'
  of this component to suppress this message. ("<div class="title">
```

결론적으로 컴포넌트를 커스텀 태그(selector)로 사용하기 위해서는 해당 컴포넌트가 루트 모듈의 소속이거나 소유한 모듈이 명시적으로 제공하겠다는 선언을 한 경우에만 가능하다는 것을 알 수 있습니다. 다음 예처럼 컴포넌트를 가진 모듈에서 `명시적인 제공 선언` 설정을 해야한다는 뜻입니다.

**core.module.ts**

```ts
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './title/title.component';

@NgModule({
  declarations: [TitleComponent],
  imports: [
    CommonModule
  ],
  exports: [TitleComponent] // 명시적인 제공 선언
})
export class CoreModule { }
```

## 여러 모듈의 서비스 사용하기

앞서서 뷰 처리에 대표주자인 컴포넌트를 사용하여 여러 모듈에 분산되어 있는 상태에서의 뷰 처리 관련 구성요소의 사용방법을 정리해 보았습니다. 그런데, 서비스는 조금 개념이 다릅니다. 우선, 서비스는 싱글톤으로 관리됩니다. 해당 객체는 프로그램 내에서 단 1개만 생성되고 이를 필요할 때만 공유해서 사용한다는 뜻입니다. 이전 버전에서는 서비스는 EAGER 방식으로 미리 만들어 놓고 DI 서비스를 제공했는데 이제는 서비스를 누군가 요구할 때 생성해서 제공하는 LAZY 방식으로 변경되었습니다. 서비스는 없으면 만들고 있으면 재 사용합니다.

**home.component.ts**

```ts
import { Component, OnInit } from '@angular/core';

import { UserHttpService } from '../core/user-http.service';
import { PlayerHttpService } from '../player/player-http.service';
import { DataShareService } from '../share/data-share.service';
// import { CoachHttpService } from '../player/coach-http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private userHttpService: UserHttpService,
    private playerHttpService: PlayerHttpService,
    private dataShareService: DataShareService,
    /**
     * ERROR Error:
     * StaticInjectorError(AppModule)[HomeComponent -> CoachHttpService]:
     * StaticInjectorError(Platform: core)[HomeComponent -> CoachHttpService]:
     *   NullInjectorError: No provider for CoachHttpService!
     */
    // private coachHttpService: CoachHttpService
  ) { }

  ngOnInit() { }

}
```

결과를 확인해 보겠습니다.

`providedIn: 'root'` 설정을 가진 `UserHttpService` 서비스는 사용할 수 있습니다.  
`providedIn: 'root'` 설정을 가진 `PlayerHttpService` 서비스는 사용할 수 있습니다.  

`app` 루트 모듈이 `member` 모듈을 임포트 하고,  
`member` 모듈이 `share` 모듈을 임포트 할 때,  
`share` 모듈이 `providers: [DataShareService]` 설정으로 가진  
`DataShareService` 서비스는 사용할 수 있습니다.  

하지만,  

`player` 모듈이 `providers: [CoachHttpService]` 설정으로 가진  
`CoachHttpService` 서비스는 사용할 수 없습니다. 

사용하려고 하면 다음과 같은 에러 메시지를 보게됩니다.

```bash
ERROR Error:
StaticInjectorError(AppModule)[HomeComponent -> CoachHttpService]:
StaticInjectorError(Platform: core)[HomeComponent -> CoachHttpService]:
  NullInjectorError: No provider for CoachHttpService!
```

결론적으로 서비스는 `providedIn: 'root'` 설정을 가진경우, 위치에 상관없이 루트 모듈의 프로바이더가 객체를 생성하므로 사용할 수 있게 됩니다. 그런데, 앵귤러 초기 버전에서 서비스를 등록하던 방식인 모듈에 `providers: [CoachHttpService]` 설정으로 등록한 경우에는 해당 모듈을 루트 모듈이 임포트 하거나 루트 모듈이 임포트 하는 모듈이 서비스를 가진 모듈을 임포트 한 경우에만 사용할 수 있다는 것을 알 수 있습니다.

## Lazy Loading 모듈의 컴포넌트 및 서비스 사용하기

루트 모듈에서 정적으로 임포트하지 않은 모듈의 자원을 이용할 수 있는 방법이 있습니다. 바로 라우팅 처리를 통해서 해당 모듈을 Lazy Loading 모듈로 지정하면 가능하게 됩니다. 관련한 설정을 먼저 해보고 설명을 이어가도록 하겠습니다.

**app-routing.module.ts**

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { TitleComponent } from './core/title/title.component';
import { MemberComponent } from './member/member.component';
// import { PlayerComponent } from './player/player.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'title', component: TitleComponent },
  { path: 'member', component: MemberComponent },

  // Uncaught Error:
  // Component PlayerComponent is not part of any NgModule
  // or the module has not been imported into your module.
  // { path: 'player', component: PlayerComponent },

  { path: 'player', loadChildren: 'src/app/player/player.module#PlayerModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

`loadChildren` 속성에 값으로 사용자가 `<a routerLink="player">Player</a>` 링크를 클릭하여 URI가 `player`로 변경될 때 `Lazy Loading` 처리를 수행할 모듈의 패스문자열을 설정합니다. 설정 문법은 다음과 같습니다. 앵귤러 버전에 따라 설정하는 방법이 다소 차이가 있으니 주의하시기 바랍니다.

`{ path: '연동URI', loadChildren: '모듈파일패스#모듈클래스이름' }`

**app.component.html**

```html
<div class="title">
  <app-home></app-home>
  <app-title></app-title>
  <!--
  Uncaught Error: Template parse errors:
  'app-member' is not a known element:
  1. If 'app-member' is an Angular component,
    then verify that it is part of this module.
  2. If 'app-member' is a Web Component
    then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas'
    of this component to suppress this message. ("<div class="title">
   -->
  <!-- <app-member></app-member> -->
  <!-- <app-player></app-player> -->
</div>

<div class="navi">
  <nav>
    <a routerLink="home">Home</a>{{' '}}
    <a routerLink="title">Title</a>{{' '}}
    <a routerLink="member">Member</a>{{' '}}
    <a routerLink="player">Player</a>
  </nav>
</div>

<div class="outlet">
  <router-outlet></router-outlet>
</div>
```

`player` 모듈이 가지고 있는 `player` 컴포넌트를 라우팅 처리로 `<router-outlet>` 태그 밑에 배치합니다. 사용자의 편의를 위해서 앵커태그를 추가합니다.

**player.module.ts**

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { CoachHttpService } from './coach-http.service';

import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', component: PlayerComponent },
];

@NgModule({
  declarations: [PlayerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [CoachHttpService]
})
export class PlayerModule { }
```

루트 모듈은 `RouterModule.forRoot(routes)` 함수로 라우팅 로직을 전달하지만 서브 모듈은 `RouterModule.forChild(routes)` 함수를 사용해야 합니다.

URI 문자열에 따른 컴포넌트 연동 설정 부분을 유심히 보셔야 합니다. 루트 모듈에서 `path: ''` 라고 설정하면 이는 도메인 루트를 의미합니다. 하지만, `Lazy Loading` 하는 모듈에서 `path: ''` 라고 하는 설정은 이 모듈을 호출할 때 사용한 URI 문자열 상태를 의미합니다. 브라우저 주소창에 문자열을 보겠습니다. 

`http://localhost:4200/player`

`player` 이라고 하는 URI 문자열과 `loadChildren: 'src/app/player/player.module#PlayerModule'` 설정으로 `player` 모듈을 로딩했습니다. 그 다음에 할일은 보여줄 컴포넌트를 지정하는 것입니다. 이 때, 이미 `player`라고 하는 문자열은 모듈 기동으로 소비했으므로 라우팅 매핑 로직에서는 `path: ''` 라고 하는 설정을 사용하는 것입니다.

정리하자면 `Lazy Loading` 하는 모듈에서 `path: ''` 라고 하는 설정에 연동되는 URL은 도메인 루트가 아니라 `http://localhost:4200/player` 상태라는 것입니다.

지금까지 루트 모듈에서 정적으로 임포트하지 않은 모듈의 컴포넌트를 라우팅 처리로 사용할 수 있다는 것을 알아보았습니다. 

그렇다면 서비스도 비슷하게 사용할 수 있게 되는 걸까요? 그렇지 않습니다. 

서비스는 파일의 위치에 상관없이,  

`providedIn: 'root'` 설정을 가진 `PlayerHttpService` 서비스는 사용할 수 있습니다.  

하지만,  

`player` 모듈이 `providers: [CoachHttpService]` 설정으로 가진  `CoachHttpService` 서비스는 사용할 수 없습니다. 

`CoachHttpService` 서비스를 다른 모듈에서 사용하기 위해서 `player` 모듈을 다른 모듈에서 정적으로 임포트해야만 가능합니다.

`Lazy Loading` 되는 모듈의 서비스는 해당 모듈의 프로파이더가 객체를 생성하여 제공합니다. 즉, 루트 모듈의 컨테이너에 서비스 객체가 존재하는 것이 아니라 `Lazy Loading` 된 서브 모듈의 컨테이너에 서비스 객체가 존재하게 됩니다.

**player.component.ts**

```ts
import { Component, OnInit } from '@angular/core';

import { CoachHttpService } from './coach-http.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  constructor(private coachHttpService: CoachHttpService) {
    console.log(coachHttpService);
  }

  ngOnInit() { }

}
```

# 구성요소의 객체 생성시기

## 모듈의 객체 생성시기

모듈의 객체 생성시기를 알아보기 위해서 각 모듈 클래스 생성자에 로그를 추가합니다.

**app.module.ts**

```ts
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    MemberModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    console.log('AppModule()');
  }
}
```

```bash
AppRoutingModule()
core.module.ts:17 CoreModule()
share.module.ts:15 ShareModule()
member.module.ts:16 MemberModule()
app.module.ts:28 AppModule()
```

결과를 보면 루트 모듈의 `imports` 속성에 설정한 순서대로 객체가 된다는 것을 알 수 있습니다. 루트 모듈이 의존하는 모듈 객체가 먼저 만들어지고 이를 루트 모듈에게 제공한다고 이해할 수 있습니다. 그래서 루트 모듈인 `AppModule`이 가장 나중에 객체가 됩니다.

`MemberModule` 모듈이 의존하는 `ShareModule` 모듈이 먼저 객체가 되는 것은 같은 원리입니다.

`Lazy Loading` 방식인 `PlayerModule` 모듈은 URL이 `http://localhost:4200/player`이 될 때 생성됩니다.

## 컴포넌트의 객체 생성시기

컴포넌트의 객체 생성시기를 알아보기 위해서 각 컴포넌트 클래스 생성자에 로그를 추가합니다.

**app.component.html**

```html
<div class="title">
  <app-home></app-home>
  <app-title></app-title>
</div>

<div class="navi">
  <nav>
    <a routerLink="home">Home</a>{{' '}}
    <a routerLink="title">Title</a>{{' '}}
    <a routerLink="member">Member</a>{{' '}}
    <a routerLink="player">Player</a>
  </nav>
</div>

<div class="outlet">
  <router-outlet></router-outlet>
</div>
```

첫 화면이 떴을 때 로그를 보면 다음과 같습니다.

```bash
HomeComponent() // ⓐ
TitleComponent() // ⓑ
HomeComponent() // ⓒ
```

* ⓐ : `<app-home></app-home>` 의해서 컴포넌트가 생성됩니다.
* ⓑ : `<app-title></app-title>` 의해서 컴포넌트가 생성됩니다.
* ⓒ : `{ path: '', redirectTo: 'home', pathMatch: 'full' } ==> { path: 'home', component: HomeComponent }` 의해서 컴포넌트가 생성됩니다.

컴포넌트 화면에서 사용할 때 만들어지고 여러번 사용하면 매번 새로운 객체가 만들어 집니다.

## 디렉티브의 객체 생성시기

```bash
$ ng g d share/directive/highlight --export=true --spec=false
CREATE src/app/share/directive/highlight.directive.ts (147 bytes)
UPDATE src/app/share/share.module.ts (457 bytes)
```

**highlight.directive.ts**

```ts
import { Directive } from '@angular/core';
import { ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter')
  set() {
    this.renderer.setStyle(this.el.nativeElement, 'font-size', '1.5rem');
  }

  @HostListener('mouseleave')
  reset() {
    this.renderer.removeStyle(this.el.nativeElement, 'font-size');
  }

}
```

**share.module.ts**

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataShareService } from './data-share.service';
import { HighlightDirective } from './directive/highlight.directive';

@NgModule({
  declarations: [HighlightDirective],
  imports: [
    CommonModule
  ],
  providers: [DataShareService],
  exports: [HighlightDirective] // --export=true
})
export class ShareModule {
  constructor() {
    console.log('ShareModule()');
  }
}
```

**member.component.html**

```html
<p highlight>
  member works!
</p>
```

`member` 컴포넌트의 `p` 태그에 마우스를 올리면 글자가 커집니다. 따라서, `share` 모듈의 `highlight` 디렉티브가 `member` 모듈의 컴포넌트에 잘 적용된 것입니다.

**home.component.html**

```html
<p highlight>
  home works!
</p>
```

그런데 루트 모듈의 `home` 컴포넌트의 `p` 태그에 설정한 `highlight` 디렉티브는 작동하지 않습니다. 어떻게 된 것일까요? 

**member.module.ts**

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareModule } from '../share/share.module';
import { MemberComponent } from './member.component';

@NgModule({
  declarations: [MemberComponent],
  imports: [
    CommonModule,
    ShareModule
  ],
  exports: [ShareModule] // 추가
})
export class MemberModule {
  constructor() {
    console.log('MemberModule()');
  }
}
```

`member` 모듈이 임포트 한 `share` 모듈을 `exports` 속성에 추가합니다. 그런 다음 `home` 컴포넌트의 `p` 태그에 마우스를 올리면 잘 작동함을 알 수 있습니다. 

정리하자면 뷰 처리 관련 구성요소를 소유한 모듈 `share` 모듈이 명시적으로 익스포트했다면 그 모듈을 임포트 한 `member` 모듈에서 `selector`나 `name`으로 사용할 수 있지만 `member` 모듈을 임포트 한 루트 모듈에서 사용할 수는 없습니다. `member` 모듈이 다시 `share` 모듈을 익스포트해야만 루트 모듈에서 사용할 수 있게 됩니다. 또는, 루트 모듈이 바로 `share` 모듈을 임포트해도 사용할 수 있게 됩니다. 

디렉티브의 객체 생성은 서비스처럼 한 번만 수행되는 걸까요? 아니면 컴포넌트처럼 사용할 때 마다 생성되는 걸까요? 이를 알아보기 위해서 디렉티브 생성자에 로그를 추가합니다.

콘솔 로그를 살펴보면 디렉티브도 컴포넌트처럼 매번 사용할 때 마다 새로 만들어진다는 것을 알 수 있습니다.

## 파이프의 객체 생성시기

```bash
$ ng g p share/pipe/reverse --module=share --spec=false --export=true
CREATE src/app/share/pipe/reverse.pipe.ts (203 bytes)
UPDATE src/app/share/share.module.ts (534 bytes)
```

`Hello` 문자열을 받으면 글자의 순서를 바꿔서 `olleH` 처럼 리턴하는 파이프를 만듭니다.

**reverse.pipe.ts**

```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {
  constructor() {
    console.log('ReversePipe()');
  }

  transform(value: string): string {
    return value.split('').reverse().join('');
  }
}
```

**home.component.html**

```html
<p highlight>
  {{'home works!' | titlecase | reverse}}
</p>
```

파이프는 연속해서 사용할 수 있습니다. 먼저 `home works!` 문자열을 앵귤러가 제공하는 `titlecase` 파이프에 전달합니다. 그러면 결과는  `Home Works!`가 됩니다. 다음으로 `Home Works!` 문자열을 `reverse` 파이프에 전달합니다. 그러면 최종적인 출력결과는 `!skroW emoH`가 됩니다.

`share` 모듈이 `exports: [ReversePipe]` 설정을 하고,  
`member` 모듈이 `share` 모듈을 임포트 하고,  
`member` 모듈이 `exports: [ShareModule]` 설정을 했기 때문에 루트 모듈의 `home` 컴포넌트에서 사용할 수 있습니다.

콘솔 로그를 살펴보면 파이프도 컴포넌트처럼 매번 사용할 때 마다 새로 만들어진다는 것을 알 수 있습니다.

## 서비스의 객체 생성시기

서비스는 컨셉 자체가 컴포넌트의 중복성 로직을 독립시키는 용도이므로 객체를 한 번만 만들어서 재 사용합니다. 컴포넌트는 화면에 배치되면 그 때 새로 만들어지고 화면에서 빠지면 파괴됩니다. 하지만, 서비스는 화면의 변화와 무관합니다. 누군가 서비스 객체를 달라고 할 때 만들어지고 계속해서 재 사용됩니다. 

모듈과 서비스는 재 사용되지만 사용자가 브라우저 화면을 F5키로 리프레쉬하는 경우에는 파괴되고 새로 만들어집니다. 어디까지나 화면이 유지된다는 전제하에서 재 사용되는 방식입니다.

서비스는 언제 만들어지느냐 보다는 계속해서 하나의 객체만 사용하는 것인지가 주 관심사가 됩니다.

**user-http.service.ts**

```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {
  data: string = 'UserHttpService';

  constructor() {
    console.log('--- UserHttpService() ---');
  }
}
```

우선 `UserHttpService` 서비스 생성자에 로그를 출력하도록 조치합니다.

**member.component.ts**

```ts
import { Component, OnInit } from '@angular/core';

import { UserHttpService } from '../core/user-http.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
  providers: [{ provide: UserHttpService, useClass: UserHttpService }] // 추가
})
export class MemberComponent implements OnInit {

  constructor(private userHttpService: UserHttpService) {
    console.log('MemberComponent()');
  }

  ngOnInit() { }

}
```

컴포넌트에 `providers` 속성을 추가합니다. `useClass` 속성이 있는 객체를 전달하면 이 컴포넌트를 위한 `UserHttpService` 자료형의 객체를 생성하여 생성자에 DI 합니다. 이는 루트 모듈이 제공하는 서비스 객체와 다른 객체입니다. 원한다면 컴포넌트마다 별도의 서비스 객체를 사용할 수 있습니다. 

## 루트 모듈에서 서브 모듈에 데이터 전달하기

루트 모듈이 서브 모듈에 넘겨주는 데이터의 자료형을 알려주는 용도로 사용할 클래스가 필요합니다. 그러므로 서비스 생성 명령보다는 다음처럼 클래스 생성명령을 사용하는 것이 적합하겠습니다.

```bash
$ ng g class member/member-config
CREATE src/app/member/member-config.ts (30 bytes)
```

**member-config.ts**

```ts
export class MemberConfig {
  color: string;
}
```

**member.module.ts**

```ts
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareModule } from '../share/share.module';
import { MemberComponent } from './member.component';
import { MemberConfig } from './member-config';

@NgModule({
  declarations: [MemberComponent],
  imports: [
    CommonModule,
    ShareModule
  ],
  exports: [ShareModule]
})
export class MemberModule {
  constructor() {
    console.log('MemberModule()');
  }

  static forRoot(config: MemberConfig): ModuleWithProviders {
    let moduleWithProviders: ModuleWithProviders = {
      ngModule: MemberModule,
      providers: [
        { provide: MemberConfig, useValue: config }
      ]
    }
    return moduleWithProviders;
  }
}
```

`ModuleWithProviders` 객체를 리턴하면 코드적으로 서비스 항목을 추가할 수 있습니다. `MemberModule` 모듈을 임포트 하는 모듈에서 `MemberModule.forRoot({ color: 'red' })` 함수를 호출해서 데이터를 넘기면 `MemberConfig`라고 하는 서비스 객체를 이용할 수 있게 됩니다.

**member.component.ts**

```ts
import { Component, OnInit, Optional } from '@angular/core';

import { UserHttpService } from '../core/user-http.service';
import { MemberConfig } from './member-config';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
  providers: [{ provide: UserHttpService, useClass: UserHttpService }]
})
export class MemberComponent implements OnInit {

  constructor(
    private userHttpService: UserHttpService,
    @Optional() private memberConfig: MemberConfig
  ) {
    console.log('MemberComponent()');
    console.log('memberConfig =', memberConfig);
  }

  ngOnInit() { }

}
```

`MemberConfig` 객체가 존재하지 않을 수도 있기 때문에 `@Optional` 데코레이터를 사용해서 없으면 DI 하지 않아도 괜찮다는 표시를 합니다.

**app.module.ts**

```ts
imports: [
  // MemberModule,
  MemberModule.forRoot({ color: 'red' }),
],
```

루트 모듈에서 `MemberModule` 코드를 사용하면 해당 모듈에 데이터를 넘기지 않는 것이고 `MemberModule.forRoot({ color: 'red' })` 코드를 사용하면 `MemberModule` 모듈을 임포트하면서 데이터를 넘기는 것이 됩니다. 이로써 모듈을 임포트하면서 데이터를 넘길 수 있기 때문에 모듈을 임포트해서 사용할 때 모듈 내부의 동작을 제어할 데이터를 추가로 전달할 수 있는 방법이 생겼습니다.

이와 비슷하게 `RouterModule` 모듈은 `RouterModule.forRoot(routes)` 코드처럼 사용하여 라우팅 로직을 전달하면서 임포트해서 사용합니다. 그냥 `RouterModule`로 임포트 하면 라우팅 처리로직은 있으나 매핑 로직이 없으므로 제대로 작동할 수 없으므로 필수적으로 라우팅 매핑 로직을 전달해야만 하는 것입니다.

### 루트 모듈에서 서브 모듈의 컴포넌트의 엘리먼트 조작하기

**app.module.ts**

```ts
imports: [
  // MemberModule,
  // MemberModule.forRoot({ color: 'red' }),
  MemberModule.forRoot({ color: 'blue' }),
],
```

**member.component.ts**

```ts
import { Component, OnInit, Optional } from '@angular/core';

import { UserHttpService } from '../core/user-http.service';
import { MemberConfig } from './member-config';
import { ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
  providers: [{ provide: UserHttpService, useClass: UserHttpService }]
})
export class MemberComponent implements OnInit {

  constructor(
    private userHttpService: UserHttpService,
    @Optional() private memberConfig: MemberConfig,
    private renderer: Renderer2
  ) {
    console.log('MemberComponent()');
    console.log('memberConfig =', memberConfig);
  }

  @ViewChild('target') pElementRef: ElementRef;

  ngOnInit() {
    if (this.memberConfig) {
        this.renderer.setStyle(this.pElementRef.nativeElement, 
          'color', this.memberConfig.color);
    }
  }

}
```

**member.component.html**

```html
<p highlight #target>
  {{'member works!' | reverse}}
</p>
```

`@ViewChild('target')` 데코레이터로 엘리먼트 참조 `#target`이 있는 엘리먼트의 참조를 갖고 있는 `ElementRef` 객체를 획득합니다. 생성자에서 `ElementRef` 객체를 이용할 수 없고 라이프 사이클 메소드 중에서 사용하면 됩니다.
