import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { CanLoad, Route, UrlSegment } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HeavyCanLoadGuard implements CanActivate, CanLoad {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }

  // 모듈의 기동조건을 만족했는 지 여부를 체크하는 로직을 배치합니다.
  // 모듈이 기동한 후에는 다시 작동하지 않습니다.
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    console.log('HeavyCanLoadGuard # canLoad()');

    console.log(route)
    // {
    //   path: "heavy",
    //   canLoad: Array(1),
    //   loadChildren: "src/app/step5/heavy/heavy.module#HeavyModule" }

    console.log(segments)
    // [
    //   {"path":"heavy","parameters":{}},
    //   {"path":"heavy2","parameters":{}} ]

    if (this.getRandomInt(1, 3) === 1) {
      alert('Unlucky! Routing cancelled.')
      return false;
    } else {
      alert('Lucky! Routing proceed.')
      return true;
    }
  }

  // min(포함)과 max(불포함) 사이의 임의 정수를 반환
  // Math.round()를 사용하면 고르지 않은 분포를 얻게된다!
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
