// user.service.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import User from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  private apiurl = 'http://localhost:8080/api/user/';

  constructor(private httpService: HttpClient) {}

  login(username: string, password: string) {
    return this.httpService.post(this.apiurl + 'login', { username, password });
  }

  signup(user: User) {
    return this.httpService.post(this.apiurl + 'signup', user);
  }

  storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('token') || '';
    } else {
      return ''; // or handle the error in an appropriate way
    }
  }
}
