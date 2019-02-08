# Angular Universal

앵귤러 유니버셜은 앵귤러를 이용한 Server Side Rendering 기술을 가리키는 용어입니다. 검색엔진, 소셜 미디어 사이트 등에 제대로 된 콘텐츠를 노출하기 위해서 서버 사이드에서 앵귤러를 실행할 수 있는 방법이 필요합니다. 대부분의 크롤러들은 자바스크립트 코드를 무시하기 때문에 자바스크립트가 기동해서 다이나믹하게 콘텐츠를 추가하는 방식에서는 제대로 된 콘텐츠를 제공할 수 없습니다.

**참고사이트**

* https://angular.io/guide/universal
* https://medium.com/@MarkPieszak/angular-universal-server-side-rendering-deep-dive-dc442a6be7b7
* https://alligator.io/angular/angular-universal/





# 예제 프로젝트

## 프로젝트 생성

```bash
$ ng new some-amazing-project

? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? SCSS
```




## Server Side Rendering 환경설정

다음처럼 Server Side Rendering을 위한 설정작업을 수행한다.

```bash
$ ng add @nguniversal/express-engine --client-project some-amazing-project

..생략
CREATE src/main.server.ts (220 bytes)
CREATE src/app/app.server.module.ts (318 bytes)
CREATE src/tsconfig.server.json (219 bytes)
CREATE webpack.server.config.js (1360 bytes)
CREATE server.ts (1472 bytes)

UPDATE package.json (1892 bytes)
UPDATE angular.json (4535 bytes)
UPDATE src/main.ts (432 bytes)
UPDATE src/app/app.module.ts (438 bytes)
..생략
```

5개의 파일이 생성되었고 4개의 파일이 수정되었다. 작업내용을 살펴보자.




### CREATE 결과확인

**src/main.server.ts**

```ts
import { enableProdMode } from '@angular/core';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

export { AppServerModule } from './app/app.server.module';
```

이제 진입점이 2개가 되었다.

1. main.ts: 기존의 진입점, CSR 환경에서의 진입점
2. main.server.ts: SSR 환경에서의 진입점




**src/app/app.server.module.ts**

```ts
import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
```

* `@angular/platform-server` 패키지의 ServerModule 모듈을 임포트한다.
* AppServerModule 모듈이 기존의 AppModule을 임포트해서 사용한다.




**src/tsconfig.server.json**

```json
{
  "extends": "./tsconfig.app.json",
  "compilerOptions": {
    "outDir": "../out-tsc/app-server",
    "baseUrl": "."
  },
  "angularCompilerOptions": {
    "entryModule": "app/app.server.module#AppServerModule"
  }
}
```

* 기존의 tsconfig.app.json 파일은 tsconfig.json 파일의 설정을 확장한다.
* 새로 만들어진 tsconfig.server.json 파일은 tsconfig.app.json 파일의 설정을 확장한다.



**webpack.server.config.js**

```js
// Work around for https://github.com/angular/angular-cli/issues/7200

const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'none',
  entry: {
    // This is our Express server for Dynamic universal
    server: './server.ts'
  },
  target: 'node',
  resolve: { extensions: ['.ts', '.js'] },
  optimization: {
    minimize: false
  },
  output: {
    // Puts the output at the root of the dist folder
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' },
      {
        // Mark files inside `@angular/core` as using SystemJS style dynamic imports.
        // Removing this will cause deprecation warnings to appear.
        test: /(\\|\/)@angular(\\|\/)core(\\|\/).+\.js$/,
        parser: { system: true },
      },
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?angular(\\|\/)core(.+)?/,
      path.join(__dirname, 'src'), // location of your src
      {} // a map of your routes
    ),
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?express(\\|\/)(.+)?/,
      path.join(__dirname, 'src'),
      {}
    )
  ]
};
```




**server.ts**

```ts
import 'zone.js/dist/zone-node';
import {enableProdMode} from '@angular/core';
// Express Engine
import {ngExpressEngine} from '@nguniversal/express-engine';
// Import module map for lazy loading
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';

import * as express from 'express';
import {join} from 'path';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist/browser');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./dist/server/main');

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

// Example Express Rest API endpoints
// app.get('/api/**', (req, res) => { });
// Serve static files from /browser
app.get('*.*', express.static(DIST_FOLDER, {
  maxAge: '1y'
}));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
```





