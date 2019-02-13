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
