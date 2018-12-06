# Routing Ⅰ

이번에는 앵귤러 라우팅 처리에 대해서 알아보겠습니다. 라우팅은 화면을 전환하는 처리를 의미합니다. 전통적으로 라우팅 처리를 위하여 URL을 사용해 왔습니다.

<img src="../image/url.png" width="100%"/>

예를 들어 브라우저 주소창에 `www.example.com` 이라고 입력하면 URL 문자열을 사용하여 원격 서버에 접속합니다. 그리고 웹 서버가 제공하는 HTML을 다운받으면 브라우저가 화면에 표시합니다. domain 문자열로 서버에 접속하고 path 문자열로 연동할 URL Handler를 선택합니다. URL Handler 객체 내에 메소드는 HTTP 프로토콜이 정한 요청방식으로 결정합니다. 요청방식은 HTTP Header에 저장되어 연결 시 같이 전달됩니다. 이렇게 서버 쪽에서 라우팅 매핑 로직을 갖고 있다가 클아이언트에 요청을 받으면 라우팅 처리를 하여 HTML파일이나 데이터를 구해서 클라이언트에게 전달하는 것이 전통적으로 사용하던 방법이었습니다. 

앵귤러는 최초 다운 받은 index.html 파일이 임포트한 자바스크립트 코드안에 모든 화면과 관련한 구성요소들이 있으므로 서버에 매번 접속하여 새로운 HTML 파일을 받지 않습니다. 따라서, index.html 파일을 받은 후 다른 화면은 앵귤러 코드가 처리하므로 HTML 파일은 단 하나만 사용하는 것이됩니다. 이러한 기술을 SPA(Single Page Application)라고 부릅니다.

비록 HTML 엘린먼트, CSS 스타일 정보와 같은 정적인 정보는 앵귤러 애플리케이션에 모두 있다고 하더라도 동적인 정보는 존재하지 않으므로 데이터가 필요한 경우 자바스크립트가 비동기 통신을 통해서 웹 서버에게서 받아와야 합니다.

앵귤러 라우팅은 클라이언트 사이드에서 라우팅 매핑을 처리하여 필요한 화면을 만들고 화면을 갈아끼우는 기술을 말합니다. 동적인 데이터는 HTTP 서비스 로직을 통해 비동기적으로 받아와서 컴포넌트에게 전달하고 컴포넌트에 상태정보로 저장하면 이를 사용하는 화면 갱신은 앵귤러가 알아서 처리합니다.

결국 서버 사이드에서 처리하던 라우팅 처리가 클라이언트 사이드에서 처리하는 방식으로 바뀌는 것 입니다. 앵귤러에게 URI에 따라서 사용할 컴포넌트를 알려주는 라우팅 매핑 정보를 작성해서 알려주어야 합니다. `<a href="URI">` 앵커 태그에 href 속성은 원격 서버에 접속해서 데이터를 구할 때 사용합니다. 이 경우, 화면이 갱신됩니다. `href` 속성 대신 앵귤러가 제공하는 `routerLink` 디렉티브를 사용하면 클라이언트 사이드 라우팅 매핑로직에서 연동할 컴포넌트를 찾아서 사용하는 방식으로 화면이 갱신되지 않습니다.

## 프로젝트 생성

```console
$ ng new my-angular2
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? CSS
```

프로젝트 스캐폴딩이 끝난 후 

```
$ cd my-angular2
$ ng serve -o
```

### Step 1. 컴포넌트 생성

다른 콘솔을 하나 더 띄운 후, 프로젝트 루트 위치에서 컴포넌트를 생성합니다.

```
$ ng g c home
$ ng g c about
$ ng g c etc
```

### Step 2. 라우팅 매핑로직 설정

프로젝트 생성 시 다음 물음에 동의했다면 `src/app` 폴더 밑에 `app-routing.module.ts` 파일이 추가로 생성됩니다.

`? Would you like to add Angular routing? Yes`

`app-routing.module.ts` 파일을 수정합니다.

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { EtcComponent } from './etc/etc.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'etc', component: EtcComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