### UPDATE 결과확인

기록을 위해서 package.json 파일을 그대로 저장했다.

**package.json**

```json
{
  "name": "some-amazing-project",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e",
    "compile:server": "webpack --config webpack.server.config.js --progress --colors",
    "serve:ssr": "node dist/server",
    "build:ssr": "npm run build:client-and-server-bundles && npm run compile:server",
    "build:client-and-server-bundles": "ng build --prod && ng run some-amazing-project:server:production"
  },
  "private": true,
  "dependencies": {
    "@angular/animations": "~7.1.0",
    "@angular/common": "~7.1.0",
    "@angular/compiler": "~7.1.0",
    "@angular/core": "~7.1.0",
    "@angular/forms": "~7.1.0",
    "@angular/http": "~7.1.0",
    "@angular/platform-browser": "~7.1.0",
    "@angular/platform-browser-dynamic": "~7.1.0",
    "@angular/platform-server": "~7.1.0",
    "@angular/router": "~7.1.0",
    "@nguniversal/express-engine": "^7.1.0",
    "@nguniversal/module-map-ngfactory-loader": "0.0.0",
    "core-js": "^2.5.4",
    "express": "^4.15.2",
    "rxjs": "~6.3.3",
    "tslib": "^1.9.0",
    "zone.js": "~0.8.26"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^0.13.1",
    "@angular/cli": "~7.1.1",
    "@angular/compiler-cli": "~7.1.0",
    "@angular/language-service": "~7.1.0",
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
    "ts-loader": "^5.2.0",
    "ts-node": "~7.0.0",
    "tslint": "~5.11.0",
    "typescript": "~3.1.6",
    "webpack-cli": "^3.1.0"
  }
}
```

추가된 디펜던시는 다음과 같다.

* `@angular/http`
* `@angular/platform-server`
* `@nguniversal/express-engine`
* `@nguniversal/module-map-ngfactory-loader`
* `webpack-cli`

서버 빌드에서 사용하는 스크립트는 다음과 같다.

1. `"compile:server": "webpack --config webpack.server.config.js --progress --colors"`
2. `"serve:ssr": "node dist/server"`
3. `"build:ssr": "npm run build:client-and-server-bundles && npm run compile:server"`
4. `"build:client-and-server-bundles": "ng build --prod && ng run some-amazing-project:server:production"`

3번 명령을 수행하면 명령중에 4번을 호출하는 코드가 있기 때문에 4번도 수행된다.





**angular.json**

다음 부분이 추가되었다.

```json
"server": {
  "builder": "@angular-devkit/build-angular:server",
  "options": {
    "outputPath": "dist/server",
    "main": "src/main.server.ts",
    "tsConfig": "src/tsconfig.server.json"
  },
  "configurations": {
    "production": {
      "fileReplacements": [
        {
          "replace": "src/environments/environment.ts",
          "with": "src/environments/environment.prod.ts"
        }
      ]
    }
  }
}
```

* 빌드결과는 dist/server 폴더 밑으로 배치된다.
* 진입점은 별도로 src/main.server.ts이다.
* 분리된 Typescript 설정파일 src/tsconfig.server.json을 사용한다.
* `@angular/platform-server` 기술로 랜더링된다.




**src/main.ts**

```ts
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
```

위 코드가 아래처럼 변경되었다.

```ts
document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
});
```




**src/app/app.module.ts**

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

BrowserModule을 그대로 임포트하는 대신 BrowserModule.withServerTransition() 함수를 호출하고 반환된 결과를 임포트하는 방식으로 변경되었다.




## 실행방법


### Dynamic SSR

클라이언트가 서버에 URL로 접속할 때 동적으로 랜더링하여 HTML 문자열을 클라이언트에게 전달합니다.

