# Library

다음 사이트를 참고했습니다.  
* https://angular.io/cli/
* https://blog.angularindepth.com/creating-a-library-in-angular-6-87799552e7e5

앵귤러 6버전부터 CLI 도구로 스캐폴딩하는 폴더는 프로젝트에서 워크스페이스로 승급되었습니다. 더불어서 angular-cli.json 파일이 angular.json 으로 변경되었습니다.

워크스페이스에는 다음 2가지를 배치할 수 있습니다.

* **라이브러리**  
하나의 독립된 프로젝트로써 단독으로 수행되는 것이 아닌 다른 애플리케이션이나 라이브러에게 제공하고 싶은 앵귤러 자원을 제공합니다. NPM을 통해서 배포할 수 있습니다. 라이브러리를 주 목적으로하는 워크스페이스에 존재하는 애플리케이션은 라이브러리 사용 예를 보여주는 애플리케이션입니다.

* **애플리케이션**  
SPA으로써 단독으로 수행되는 프로젝트입니다. 워크스페이스는 다수의 애플리케이션 및 라이브러리를 가질 수 있습니다.

모듈은 하나의 애플리케이션에서 다수 모듈의 중복성을 제거하는 역할을 수행합니다. 라이브러리는 다수의 애플리케이션의 중복성을 제거하는 역할을 수행합니다.

# 예제 프로젝트

```bash
$ ng new foo-lib --createApplication=false
? Would you like to add Angular routing? No
? Which stylesheet format would you like to use? SCSS

CREATE foo-lib/angular.json (135 bytes)
CREATE foo-lib/package.json (1258 bytes)
CREATE foo-lib/README.md (1023 bytes)
CREATE foo-lib/tsconfig.json (435 bytes)
CREATE foo-lib/tslint.json (2824 bytes)
CREATE foo-lib/.editorconfig (246 bytes)
CREATE foo-lib/.gitignore (576 bytes)

added 683 packages from 828 contributors and audited 20292 packages in 117.746s
found 0 vulnerabilities

Directory is already under version control. Skipping initialization of git.
```

`--createApplication=false` 옵션을 설정하여 기본 애플리케이션 생성을 생략합니다. 라이브러리 목적으로 스캐폴딩할 때 사용하는 옵션입니다.

## 라이브러리 프로젝트 foo-lib 생성

```bash
$ cd foo-lib
$ ng g library foo-lib --prefix=foo

CREATE projects/foo-lib/karma.conf.js (968 bytes)
CREATE projects/foo-lib/ng-package.json (156 bytes)
CREATE projects/foo-lib/package.json (137 bytes)
CREATE projects/foo-lib/tsconfig.lib.json (726 bytes)
CREATE projects/foo-lib/tsconfig.spec.json (246 bytes)
CREATE projects/foo-lib/tslint.json (247 bytes)
CREATE projects/foo-lib/src/test.ts (700 bytes)
CREATE projects/foo-lib/src/public_api.ts (159 bytes)
CREATE projects/foo-lib/src/lib/foo-lib.module.ts (225 bytes)
CREATE projects/foo-lib/src/lib/foo-lib.component.spec.ts (629 bytes)
CREATE projects/foo-lib/src/lib/foo-lib.component.ts (258 bytes)
CREATE projects/foo-lib/src/lib/foo-lib.service.spec.ts (334 bytes)
CREATE projects/foo-lib/src/lib/foo-lib.service.ts (135 bytes)

UPDATE angular.json (1244 bytes)
UPDATE package.json (1435 bytes)
UPDATE tsconfig.json (561 bytes)
```

워크스페이스 밑으로 새 라이브러리 프로젝트를 생성합니다.

## foo-lib 라이브러리를 사용하는 데모 애플리케이션 프로젝트 foo-tester 생성

