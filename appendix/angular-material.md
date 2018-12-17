# Angular Material

Angular Material UI 라이브러리가 제공하는 컴포넌트 사용법을 살펴 봅니다.

참고: `https://material.angular.io/guide/getting-started`

## 새 프로젝트 생성

```bash
$ ng new my-angular-material
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? SCSS
```

## 디펜던시 및 사용환경 설정

```bash
$ ng add @angular/material

Installing packages for tooling via npm.
npm WARN @angular/material@7.1.1 requires a peer of @angular/cdk@7.1.1 
but none is installed. You must install peer dependencies yourself.
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.4 (node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.4: 
wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})

+ @angular/material@7.1.1
added 1 package and audited 40179 packages in 20.495s
found 0 vulnerabilities

Installed packages for tooling via npm.
? Choose a prebuilt theme name, or "custom" for a custom theme: Deep Purple/Amber  
[ Preview: https://material.angular.io?theme=deeppurple-amber ]
? Set up HammerJS for gesture recognition? Yes
? Set up browser animations for Angular Material? Yes
UPDATE package.json (1400 bytes)
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.4 (node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.4: 
wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})

added 3 packages from 4 contributors and audited 40183 packages in 20.537s
found 0 vulnerabilities

UPDATE src/main.ts (391 bytes)
UPDATE src/app/app.module.ts (502 bytes)
UPDATE angular.json (4078 bytes)
UPDATE src/index.html (478 bytes)
UPDATE src/styles.scss (181 bytes)
```

`package.json` 파일을 보시면 `ng add @angular/material` 명령으로 다음 3가지의 디펜던시가 추가된 것을 알 수 있습니다.

**package.json**

```json
"dependencies": {
  "@angular/cdk": "~7.1.1",
  "@angular/material": "^7.1.1",
  "hammerjs": "^2.0.8",
},
```

* `@angular/cdk`  
`@angular/material`는 `@angular/cdk`에 의존하기 때문에 추가적으로 설치됩니다.  

* `hammerjs`  
사용자의 제스처를 딕텍팅하기 위해서 몇 개의 머터리얼 컴포넌트(mat-slide-toggle, mat-slider, matTooltip)들은 HammerJS에 의존하고 있기 때문에 추가적으로 설치합니다.  

그리고 로그 마지막 부분을 보시면 다음 5개의 파일이 수정되었다는 것을 알 수 있습니다. `ng add` 명령이 없었을 때는 개발자가 수동으로 진행해야 했던 작업입니다. 수정 내용과 의미를 살펴보겠습니다.  

### 1. hammerjs 코드 기동

**src/main.ts**

```ts
import 'hammerjs';
```

application의 시작지점(entry point)인 main.ts 파일을 열어서 제일 상단에 다음과 같은 코드가 추가됩니다. import는 있는데 from이 없는 경우는 hammerjs의 전역적인 코드를 작동시키기만 하면 된다는 뜻 입니다.  

### 2. 애니메이션 지원 활성화

**src/app/app.module.ts**

```ts
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserAnimationsModule
  ],
})
```

애니메이션 지원 활성화를 위해서 BrowserAnimationsModule 모듈을 루트 모듈에서 임포트합니다. 몇 개의 머터리얼 컴포넌트는 `@angular/animations`에 의존성을 가지고 있습니다. `@angular/animations` 모듈은 기본적으로 설치되므로 그냥 이해만 하시면 됩니다. 

`@angular/animations` 모듈은 내부적으로 `WebAnimation API`을 이용합니다. 그런데 모든 브라우저들이 이 API를 지원하는건 아닙니다. 만약 `WebAnimation API`를 지원하지 않는 브라우저를 이용할 경우는 다음 사이트를 참고하여 추가적으로 처리해 주셔야 합니다.  
`https://github.com/web-animations/web-animations-js`

### 3. 테마 선택

**angular.json**

```json
"styles": [
  "./node_modules/@angular/material/prebuilt-themes/deeppurple-amber.css",
  "src/styles.scss"
],
```

적용할 테마를 선택합니다. 기본적으로 제공되는 빌트인 테마는 현재 4가지가 존재하는데 그 중 하나를 설정합니다. 다음과 같이 글로벌 CSS 파일인 styles.css 파일 내 설정으로 처리할 수도 있습니다.

