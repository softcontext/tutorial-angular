import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventBridgeService {
  subject: Subject<any> = new Subject();

  constructor() { }

  observe(): Observable<any> {
    return this.subject.asObservable();
  }

  publish(signal: string) {
    this.subject.next({ signal });
  }
}