* `const routes: Routes`  
라우팅 매핑 정보를 취급하는 Route 객체를 배열로 보관합니다.

* `RouterModule.forRoot(routes)`  
라우팅 매핑 정보를 RouterModule 모듈에 static 함수 forRoot에게 전달합니다. 이로써 앵귤러 라우터 모듈은 클라이언트 사이드 라우팅 매핑 정보를 인식하게 됩니다.

* `path: ''`  
`pathMatch: 'full'` 옵션을 추가로 지정한 경우 다음 URL에 매핑됩니다.  
  - `http://localhost:4200`  
  - `http://localhost:4200/` 

* `redirectTo: 'home'`  
브라우저의 주소창에 내용을 바꾸고 재 접속을 요청합니다.

* `{path: 'home', component: HomeComponent}`  
도메인을 제외한 URI 문자열이 `home` 일 때 `HomeComponent` 컴포넌트를 생성합니다. 그리고 기동 컴포넌트의 `app.component.html` 파일에서 `<router-outlet></router-outlet>` 커스텀 태그를 사용한 곳 바로 밑에 새로 만든 컴포넌트를 배치합니다.

### Step 3. 네비게이션 링크 제공

앞서서 진행한 라우팅 매핑 로직 설정만으로 `<router-outlet></router-outlet>` 영역에 컴포넌트를 갈아끼우는 서비스는 작동합니다. 사용자가 직접 주소창에 URI 바꾼다면  말이죠. 하지만 이는 친절하지 못한 서비스겠죠. 따라서 사용자의 편의를 위해서 사용자에게 네비게이션 메뉴를 제공하는 것이 좋겠습니다.

`app.component.html` 파일을 수정합니다.

```html
<div class="container">
  <nav>
    <h3>using href</h3>
    <a href="home">Home</a>&nbsp;/&nbsp;
    <a href="about">About</a>{{' / '}}
    <a href="etc">Etc</a>
  </nav>
  <nav>
    <h3>using routerLink</h3>
    <a routerLink="home">Home</a>{{' / '}}
    <a routerLink="about">About</a>{{' / '}}
    <a routerLink="etc">Etc</a>
  </nav>
  <hr>
  <router-outlet></router-outlet>
</div>
```

* `&nbsp;/&nbsp;`  
앵커 태그는 인라인 엘리먼트로써 다닥다닥 붙어서 표시됩니다. 앵커 태그 사이에 공백을 주기위해서 공백 치환문자 `&nbsp;`를 사용합니다.
* `{{' / '}}`  
인터폴레이션 표현식은 앵귤러가 지원하는 자바스크립트 코드 공간을 의미합니다. 싱글 쿼테이션을 사용하여 문자열을 지정하고 있습니다. 위 방식보다 가독성이 좋다고 할 수 있습니다.
* `<a href="home">Home</a>`  
`href` 속성을 사용하면 클릭 시 주소창에 URL이 변경되고 화면이 갱신됩니다. 이는 전체 화면을 다시 그리는 것으로써 비 효율적이기 때문에 피해야 합니다.
* `<a routerLink="home">Home</a>`  
`href` 속성 대신 `routerLink` 라는 앵귤러의 속성을 사용하고 있습니다. 이렇게 사용하면 클릭 시 주소창에 URL이 변경되는 것은 같지만 전체 화면을 다시 그리지는 않습니다. `<router-outlet></router-outlet>` 태그로 지정한 부분만 변경되기 때문에 매우 효율적입니다.
* `<router-outlet></router-outlet>`  
라우팅 매핑 로직에 따라 새 컴포넌트를 만들어서 배치하는 곳을 지정합니다. 처리 후에도 `<router-outlet></router-outlet>` 태그는 남아 있으며 새 컴포넌트는 밑에 배치됩니다. 사용자가 다른 앵커를 클릭하면 그에 따라 새 컴포넌트가 만들어지고 새 컴포넌트는 기존에 배치된 컴포넌트를 버리고 그 자리에 배치됩니다.
* `routerLink="home"`  
`"home"` 문자열은 `app-routing.module.ts` 파일에서 작성한 라우팅 매핑 로직에 등록된 문자열이어야 합니다. 이 경우, `{path: 'home', component: HomeComponent}` 코드에서 path 속성이 가진 값 `home`과 일치되고 있습니다.