```bash
$ npm run build:ssr && npm run serve:ssr

> some-amazing-project@0.0.0 build:ssr C:\...\some-amazing-project
> npm run build:client-and-server-bundles && npm run compile:server

> some-amazing-project@0.0.0 build:client-and-server-bundles C:\...\some-amazing-project
> ng build --prod && ng run some-amazing-project:server:production

Date: 2019-02-08T10:14:50.665Z
Hash: 0f867e9da8a4c8b20856
Time: 33154ms
chunk {0} runtime.a5dd35324ddfd942bef1.js (runtime) 1.41 kB [entry] [rendered]
chunk {1} main.23fc2c76f6359cdbb1c8.js (main) 239 kB [initial] [rendered]
chunk {2} polyfills.3eb7881d3a00da6c675e.js (polyfills) 41 kB [initial] [rendered]
chunk {3} styles.3ff695c00d717f2d2a11.css (styles) 0 bytes [initial] [rendered]

Date: 2019-02-08T10:15:04.758Z
Hash: c05c0354b6258c113fa6
Time: 7718ms
chunk {main} main.js, main.js.map (main) 52.5 kB [entry] [rendered]

> some-amazing-project@0.0.0 compile:server C:\...\some-amazing-project
> webpack --config webpack.server.config.js --progress --colors

Hash: 43526031ec4bedb1c6c7
Version: webpack 4.29.0
Time: 14370ms
Built at: 2019-02-08 19:15:23
    Asset      Size  Chunks             Chunk Names
server.js  5.28 MiB       0  [emitted]  server
Entrypoint server = server.js
  [0] ./server.ts 1.55 KiB {0} [built]
  [2] external "events" 42 bytes {0} [built]
  [3] external "fs" 42 bytes {0} [built]
  [4] external "timers" 42 bytes {0} [optional] [built]
  [5] external "crypto" 42 bytes {0} [built]
[207] ./src lazy namespace object 160 bytes {0} [built]
[215] external "url" 42 bytes {0} [built]
[274] external "http" 42 bytes {0} [built]
[275] external "https" 42 bytes {0} [built]
[276] external "os" 42 bytes {0} [built]
[286] external "path" 42 bytes {0} [built]
[295] external "util" 42 bytes {0} [built]
[303] external "net" 42 bytes {0} [built]
[308] external "buffer" 42 bytes {0} [built]
[392] ./dist/server/main.js 52.3 KiB {0} [built]
    + 379 hidden modules

> some-amazing-project@0.0.0 serve:ssr C:\...\some-amazing-project
> node dist/server

Node Express server listening on http://localhost:4000
```

`http://localhost:4000/` 주소로 접근해서 확인해 보자. 브라우저에서 페이지 소스보기를 해 보면 body 부분에 마크업들이 이미 있다는 것을 확인할 수 있다.

빌드결과를 살펴보자. server, browser 폴더로 쉽게 구분된다.

```bash
dist
│  server.js
│
├─browser
│      3rdpartylicenses.txt
│      favicon.ico
│      index.html
│      main.23fc2c76f6359cdbb1c8.js
│      polyfills.3eb7881d3a00da6c675e.js
│      runtime.a5dd35324ddfd942bef1.js
│      styles.3ff695c00d717f2d2a11.css
│
└─server
        main.js
        main.js.map
```



### Static Pre-Rendering

클라이언트가 서버에 URL로 접속할 때 미리 랜더링하여 만들어 논 HTML 파일을 클라이언트에게 전달합니다.

package.json 파일에 prerender와 관련한 스크립트 3개를 추가합니다. 이는 다음 사이트를 참고하여 알아낸 방법입니다.

`https://github.com/angular/universal-starter/`

```
"scripts": {
  "ng": "ng",
  "start": "ng serve",
  "build": "ng build",
  "test": "ng test",
  "lint": "ng lint",
  "e2e": "ng e2e",
  "compile:server": "webpack --config webpack.server.config.js --progress --colors",
  "serve:ssr": "node dist/server",
  "build:ssr": "npm run build:client-and-server-bundles && npm run compile:server",
  "build:client-and-server-bundles": "ng build --prod && ng run some-amazing-project:server:production",
  "build:prerender": "npm run build:client-and-server-bundles && npm run compile:server && npm run generate:prerender",
  "generate:prerender": "cd dist && node prerender",
  "serve:prerender": "cd dist/browser && http-server"
},
```

