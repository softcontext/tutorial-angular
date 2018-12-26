import { Component } from '@angular/core';
import { Log } from './common/log';
import { LogService } from './common/log.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  data: Array<Log> = [];

  constructor(private logService: LogService) {
    this.data = this.logService.getData();
  }

  clear() {
    this.data = this.logService.clear();
  }
}
