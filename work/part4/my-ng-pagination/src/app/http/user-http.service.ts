import { Injectable } from '@angular/core';
import axios from 'axios';

export class User {
  id: number;
  name: string;
  age: number;
  married: boolean;
  comment: string;
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {
  URL: string = 'http://localhost:3000/pager/users';

  constructor() { }

  findAll(page, size, bsize) {
    return axios.get(this.URL + '?page=' + page + '&size=' + size + '&bsize=' + bsize)
      .then(function(response) {
        // console.log(response);
        return response.data;
      });
  }

  findOne(id: number) {
    return axios.get(this.URL + '/' + id)
      .then(function(response) {
        // console.log(response);
        return response.data;
      });
  }

  addOne(user: User) {
    return axios.post(this.URL, user)
      .then(function(response) {
        // console.log(response);
        return response.data;
      });
  }

  updateOne(user: User) {
    return axios.put(this.URL + '/' + user.id, user)
      .then(function(response) {
        // console.log(response);
        return response.data;
      });
  }

  deleteOne(id: number) {
    return axios.delete(this.URL + '/' + id)
      .then(function(response) {
        // console.log(response);
        return true;
      });
  }
}