다음 명령을 수행합니다. 하지만 에러가 발생합니다. :(

```bash
$ npm run build:prerender && npm run serve:prerender

> some-amazing-project@0.0.0 build:prerender C:\...\some-amazing-project
> npm run build:client-and-server-bundles && npm run compile:server && npm run generate:prerender

> some-amazing-project@0.0.0 build:client-and-server-bundles C:\...\some-amazing-project
> ng build --prod && ng run some-amazing-project:server:production

Date: 2019-02-08T10:43:05.849Z
Hash: 0f867e9da8a4c8b20856
Time: 19265ms
chunk {0} runtime.a5dd35324ddfd942bef1.js (runtime) 1.41 kB [entry] [rendered]
chunk {1} main.23fc2c76f6359cdbb1c8.js (main) 239 kB [initial] [rendered]
chunk {2} polyfills.3eb7881d3a00da6c675e.js (polyfills) 41 kB [initial] [rendered]
chunk {3} styles.3ff695c00d717f2d2a11.css (styles) 0 bytes [initial] [rendered]

Date: 2019-02-08T10:43:21.876Z
Hash: c05c0354b6258c113fa6
Time: 9221ms
chunk {main} main.js, main.js.map (main) 52.5 kB [entry] [rendered]

> some-amazing-project@0.0.0 compile:server C:\...\some-amazing-project
> webpack --config webpack.server.config.js --progress --colors

Hash: 43526031ec4bedb1c6c7
Version: webpack 4.29.0
Time: 13870ms
Built at: 2019-02-08 19:43:38
    Asset      Size  Chunks             Chunk Names
server.js  5.28 MiB       0  [emitted]  server
Entrypoint server = server.js
  [0] ./server.ts 1.55 KiB {0} [built]
  [2] external "events" 42 bytes {0} [built]
  [3] external "fs" 42 bytes {0} [built]
  [4] external "timers" 42 bytes {0} [optional] [built]
  [5] external "crypto" 42 bytes {0} [built]
[207] ./src lazy namespace object 160 bytes {0} [built]
[215] external "url" 42 bytes {0} [built]
[274] external "http" 42 bytes {0} [built]
[275] external "https" 42 bytes {0} [built]
[276] external "os" 42 bytes {0} [built]
[286] external "path" 42 bytes {0} [built]
[295] external "util" 42 bytes {0} [built]
[303] external "net" 42 bytes {0} [built]
[308] external "buffer" 42 bytes {0} [built]
[392] ./dist/server/main.js 52.3 KiB {0} [built]
    + 379 hidden modules

> some-amazing-project@0.0.0 generate:prerender C:\...\some-amazing-project
> cd dist && node prerender

internal/modules/cjs/loader.js:582
    throw err;
    ^

Error: Cannot find module 'C:\...\some-amazing-project\dist\prerender'
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:580:15)
    at Function.Module._load (internal/modules/cjs/loader.js:506:25)
    at Function.Module.runMain (internal/modules/cjs/loader.js:741:12)
    at startup (internal/bootstrap/node.js:285:19)
    at bootstrapNodeJSCore (internal/bootstrap/node.js:739:3)
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! some-amazing-project@0.0.0 generate:prerender: `cd dist && node prerender`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the some-amazing-project@0.0.0 generate:prerender script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\Seokwon\AppData\Roaming\npm-cache\_logs\2019-02-08T10_43_40_680Z-debug.log
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! some-amazing-project@0.0.0 build:prerender: `npm run build:client-and-server-bundles && npm run compile:server && npm run generate:prerender`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the some-amazing-project@0.0.0 build:prerender script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\Seokwon\AppData\Roaming\npm-cache\_logs\2019-02-08T10_43_40_805Z-debug.log
```

앵귤러 유니버셜은 아직 안정화가 되었다고 볼 수 없습니다. 매우 빠르게 변화가 되고 있기 때문에 설명을 그대로 따라한다고 해도 안되는 경우가 많습니다. 공식 사이트에 설명은 수동으로 작업하는 것을 설명하는데 사용하기에 너무 불편합니다. 시간이 해결하리라 보입니다.

Static Pre-Rendering 방식은 가장 빠른 방법이지만 변화를 수용하지 못합니다. 조금만 바뀌어도 다시 빌드해야 합니다. 실무에서 사용할 수 있는 경우는 거의 없다고 보는 것이 맞게습니다. 앵귤러의 문서화가 매우 나쁘기 때문에 문제가 생길 때 해결하는 방법을 찾는데 많은 시간이 소비됩니다. Static Pre-Rendering 방식은 안되지만 꼭 해야하는 것은 아니므로 안해봐도 되겠다 싶습니다.

앵귤러 설문조사에서 응답한 문장으로 마치겠습니다. 설문도 하는 걸 보면 좀 나아지려나요.

"I can not use Angular without Stackoverflow."
