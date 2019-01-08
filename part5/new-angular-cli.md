# New Angular CLI

다음 사이트를 참고했습니다.  
* https://angular.io/cli/
* https://blog.angularindepth.com/creating-a-library-in-angular-6-87799552e7e5

앵귤러 6버전부터 CLI 도구로 스캐폴딩하는 폴더는 프로젝트에서 워크스페이스로 승급되었습니다. 더불어서 angular-cli.json 파일이 angular.json 으로 변경되었습니다.

워크스페이스에는 다음 2가지를 배치할 수 있습니다.

* 라이브러리  
하나의 독립된 프로젝트로써 단독으로 수행되는 것이 아닌 다른 애플리케이션이나 라이브러에게 제공하고 싶은 앵귤러 자원을 제공합니다. NPM을 통해서 배포할 수 있습니다. 라이브러리를 주 목적으로하는 워크스페이스에 존재하는 애플리케이션은 라이브러리 사용 예를 보여주는 애플리케이션입니다.

* 애플리케이션  
SPA으로써 단독으로 수행되는 프로젝트입니다. 워크스페이스는 다수의 애플리케이션 및 라이브러리를 가질 수 있습니다.

모듈은 하나의 애플리케이션에서 다수 모듈의 중복성을 제거하는 역할을 수행합니다. 라이브러리는 다수의 애플리케이션의 중복성을 제거하는 역할을 수행합니다.

# 예제 프로젝트

```dash
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

## Library

```dash
cd foo-lib
ng g library foo-lib --prefix=foo

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

## Test Application

```dash
ng g application foo-tester

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

**Testing**

다음 예는 라이브러리와 애플리케이션 프로젝트를 테스트하는 방법입니다.

```dash
ng test foo-lib
```

```dash
ng test foo-tester
```

**Serving**

다음 예는 라이브러리를 위한 사용예제 프로젝트를 개발서버로 실행하는 방법입니다.

```dash
ng serve foo-tester
```

**Building**

앵귤러 CLI 6.1 버전부터 라이브러리는 기본적으로 Production 모드로 빌드됩니다. 즉, `--prod` 옵션을 생략할 수 있습니다.

```dash
ng build foo-lib

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

```dash
ng build foo-tester --prod
```

## 라이브러리 사용예제 애플리케이션

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

```dash
ng serve foo-tester
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

```dash
ng build foo-lib --watch
```

`--watch` 옵션을 설정하여 변화가 있을 때 마다 다시 빌드가 수행되도록 조치할 수 있습니다.

주의: `ng serve` 명령을 실행시킨 상태에서 `ng build foo-lib --watch` 명령을 실행하여 에러가 발생합니다. `ng build foo-lib --watch` 명령을 먼저 실행한 후 `ng serve` 명령을 실행하시기 바랍니다.

### 라이브러리에 컴포넌트 추가

```dash
ng g c bar --project=foo-lib --export=true

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

FooLibModule 모듈 뒤에 콤마를 찍으면 BarComponent 클래스가 제안되는지 확인하십시오.
