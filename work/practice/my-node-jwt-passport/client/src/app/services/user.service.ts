import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  appUrl = environment.apiUrl;

  constructor(private http: HttpClient, private auth: AuthService) { }

  getUsers(): Observable<User[]> {
    // const headers = new HttpHeaders()
    //   .set('Authorization', this.auth.getToken());
    //
    // return this.http.get<User[]>(`${this.appUrl}/users`, { headers })
    //   .pipe(
    //     shareReplay(1)
    //   );

    // @auth0/angular-jwt에서는 헤더설정을 해야 했으나,
    // angular2-jwt에서는 헤더설정이 자동적으로 처리된다.
    return this.http.get<User[]>(`${this.appUrl}/users`)
      .pipe(
        shareReplay(1)
      );
  }

}

// shareReplay:
// It may also be valuable in situations where you know you will have late subscribers to a stream
// that need access to previously emitted values.
