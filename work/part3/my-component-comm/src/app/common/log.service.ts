import { Injectable } from '@angular/core';
import { Log } from './log';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  data: Array<Log> = [];

  constructor() { }

  log(tag: string, message: string): void {
    if (environment.loggable) {
      this.data.push({ tag, message, date: new Date() });
    }
  }

  getData(): Array<Log> {
    return this.data;
  }

  clear(): Array<Log> {
    if (environment.loggable) {
      this.data = [];
      return this.data;
    }
    return null;
  }
}
