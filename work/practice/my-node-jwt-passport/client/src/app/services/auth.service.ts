import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { JwtHelperService } from '@auth0/angular-jwt';

import { Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { User } from 'src/app/models/user';
import { Token } from 'src/app/models/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  appUrl = environment.apiUrl;
  TOKEN_NAME = 'jwt_token';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    console.log('[appUrl] ', this.appUrl);
  }

  /**
   * 회원인증(로그인)
   */
  signin(credential: User): Observable<Token> {
    return this.http.post<Token>(`${this.appUrl}/auth/signin`, credential)
      .pipe(
        tap(res => {
          console.log('res:', res);
          this.setToken(res.token);
        }),
        // defaults to all values so we set it to just keep and replay last one
        shareReplay()
      );
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_NAME, token);
  }

  /**
   * 로그아웃
   */
  signout(): void {
    this.removeToken();
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_NAME);
  }

  /**
   * 받은 토큰이 존재하고 유효기간이 지나지 않은 토큰인지 확인한다.
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? !this.isTokenExpired(token) : false;
  }

  getToken(): string {
    console.log('getToken():', localStorage.getItem(this.TOKEN_NAME));
    return localStorage.getItem(this.TOKEN_NAME);
  }

  /*
    토큰 유효 기간 체크
    The JwtHelperService class has several useful methods
    that can be utilized in your components:

    - decodeToken
    - getTokenExpirationDate
    - isTokenExpired

    npm install angular2-jwt
    https://github.com/auth0/angular2-jwt
  */
  isTokenExpired(token: string) {
    return this.jwtHelper.isTokenExpired(token);
  }

  /**
   * 토큰을 디코딩해서 사용자 아이디를 획득한다.
   */
  getUserid(): string {
    console.log('getUserid():', this.getToken());
    return this.jwtHelper.decodeToken(this.getToken()).userid;
  }

  // XXX: not use
  // kakaoLogin(): Observable<Token> {
  //   return this.http.get<Token>(`${this.appUrl}/auth/kakao`)
  //     .pipe(
  //       tap(res => {
  //         console.log('res:', res);
  //         this.setToken(res.token);
  //       }),
  //       shareReplay()
  //     );
  // }

}