```bash
$ ng g application foo-tester

CREATE projects/foo-tester/src/favicon.ico (5430 bytes)
CREATE projects/foo-tester/src/index.html (296 bytes)
CREATE projects/foo-tester/src/main.ts (372 bytes)
CREATE projects/foo-tester/src/polyfills.ts (3571 bytes)
CREATE projects/foo-tester/src/test.ts (642 bytes)
CREATE projects/foo-tester/src/styles.css (80 bytes)
CREATE projects/foo-tester/src/assets/.gitkeep (0 bytes)
CREATE projects/foo-tester/src/environments/environment.prod.ts (51 bytes)
CREATE projects/foo-tester/src/environments/environment.ts (662 bytes)
CREATE projects/foo-tester/browserslist (388 bytes)
CREATE projects/foo-tester/karma.conf.js (983 bytes)
CREATE projects/foo-tester/tsconfig.app.json (172 bytes)
CREATE projects/foo-tester/tsconfig.spec.json (270 bytes)
CREATE projects/foo-tester/tslint.json (317 bytes)
CREATE projects/foo-tester/src/app/app.module.ts (314 bytes)
CREATE projects/foo-tester/src/app/app.component.html (1120 bytes)
CREATE projects/foo-tester/src/app/app.component.spec.ts (990 bytes)
CREATE projects/foo-tester/src/app/app.component.ts (214 bytes)
CREATE projects/foo-tester/src/app/app.component.css (0 bytes)
CREATE projects/foo-tester-e2e/protractor.conf.js (752 bytes)
CREATE projects/foo-tester-e2e/tsconfig.e2e.json (219 bytes)
CREATE projects/foo-tester-e2e/src/app.e2e-spec.ts (302 bytes)
CREATE projects/foo-tester-e2e/src/app.po.ts (204 bytes)

UPDATE angular.json (5317 bytes)
UPDATE package.json (1435 bytes)
```

워크스페이스 밑으로 새 애플리케이션 프로젝트를 생성합니다. 이 프로젝트는 라이브러리 사용법을 보여주기 위한 예제 애플리케이션 프로젝트입니다.

**Linting**

다음 예는 라이브러리와 애플리케이션 프로젝트를 린팅하는 방법입니다.

```bash
$ ng lint foo-lib
```

```bash
$ ng lint foo-tester
```

**Testing**

다음 예는 라이브러리와 애플리케이션 프로젝트를 테스트하는 방법입니다.

```bash
$ ng test foo-lib
```

```bash
$ ng test foo-tester
```

**Serving**

다음 예는 라이브러리를 위한 사용예제 프로젝트를 개발서버로 실행하는 방법입니다.

```bash
$ ng serve foo-tester
```

**Building**

앵귤러 CLI 6.1 버전부터 라이브러리는 기본적으로 Production 모드로 빌드됩니다. 즉, `--prod` 옵션을 생략할 수 있습니다.

```bash
$ ng build foo-lib

Building Angular Package
Building entry point 'foo-lib'
Compiling TypeScript sources through ngc
Bundling to FESM2015
Bundling to FESM5
Bundling to UMD
Minifying UMD bundle
Copying declaration files
Writing package metadata
Removing scripts section in package.json as it's considered a potential security vulnerability.
Built foo-lib
Built Angular Package!
 - from: ~\foo-lib\projects\foo-lib
 - to:   ~\foo-lib\dist\foo-lib
```

애플리케이션을 빌드할 때 Production 모드로 빌드하기 위해서는 `--prod` 옵션을 사용해야 합니다.

```bash
$ ng build foo-tester --prod
```

## 데모 애플리케이션 프로젝트 foo-tester 개발

**foo-lib\projects\foo-tester\src\app\app.module.ts**

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FooLibModule } from 'foo-lib';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FooLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

라이브러리가 제공하는 FooLibModule의 자원을 애플리케이션 프로젝트에서 임포트합니다.

**app.component.html**

```html
<div style="text-align:center">
  <h1>
    Welcome to {{ title }}!
  </h1>
  <foo-foo-lib></foo-foo-lib>
</div>
```

FooLibModule에서 `exports: [FooLibComponent]` 한 FooLibComponent 컴포넌트를 애플리케이션 프로젝트의 app.component.html 파일에서 사용할 수 있습니다.

```bash
$ ng serve foo-tester
```

화면을 확인합니다.

**foo-lib\projects\foo-lib\src\lib\foo-lib.component.ts**

```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'foo-foo-lib',
  template: `
    <h3>FooLibComponent</h3>
  `,
  styles: []
})
export class FooLibComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
```

