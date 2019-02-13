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
      // Only sends logs to the server for the level specified or higher (OFF disables the logger for the server)
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
