import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {
  data: string = 'UserHttpService';

  constructor() {
    console.log('--- UserHttpService() ---');
  }
}
