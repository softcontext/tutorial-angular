import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberOnlyCanActivateGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    console.log('MemberOnlyCanActivateGuard # canActivate()');

    // SessionStorage에 로그인 정보가 있는지 확인하여
    // 있으면 통과 시킨다.
    if (sessionStorage.getItem('currentUser')) {
      return true;
    }

    // 없으면 로그인 화면으로 리다이렉트 한다.
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    // 요청받은 컴포넌트를 연동하지 않는다.
    return false;
  }
}
