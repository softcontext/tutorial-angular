import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Resolve } from '@angular/router';
import { of, EMPTY, merge } from 'rxjs';
import { delay, mapTo } from 'rxjs/operators';

export class Contact {
  id: number;
  name: string;
  phone: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataResolveGuard implements CanActivate, Resolve<Contact> {
  // 사용하지 않는다.
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }

  // https://angular.io/api/router/Resolve
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<Contact> | Promise<Contact> | Contact {

    // let id = route.params['id'];
    let id = route.paramMap.get('id');

    // 가로챈 패스 문자열을 사용하여
    // 동적으로 데이터를 구하거나 가공한 다음
    // 컴포넌트에게 전달한다.
    let contact: Contact = new Contact();
    contact.id = +id;
    contact.name = 'John Doe';
    contact.phone = '1234';

    return of(contact).pipe(delay(1000));
  }
}