### 디자인 개선

지금까지 간단하게 클라이언트 사이드 앵귤러 라우팅 처리방법을 살펴보았습니다. 디자인 개선을 위하여 부트스트랩을 적용해 보도록 하겠습니다.

`index.html` 파일을 수정합니다. 다음 사이트를 참고했습니다.  
`https://getbootstrap.com/docs/4.1/getting-started/introduction/`

```html
<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>MyAngular2</title>
  <base href="/">

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">

  <link rel="stylesheet" 
  href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" 
  integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" 
  crossorigin="anonymous">
  <style media="screen">
    body {
      margin-top: 20px;
      margin-bottom: 20px;
    }
  </style>
</head>

<body>
  <app-root></app-root>

  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" 
  integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" 
  crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" 
  integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" 
  crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" 
  integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" 
  crossorigin="anonymous"></script>
</body>

</html>
```

`app.component.html` 파일을 수정합니다. 다음 사이트를 참고했습니다.  
`https://getbootstrap.com/docs/4.1/components/navs/#using-dropdowns`

```html
<div class="container">
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <a class="nav-link" routerLink="home" routerLinkActive="active">Home</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" routerLink="about" routerLinkActive="active">About</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" routerLink="etc" routerLinkActive="active">Etc</a>
    </li>
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" 
      role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
      <div class="dropdown-menu">
        <a class="dropdown-item" href="#">Action</a>
        <a class="dropdown-item" href="#">Another action</a>
        <a class="dropdown-item" href="#">Something else here</a>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item" href="#">Separated link</a>
      </div>
    </li>
    <li class="nav-item">
      <a class="nav-link active" href="#">Active</a>
    </li>
    <li class="nav-item">
      <a class="nav-link disabled" href="#">Disabled</a>
    </li>
  </ul>
  <div class="container">
    <br>
    <router-outlet></router-outlet>
  </div>
</div>
```

* `<a class="nav-link active" href="#">Active</a>`  
부트스트랩은 선택된 메뉴를 도드라지게 보이게 하기 위한 class 값으로 `active`를 사용합니다. 설명을 위해서 남겨둔 부분이오니 `active` 문자열은 직접 삭제하시기 바랍니다.

* `routerLinkActive="active"`  
`routerLink` 속성과 더불어서 `routerLinkActive` 속성을 사용하면 해당 메뉴가 선택되었을 때 앵귤러가 동적으로 class 값으로 `active`를 추가합니다. `active` 문자열은 앵귤러 고유 값이 아니라 부트스트랩이 정한 클래스명이니 참고하시기 바랍니다.

> 버그가 하나 존재합니다. `dropdown` 메뉴에 `routerLinkActive`를 설정해도 제대로 작동하지 않습니다. 이를 해결하는 다양한 방법이 `stackoverflow` 사이트에 올라와 있습니다. 하지만 굳이 해결하지 않아도 되겠습니다. 왜냐하면, 실제 개발 시는 UI 라이브러리가 제공하는 컴포넌트를 사용하는 것이 보다 편리하기 때문입니다. 최근에는 앵귤러 머터리얼 디자인도 많이 좋아졌습니다. 앵귤러 학습을 어느정도 마치면 뒤에서 다음 사이트가 제공하는 컴포넌트들을 사용해 보겠습니다.  
`https://mdbootstrap.com/docs/angular/components/dropdowns/`

### CDN 방식 대신 내장 방식 사용하기

CDN 방식은 화면을 처리할 때 원격에 있는 CDN 서버에 접속하여 관련 라이브러리를 다운받아서 처리하는 방식입니다. CDN 서버도 정말 가끔 다운되는 것을 경험했기에 미리 관련 라이브러리를 다운받아서 앵귤러 디펜던시로 설정하여 사용하는 방식을 살펴보겠습니다.

