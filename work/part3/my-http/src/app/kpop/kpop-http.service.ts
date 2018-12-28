import { Injectable } from '@angular/core';
import { Kpop } from './kpop';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class KpopHttpService {
  configUrl = './assets/server/kpop.json';

  constructor(private http: HttpClient) { }

  // http.get 함수는 JSON 문자열을 받아서 객체상태로 바꾼 후
  // 콜백함수의 파라미터 res에 전달한다.
  // 단순히, JSON.parse('JSON 문자열') 처리가 된 상태이다.
  getIdols(): Promise<Kpop[]> {
    return this.http.get(this.configUrl)
      .pipe(map(res => {
        // 배열을 객체가 감싸고 있다. 단순히 객체를 벗기기 위해서
        // 자료형 클래스를 도입하는 것은 마음에 들지 않으므로
        // 간단히 Type Assertion 으로 처리한다.
        let idolsNoType = (<any>res).idols;

        // 배열 객체인 상태이긴 하지만 배열 요소에 타입이 없는 상태다.
        console.log(idolsNoType); // [{…}, {…}, {…}]

        // 타입이 없는 객체를 타입이 있는 객체로 변경한다.
        // https://stackoverflow.com/a/22886730/6103920
        // 타입이 없는 상태로 사용하는 것은 TS 답지 않다고 할 수 있다.
        let idolsWithType: Kpop[] = [];
        for (let i = 0; i < idolsNoType.length; i++) {
          idolsWithType.push(new Kpop().deserialize(idolsNoType[i]));
        }
        // 이제 타입이 있는 객체를 요소로 가지는 배열을 얻었다.
        console.log(idolsWithType); // [Kpop, Kpop, Kpop]

        return idolsWithType;
      }))
      .toPromise();
  }

}
