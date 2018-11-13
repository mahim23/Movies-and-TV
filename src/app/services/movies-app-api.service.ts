import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {AuthService} from './auth.service';

@Injectable()
export class MoviesAppApiService {

  BACKEND_URL = 'http://localhost:8000/api/';

  constructor(private http: Http, private api: AuthService) { }

  getUserDetails() {
    return this.http.get(this.BACKEND_URL + 'user/' + this.api.getUsername());
  }

  likeMovie(movie_id) {
    const formData = new FormData();
    formData.append('username', this.api.getUsername());
    formData.append('movie_id', movie_id);
    return this.http.post(this.BACKEND_URL + 'user/like/movie', formData);
  }

  likeTV(tv_id) {
    const formData = new FormData();
    formData.append('username', this.api.getUsername());
    formData.append('tv_id', tv_id);
    return this.http.post(this.BACKEND_URL + 'user/like/tv', formData);
  }

  login(username, password) {
    const formData = new FormData();
    formData.append('username', username);
    // password = hash(password);
    formData.append('password', password);
    return this.http.post(this.BACKEND_URL + 'auth/login', formData);
  }

  signup(userDetails) {
    const formData = new FormData();
    formData.append('user_details', JSON.stringify(userDetails));
    return this.http.post(this.BACKEND_URL + 'auth/signup', formData);
  }

  getMovieList() {
    return this.http.get(this.BACKEND_URL + 'movies');
  }

  getTVList() {
    return this.http.get(this.BACKEND_URL + 'tv');
  }

  runIRS(query) {
    return this.http.get(this.BACKEND_URL + 'irs/director/' + query);
  }
}
