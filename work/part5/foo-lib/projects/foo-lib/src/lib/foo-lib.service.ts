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
