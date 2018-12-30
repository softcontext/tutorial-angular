import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MemberAuthService {
  member = {
    id: 'user',
    pw: '1234'
  }

  constructor() { }

  auth(id: string, pw: string) {
    if (id === this.member.id) {
      if (pw === this.member.pw) {
        // 로그인 처리결과인 사용자 정보를 SessionStorage에 저장한다.
        sessionStorage.setItem('currentUser', JSON.stringify({id: this.member.id}));
        return true;
      }
    }
    return false;
  }
}
