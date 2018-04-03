import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {AuthService} from './auth.service';

@Injectable()
export class MoviesAppApiService {

  API_KEY = 'a7d5b9030fe407574db51d1001cb8c90&';
  MOVIES_APP_URL = 'http://localhost:8000/api/';
  TMDB_URL = 'https://api.themoviedb.org/3/';

  constructor(private http: Http, private api: AuthService) { }

  getUserDetails() {
    return this.http.get(this.MOVIES_APP_URL + 'user/' + this.api.getUsername());
  }

  likeMovie(movie_id) {
    const formData = new FormData();
    formData.append('username', this.api.getUsername());
    formData.append('movie_id', movie_id);
    return this.http.post(this.MOVIES_APP_URL + 'like-movie', formData);
  }

  likeTV(tv_id) {
    const formData = new FormData();
    formData.append('username', this.api.getUsername());
    formData.append('tv_id', tv_id);
    return this.http.post(this.MOVIES_APP_URL + 'like-tv', formData);
  }

  login(username, password) {
    const formData = new FormData();
    formData.append('username', username);
    // password = hash(passowrd);
    formData.append('password', password);
    return this.http.post(this.MOVIES_APP_URL + 'login', formData);
  }

  signup(userDetails) {
    const formData = new FormData();
    formData.append('user_details', JSON.stringify(userDetails));
    return this.http.post(this.MOVIES_APP_URL + 'signup', formData);
  }

  getMovieGenres() {
    return this.http.get(this.TMDB_URL + 'genre/movie/list?api_key=' + this.API_KEY +
      'language=en-US');
  }

  getTVGenres() {
    return this.http.get(this.TMDB_URL + 'genre/tv/list?api_key=' + this.API_KEY +
      'language=en-US');
  }

  getMovieList(min_vote_count, min_vote_average, pageNo) {
    return this.http.get(this.TMDB_URL + 'discover/movie?api_key=' + this.API_KEY + 'language=en-US&' +
      'sort_by=original_title.asc&include_adult=false&include_video=false&page=' + pageNo + '&vote_count.gte='
      + min_vote_count + '&vote_average.gte=' + min_vote_average + '&with_original_language=en');
  }

  getTVList(min_vote_count, min_vote_average, pageNo) {
    return this.http.get(this.TMDB_URL + 'discover/tv?api_key=' + this.API_KEY + 'language=' +
      'en-US&sort_by=original_name.desc&page=' + pageNo + '&timezone=America%2FNew_York&vote_average.gte=' +
      min_vote_average + '&vote_count.gte=2' + min_vote_count + '&include_null_first_air_dates=false&' +
      'with_original_language=en');
  }
}