```css
@import '~@angular/material/prebuilt-themes/indigo-pink.css';
```

### 4. 구글 폰트 CDN

**src/index.html**

```html
<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

Font-Awesome처럼 Material은 쉽게 사용할 수 있는 Icon을 제공해 줍니다. Material Icon의 자세한 사용방법은 다음 사이트를 참고하세요.  
`https://google.github.io/material-design-icons/`

### 5. 구글 폰트 적용

**src/styles.scss**

```scss
html, body { height: 100%; }
body { margin: 0; font-family: Roboto, "Helvetica Neue", sans-serif; }
```

구글 폰트 관련 설정이 추가됩니다. 자세한 사용방법은 다음 사이트를 참고하세요.  
`https://fonts.google.com/`

## 사용해 보기

### 1. 머터리얼 컴포넌트 모듈 임포트  
사용할 머터리얼 컴포넌트 모듈을 임포트합니다.

**app.module.ts**

```ts
import { MatFormFieldModule, MatInputModule, 
  MatNativeDateModule, MatDatepickerModule } from '@angular/material';

@NgModule({
  imports: [
    MatFormFieldModule, MatInputModule, 
    MatNativeDateModule, MatDatepickerModule
  ],
})
```

### 2. 새 컴포넌트 생성  
`$ ng g c datepicker` 명령으로 새 컴포넌트를 생성합니다.

### 3. 컴포넌트 템플릿 수정  
`datepicker.component.html` 파일을 수정합니다.

```html
<mat-form-field>
  <input matInput [matDatepicker]="picker" placeholder="Choose a date">
  <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
  <mat-datepicker #picker></mat-datepicker>
</mat-form-field>
```

`<mat-form-field>` 태그로 `MatFormFieldModule` 모듈이 필요하다는 것을 파악할 수 있습니다. `<mat-datepicker>` 태그로 `MatDatepickerModule` 모듈이 필요하다는 것을 파악할 수 있습니다. 하지만 `MatInputModule`, `MatNativeDateModule` 모듈이 필요하다는 것은 브라우저 개발자 화면에서 뜨는 에러 메시지로 앵귤러 커뮤니티의 도움을 받아서 추가해야 한다는 것을 알 수 있었습니다. 공식 사이트에 설명이 부족하다는 것을 알 수 있는 대목입니다.

### 4. 컴포넌트 화면에 배치  
`app.component.html` 파일을 수정합니다.

**app.component.html**

```html
<!--The content below is only a placeholder and can be replaced.-->
<div style="text-align:center">
  <h1>
    Welcome to {{ title }}!
  </h1>
  <app-datepicker></app-datepicker>
</div>

<router-outlet></router-outlet>
```

### 5. 테스트  
브라우저에서 화면을 확인합니다.

### 6. 개선  
사용하는 머터리얼 컴포넌트 모듈이 많아지면 이를 관리하는 모듈을 도입하는 것이 관리에 도움이 됩니다.

`$ ng g m customMaterial` 명령으로 새 모듈을 생성합니다.

**custom-material.module.ts**

```ts
import { NgModule } from '@angular/core';

import {
  MatFormFieldModule, MatInputModule,
  MatNativeDateModule, MatDatepickerModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    MatFormFieldModule, MatInputModule,
    MatNativeDateModule, MatDatepickerModule
  ],
  exports: [
    MatFormFieldModule, MatInputModule,
    MatNativeDateModule, MatDatepickerModule
  ]
})
export class CustomMaterialModule { }
```

`app.module.ts` 파일을 수정합니다.

**app.module.ts**

```ts
// import { MatFormFieldModule, MatInputModule, 
// MatNativeDateModule, MatDatepickerModule } from '@angular/material';
import { CustomMaterialModule } from "./custom-material/custom-material.module";

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // MatFormFieldModule, MatInputModule, 
    // MatNativeDateModule, MatDatepickerModule
    CustomMaterialModule
  ],
})
```

CustomMaterialModule 모듈을 루트 모듈에서 임포트하면 CustomMaterialModule 모듈이 임포트한 후, 익스포트 한 모듈이 더불어서 임포트 됩니다. 이로써 루트 모듈의 설정을 보다 깔끔하게 유지할 수 있습니다.

### 7. 테스트  
브라우저에서 화면을 확인합니다. 결과가 같다는 것을 확인합니다.
