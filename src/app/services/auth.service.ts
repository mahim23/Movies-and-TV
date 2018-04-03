import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  isLoggedIn = false;
  username;

  constructor() {
    if (localStorage.getItem('username')) {
      this.isLoggedIn = true;
      this.username = localStorage.getItem('username');
    }
  }

  login(username) {
    localStorage.setItem('username', username);
    this.username = username;
    this.isLoggedIn = true;
  }

  logout() {
    localStorage.removeItem('username');
    this.isLoggedIn = false;
    this.username = null;
  }

  getUsername() {
    return this.username;
  }

}
