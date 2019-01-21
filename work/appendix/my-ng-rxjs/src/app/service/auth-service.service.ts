import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // A variant of Subject that requires an initial value and emits its current
  // value whenever it is subscribed to.
  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());

  /**
   * if we have token then the user is logged in status.
   * @returns {boolean}
   */
  private hasToken(): boolean {
    return !!sessionStorage.getItem('token');
  }

  /**
   * @returns {Observable<T>}
   */
  isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

  /**
   *  Login the user then tell all the subscribers about the new status
   */
  login(): void {
    sessionStorage.setItem('token', 'JWT');
    this.isLoginSubject.next(true);
  }

  /**
   * Log out the user then tell all the subscribers about the new status
   */
  logout(): void {
    sessionStorage.removeItem('token');
    this.isLoginSubject.next(false);
  }
}