템플릿을 수정합니다. 화면을 확인합니다. p 태그를 h3 태그로 변경하였으나 변화가 보이지 않습니다. 라이브러리의 변화는 빌드를 통해서만 반영됩니다.

```bash
$ ng build foo-lib --watch
```

`--watch` 옵션을 설정하여 변화가 있을 때 마다 다시 빌드가 수행되도록 조치할 수 있습니다.

**주의**: `ng serve` 명령을 실행시킨 상태에서 `ng build foo-lib --watch` 명령을 실행하면 에러가 발생합니다. `ng build foo-lib --watch` 명령을 먼저 실행한 후 `ng serve` 명령을 실행하시기 바랍니다.

### foo-lib 라이브러리에 컴포넌트 추가

```bash
$ ng g c bar --project=foo-lib --export=true

CREATE projects/foo-lib/src/lib/bar/bar.component.html (22 bytes)
CREATE projects/foo-lib/src/lib/bar/bar.component.spec.ts (607 bytes)
CREATE projects/foo-lib/src/lib/bar/bar.component.ts (257 bytes)
CREATE projects/foo-lib/src/lib/bar/bar.component.css (0 bytes)
UPDATE projects/foo-lib/src/lib/foo-lib.module.ts (305 bytes)
```

**app.component.html**

```html
<div style="text-align:center">
  <h1>
    Welcome to {{ title }}!
  </h1>
  <foo-foo-lib></foo-foo-lib>
  <foo-bar></foo-bar>
</div>
```

화면을 확인합니다. `<foo-bar>` 컴포넌트가 잘 보입니다.

**public_api.ts**

```
export * from './lib/foo-lib.service';
export * from './lib/foo-lib.component';
export * from './lib/foo-lib.module';
export * from './lib/bar/bar.component';
```

bar.component 컴포넌트를 추가로 등록합니다. 그러면 라이브러리가 제공하는 모듈을 임포트하는 애플리케이션 프로젝트의 루트 모듈에서 BarComponent 클래스를 참조할 수 있게 됩니다. 

**foo-lib\projects\foo-tester\src\app\app.module.ts**

```ts
import { FooLibModule } from 'foo-lib';
```

FooLibModule 모듈 뒤에 콤마를 찍으면 BarComponent 클래스가 자동완성 기능으로 제안되는지 확인하십시오. 

* 라이브러리의 컴포넌트의 selector를 사용하려면 해당 모듈에서 익스포트를 해야합니다.
* 라이브러리의 컴포넌트 클래스를 사용하려면 해당 라이브러리의 public_api.ts 파일에 등록해서 익스포트를 명시적으로 선언해야합니다.

같은 애플리케이션의 모듈 사이에서는 public_api.ts 파일의 등록하는 과정이 존재하지 않습니다. public_api.ts 파일 자체가 존재하지 않습니다.

## 라이브러리가 다른 라이브러리의 자원 사용하기

일단 돌고 있는 모든 것을 종료합니다. 의존 관계에 따라서 의존되는 쪽이 먼저 처리되거나 변경감지 모드에 있지 않으면 에러가 발생합니다. 처리순서에 유념에 해 주시기 바랍니다.

foo-tester `==사용==>` foo-lib `==사용==>` another-lib

위와 같은 의존관계를 갖고 있으므로 처리순서는 뒤에서부터 시작해야 합니다.

### 새 라이브러리 another-lib 생성

```bash
$ ng g library another-lib --prefix=al

CREATE projects/another-lib/karma.conf.js (968 bytes)
CREATE projects/another-lib/ng-package.json (160 bytes)
CREATE projects/another-lib/package.json (141 bytes)
CREATE projects/another-lib/tsconfig.lib.json (726 bytes)
CREATE projects/another-lib/tsconfig.spec.json (246 bytes)
CREATE projects/another-lib/tslint.json (245 bytes)
CREATE projects/another-lib/src/test.ts (700 bytes)
CREATE projects/another-lib/src/public_api.ts (175 bytes)
CREATE projects/another-lib/src/lib/another-lib.module.ts (245 bytes)
CREATE projects/another-lib/src/lib/another-lib.component.spec.ts (657 bytes)
CREATE projects/another-lib/src/lib/another-lib.component.ts (269 bytes)
CREATE projects/another-lib/src/lib/another-lib.service.spec.ts (354 bytes)
CREATE projects/another-lib/src/lib/another-lib.service.ts (139 bytes)
UPDATE angular.json (6432 bytes)
UPDATE package.json (1435 bytes)
UPDATE tsconfig.json (683 bytes)
```

