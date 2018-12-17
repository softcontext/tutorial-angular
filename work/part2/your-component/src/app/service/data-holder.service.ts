import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataHolderService {
  dataShared = 'Hello World!';

  constructor() { }

  getData() {
    return this.dataShared;
  }

  setData(data) {
    this.dataShared = data;
  }
}
