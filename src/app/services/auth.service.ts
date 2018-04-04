import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class AuthService {

  static isLoggedIn = false;
  static username;
  static loginObserver: Observer<boolean>;
  static isAuthorized: Observable<boolean>;
  static usernameObservable: Observable<string>;
  static usernameObserver: Observer<string>;

  constructor() {
    if (localStorage.getItem('username')) {
      AuthService.isLoggedIn = true;
      AuthService.username = localStorage.getItem('username');
    }
  }

  login(username) {
    localStorage.setItem('username', username);
    AuthService.username = username;
    AuthService.loginObserver.next(true);
    AuthService.isLoggedIn = true;
  }

  logout() {
    localStorage.removeItem('username');
    AuthService.isLoggedIn = false;
    AuthService.loginObserver.next(false);
    AuthService.username = null;
  }

  getUsername() {
    return AuthService.username;
  }

  getAuthorizedObservable() {
    AuthService.isAuthorized = new Observable<boolean>(observer => {
      AuthService.loginObserver = observer;
      if (localStorage.getItem('username')) {
        AuthService.loginObserver.next(true);
      } else {
        AuthService.loginObserver.next(false);
      }
    });
    return AuthService.isAuthorized;
  }

  getUsernameObservable() {
    AuthService.usernameObservable = new Observable<string>(observer => {
      AuthService.usernameObserver = observer;
      if (localStorage.getItem('username')) {
        AuthService.usernameObserver.next(localStorage.getItem('username'));
      } else {
        AuthService.usernameObserver.next('');
      }
    });
    return AuthService.usernameObservable;
  }

}
