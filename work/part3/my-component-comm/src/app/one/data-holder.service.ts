import { Injectable } from '@angular/core';
import { Data } from './data';
import { LogService as debug } from '../common/log.service';

@Injectable({
  providedIn: 'root'
})
export class DataHolderService {
  data: Data = {
    title: null,
    date: null
  };

  constructor(private debug: debug) {
    this.debug.log('DataHolderService', 'constructor()');
  }

  setData(data: Data): void {
    this.debug.log('DataHolderService', 'setData()');
    this.data = this.deepCopy(data);
  }

  getData(): Data {
    this.debug.log('DataHolderService', 'getData()');
    return this.deepCopy(this.data);
  }

  deepCopy(obj: Data): Data {
    try {
      return JSON.parse(JSON.stringify(obj));
    } catch (ignore) {
      return obj;
    }
  }
}
