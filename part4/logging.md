# Logging

클라이언트에서 발생하는 에러를 서버로 전송하여 서버 운영자가 이를 파악할 필요가 있습니다.



## 소스코드

work\part4\my-logging



## 에러 핸들링

먼저, 앵귤러가 사용하는 글로벌 에러 핸들러인 ErrorHandler의 작동을 확인해 보겠습니다.

**src\app\app.module.ts**

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, Injectable } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@Injectable()
class MyErrorHandler extends ErrorHandler {
  constructor() {
    super();
  }
  handleError(error) {
    // ErrorHandler는 기본적으로 에러가 발생하면 콘솔에 출력한다.
    // 따라서, 다음 코드를 주석으로 처리하면 콘솔에 출력되지 않는다.
    super.handleError(error);

    // HTTP 서비스의 메소드를 호출하여 서버로 에러정보를 전달하면
    // 서버에서 이를 데이터베이스에 저장한다.
    // 에러의 경중에 따라서 운영자가를 이를 인지할 수 있도록 조치한다.
    alert(`Error: ${error.message}`);
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    // ErrorHandler를 사용해야 할 때 실제로는 MyErrorHandler를 사용하도록 설정할 수 있다.
    {
      provide: ErrorHandler,
      useClass: MyErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```


에러가 발생하는 상황을 만들어 봅니다. 여러번 반복해서 테스트하면 에러가 발생하게 되고 이 때, ErrorHandler가 작동함을 확인할 수 있습니다.

**src\app\app.component.ts**

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  calc() {
    // 50% 확률로 에러가 발생한다.
    if (Math.floor(Math.random() * 2) === 0) {
      throw Error('Custom Error');
    } else {
      console.log('Normal');
    }
  }
}
```


**src\app\app.component.html**

```html
<div class="container">
  <button type="button" (click)="calc()">Happen Error</button>
</div>
```


## ngx-logger

필요에 의해서 만든 모듈을 공개한 개발자분들이 있습니다.

### 공식사이트

https://github.com/dbfannin/ngx-logger

### 설치

```
npm i ngx-logger
```

### 로깅 레벨

https://github.com/dbfannin/ngx-logger/blob/master/src/lib/types/logger-level.enum.ts

위 주소에 있는 파일을 살펴보니 로그 레벨의 종류는 다음과 같다는 것을 알 수 있습니다.

```
export enum NgxLoggerLevel {
  TRACE = 0,
  DEBUG,
  INFO,
  LOG,
  WARN,
  ERROR,
  FATAL,
  OFF
}
```

### 적용

**src\app\app.module.ts**

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, Injectable } from '@angular/core';

import { LoggerModule, NgxLoggerLevel, NGXLogger } from 'ngx-logger';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@Injectable()
class MyErrorHandler extends ErrorHandler {
  constructor(private logger: NGXLogger) {
    super();
  }
  handleError(error) {
    // ErrorHandler는 기본적으로 에러가 발생하면 콘솔에 출력한다.
    // 따라서, 다음 코드를 주석으로 처리하면 콘솔에 출력되지 않는다.
    // super.handleError(error);

    // 필요하다면 UI를 구성해서 사용자에게 보여준다.
    // alert(`Error: ${error.message}`);

    // HTTP 서비스의 메소드를 호출하여 서버로 에러정보를 전달하면
    // 서버에서 이를 데이터베이스에 저장한다.
    // 에러의 경중에 따라서 운영자가를 이를 인지할 수 있도록 조치한다.
    this.logger.error(`Error: ${error.message}`);
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoggerModule.forRoot({
      // Only sends logs to the server for the level specified or higher 
      // (OFF disables the logger for the server)
      // 개발중이라면 environment.ts 파일이 사용되고
      // 빌드에서 --prod 옵션을 설정하면 environment.prod.ts 파일이 사용된다.
      serverLogLevel: environment.production ? NgxLoggerLevel.ERROR : NgxLoggerLevel.OFF,
      // URL to POST logs
      serverLoggingUrl: '/api/logs',
      // The app will only log message for that level or higher (OFF disables the logger for the client)
      level: NgxLoggerLevel.DEBUG,
    })
  ],
  providers: [
    // ErrorHandler를 사용해야 할 때 실제로는 MyErrorHandler를 사용하도록 설정할 수 있다.
    {
      provide: ErrorHandler,
      useClass: MyErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

LoggerModule.forRoot() 부분이 설정의 핵심입니다.

`serverLogLevel: NgxLoggerLevel.ERROR` 설정과 `serverLoggingUrl: '/api/logs'` 설정이 되어 있는 경우, 앱에서 에러가 발생하게 되면 `/api/logs` 주소로 다음과 같은 형태에 데이터가 전송됩니다.

```
{
  level: 'ERROR', 
  message: 'Error message'
}
```

에러가 발생해서 로깅하는 것이 아니라 개발자가 직접 로그를 남기고 싶을 때 사용하는 방법을 살펴보겠습니다.

**src\app\app.component.ts**

```ts
import { Component } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // 필요할 때 직접 로거를 호출하여 기록한다.
  constructor(private logger: NGXLogger) {
    this.logger.debug('Your log message goes here');
    this.logger.debug('Multiple', 'Argument', 'support');
  }

  calc() {
    // 50% 확률로 에러가 발생한다.
    if (Math.floor(Math.random() * 2) === 0) {
      throw Error('Custom Error');
    } else {
      console.log('Normal');
    }
  }
}
```

### 이슈

개발자 사이트를 보니 약간의 이슈가 있습니다. 

https://github.com/dbfannin/ngx-logger/issues

다음은 콘솔에 출력되는 메시지 예입니다.

```
2019-02-13T05:30:24.336Z DEBUG [main.js:136] Multiple Argument support
```

에러가 발생한 지점을 알아야 대응할 수 있는데 ~.ts 파일의 위치를 보여주는 것이 아니라 ~.js 파일을 기준으로 에러가 발생한 위치를 보여줍니다. 이래서는 사용하는 의미가 없습니다. 이미 개발자가 인지하고 있기 때문에 곧 수정되리라 보여집니다.

인터넷을 검색해 보시면 여러 기술들이 있다는 것을 알 수 있습니다. 마음에 차지 않는다면 직접 로깅 모듈을 만들어서 사용하는 것도 하나의 방법입니다.
