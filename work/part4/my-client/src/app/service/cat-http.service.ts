import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Cat {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class CatHttpService {
  URL = 'http://localhost:3000/api/cats/'

  constructor(private http: HttpClient) { }

  getAllCats(): Observable<Cat[]> {
    return this.http.get<Cat[]>(this.URL);
  }

  getCat(name: string): Observable<Cat> {
    return this.http.get<Cat>(this.URL + name);
  }

  insertCat(cat: Cat): Observable<Cat> {
    return this.http.post<Cat>(this.URL, cat);
  }

  updateCat(cat: Cat): Observable<void> {
    return this.http.put<void>(this.URL + cat.name, cat);
  }

  deleteCat(name: string) {
    return this.http.delete(this.URL + name);
  }
}