### 개발 중 변경감지 활성화 방법

의존 관계에 따라서 처리순서가 결정됩니다. 의존되는 쪽을 먼저 처리해야 합니다.

1. another-lib 라이브러리를 변경감지 모드로 빌드합니다. 라이브러리를 빌드할 때는 `--prod` 옵션이 기본적으로 적용됩니다.

```bash
$ ng build another-lib --watch
```

2. foo-lib 라이브러리를 변경감지 모드로 빌드합니다.

```bash
$ ng build foo-lib --watch
```

3. foo-tester 애플리케이션을 변경감지 모드로 서빙합니다. serve 명령은 `--watch` 옵션이 기본적으로 적용됩니다.

```bash
$ ng serve foo-tester
```

애플리케이션 프로젝트가 하나라면 프로젝트명(foo-tester)을 생략할 수 있습니다. 두 개 이상의 애플리케이션 프로젝트가 있을 때 프로젝트명을 생략하면 다음과 같은 에러메시지를 보게 됩니다.

```
$ ng serve

Error: Could not determine a single project for the 'serve' target.
```

### another-lib 라이브러리 서비스 개발

**foo-lib\projects\another-lib\src\lib\another-lib.service.ts**

```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnotherLibService {

  constructor() { }

  getData() {
    return `Another`;
  }
}
```

### foo-lib 라이브러리 서비스 개발

**projects\foo-lib\src\lib\foo-lib.module.ts**

```ts
import { NgModule } from '@angular/core';
import { FooLibComponent } from './foo-lib.component';
import { BarComponent } from './bar/bar.component';
import { AnotherLibModule } from 'another-lib';

@NgModule({
  declarations: [FooLibComponent, BarComponent],
  imports: [
    AnotherLibModule
  ],
  exports: [FooLibComponent, BarComponent]
})
export class FooLibModule { }
```

another-lib 라이브러리가 제공하는 AnotherLibModule 모듈을 임포트 합니다.

**projects\foo-lib\src\lib\foo-lib.service.ts**

```ts
import { Injectable } from '@angular/core';
import { AnotherLibService } from 'another-lib';

@Injectable({
  providedIn: 'root'
})
export class FooLibService {

  constructor(private anotherLibService: AnotherLibService) { }

  getData() {
    return `1: ` + this.anotherLibService.getData() + `, 2: Foo`;
  }
}
```

another-lib 라이브러리가 제공하는 AnotherLibService 서비스를 임포트 합니다. AnotherLibService 서비스를 생성자를 통해서 DI 받습니다.

foo-tester 애플리케이션의 루트 모듈에서 이미 foo-lib 라이브러리가 제공하는 FooLibModule 모듈을 임포트하고 있습니다. 애플리케이션 프로젝트는 명시적으로 foo-lib 라이브러리만 임포트하고 있습니다. foo-lib 라이브러리가 의존하는 another-lib 라이브러리는 자동으로 처리됩니다.

**projects\foo-tester\src\app\app.component.ts**

```ts
import { Component } from '@angular/core';
import { FooLibService } from 'foo-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'foo-tester';
  desc;

  constructor(private fooLibService: FooLibService) {
    this.desc = this.fooLibService.getData();
  }
}
```

foo-lib 라이브러리가 제공하는 FooLibService 서비스를 루트 컴포넌트에서 임포트 합니다. FooLibService 서비스를 생성자를 통해서 DI 받습니다.

desc 변수에 값이 제대로 할당되어 출력되는지 확인합니다.

**projects\foo-tester\src\app\app.component.html**

```html
<div style="text-align:center">
  <h1>
    Welcome to {{ title }}!
  </h1>
  <p>{{desc}}</p>
  <foo-foo-lib></foo-foo-lib>
  <foo-bar></foo-bar>
</div>
```

지금까지 간단하게 애플리케이션이 라이브러리의 자원을 사용하는 방법과 라이브러리가 다른 라이브러리를 의존하는 상황에서의 처리방법을 살펴보았습니다.
