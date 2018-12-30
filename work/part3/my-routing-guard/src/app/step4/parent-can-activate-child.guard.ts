import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { CanActivateChild, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ParentCanActivateChildGuard implements CanActivate, CanActivateChild {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    console.log('----------------')
    console.log('URL:', state.url);
    console.log('Path Variable:', route.params);
    console.log('Data:', route.data);
    console.log('Query Param', route.queryParams);

    // URI 패스 변수가 '30'인 경우 false를 리턴하게 되면
    // 해당 자식 컴포넌트를 활성화 할 수 없으므로
    // 이를 이용하지 못하는 부모 컴포넌트의 화면을 완성하지 못하게 됩니다.
    // 결론적으로 라우팅 처리가 모두 취소됩니다.
    if (route.params && route.params.id == '30') {
      return false;
    }

    return true;
  }
}