```
$ npm i jquery@3.3.1
$ npm i popper.js@1.14.3
$ npm i bootstrap@4.1.3
```

제이쿼리 라이브러리만 설치하면 제이쿼리 함수 사용 시 IDE가 제공하는 도움말 서비스를 받지 못합니다. 타이핑 정의를 추가로 설치하는 것이 좋겠습니다.

```
$ npm i --save-dev @types/jquery@3.3.1
```

`angular.json` 파일을 수정합니다.

```json
...생략
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles.css"
],
"scripts": [
  "node_modules/jquery/dist/jquery.slim.min.js",
  "node_modules/popper.js/dist/popper.min.js",
  "node_modules/bootstrap/dist/js/bootstrap.min.js"
]
...생략
```

* CSS 파일은 `"styles"` 항목에 설정하고 자바스크립트 파일은 `"scripts"` 항목에 설정합니다. 이제 `index.html` 파일에서 임포트 관련 코드를 생략할 수 있습니다.

`index.html` 파일을 수정합니다. 화면을 보시고 결과가 동일하다는 것을 확인하세요.

```html
<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>MyAngular2</title>
  <base href="/">

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">

  <style media="screen">
    body {
      margin-top: 20px !important;
      margin-bottom: 20px !important;
    }
  </style>
</head>

<body>
  <app-root></app-root>
</body>

</html>
```

* `!important` 설정을 추가합니다. 왜냐하면 부트스트랩 CSS 설정이 이 코드 밑에 추가되기 때문에 덮어쓰여져서 작동하지 않기 때문입니다. 다른 방법으로는 `<style>` 태그 설정 전체를 `<body>` 태그 맨 밑으로 배치하는 방법이 있습니다. 하지만 왠지 내키지 않습니다. 이럴 때 사용하라고 제공하는 파일이 바로 `styles.css` 파일입니다. CSS 설정을 `styles.css` 파일로 옮겨봅니다.

`styles.css` 파일을 수정합니다.

```css
/* You can add global styles to this file, and also import other style files */
body {
  margin-top: 20px !important;
  margin-bottom: 20px !important;
}
```

`index.html` 파일에서 CSS 관련 코드는 삭제합니다. 결과를 확인합니다.

### jQuery 직접 사용해 보기

써드 파티 라이브러리를 앵귤러에서 사용하는 방법을 학습하기 위해서 제이쿼리 코드를 작성해 보겠습니다.

`home.component.ts` 파일을 수정합니다.

```ts
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'jQuery in action!';

  constructor() { }

  public ngOnInit() {
    $(document).ready(function() {
      $("button").click(function() {
        var div = $("div");
        div.animate({ left: '100px' }, "slow");
      });
    });
  }
}
```

* `import * as $ from 'jquery';`  
제이쿼리는 역시 $ 기호로 사용해야 제맛이죠!

* `$(document).ready()`  
`ready` 함수 위에 마우스 커서를 올려보고 도움말이 뜨는지 확인합니다. 이를 위해서 `@types/jquery`를 추가로 설치한 겁니다.

`home.component.html` 파일을 수정합니다.

```html
<h3>home.component</h3>
<button>Start Animation</button>
<br><br>
<div style="border:1px solid black; height:100px; width:200px; position:relative;">
</div>
```

* `position:relative`  
모든 태그들은 기본적으로 `position: static` 상태입니다. 태그의 위치를 살짝 변경하고 싶을 때 `position: relative`를 사용합니다. 이제 `top, right, bottom, left` 속성을 사용하여 위치 조절이 가능합니다.

화면에서 `Start Animation` 버튼을 클릭하면 오른쪽으로 살짝 움직이는지 확인하세요. 

다음 사이트를 참고했습니다.  
* `https://medium.com/@swarnakishore/how-to-include-and-use-jquery-in-angular-cli-project-592e0fe63176`  
* `https://hackernoon.com/how-to-use-javascript-libraries-in-angular-2-apps-ff274ba601af`  
