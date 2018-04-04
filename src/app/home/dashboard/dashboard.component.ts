import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {MoviesAppApiService} from '../../services/movies-app-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  username = '';
  user_details;
  displayedColumns = ['name', 'releaseDate', 'rating', 'genre', 'like'];
  favoritesArray = [];
  movies;
  favorites;
  pageSizeOptions = [10, 20, 50];
  genres;
  genres_list = ['All'];
  selectedGenre = 'All';
  searchQuery = '';

  constructor(private cdRef: ChangeDetectorRef, private http: Http, private router: Router,
              private auth: AuthService, private api: MoviesAppApiService) {

    this.username = this.auth.getUsername();
    console.log(this.username);
    if (this.username === null || this.username === undefined) {
      router.navigateByUrl('/auth');
    }
    this.api.getUserDetails().subscribe(res => {
      this.user_details = res.json();
      this.favoritesArray = this.user_details.favorite_movies;
      this.api.getMovieGenres().subscribe(res => {
        const g = res.json().genres;
        g.forEach(elem => this.genres_list.push(elem.name));
        this.genres = g;
        this.processMovies();
      });
    }, err => {
      console.log('User not found');
      router.navigateByUrl('/auth');
    });
    this.movies = new MatTableDataSource([]);
    this.favorites = new MatTableDataSource([]);
  }

  @ViewChild('movieSort') sortMovie: MatSort;
  @ViewChild('paginatorMovie') paginatorMovie: MatPaginator;
  @ViewChild('favoritesSort') sortFav: MatSort;
  @ViewChild('paginatorFav') paginatorFav: MatPaginator;

  genre(ids) {
    const g = [];
    for (let i = 0; i < this.genres.length; i++) {
      if (ids.indexOf(this.genres[i].id) !== -1) {
        g.push(this.genres[i].name);
      }
    }
    return g;
  }

  processMovies() {
    const list = [];
    const fav_list = [];
    const min_vote_count = 1500;
    const min_vote_average = 7.0;
    this.api.getMovieList(min_vote_count, min_vote_average, 1).subscribe(res => {
        const pages = res.json().total_pages;
        for (let i = 1; i <= pages; i++) {
          this.api.getMovieList(min_vote_count, min_vote_average, i).subscribe(res => {
            const results = res.json().results;
            if (results) {
              results.forEach((movie) => {
                const liked = this.favoritesArray.indexOf(movie.id.toString()) !== -1;
                const m = {
                  movie_id: movie.id,
                  name: movie.original_title,
                  rating: movie.vote_average,
                  releaseDate: movie.release_date,
                  liked: liked,
                  genre: this.genre(movie.genre_ids)
                };
                if (liked) {
                  fav_list.push(m);
                }
                list.push(m);
              });
              this.movies.data = list;
              this.favorites.data = fav_list;
            }
          });
        }
    });
  }

  likeMovie(movie) {
    return this.api.likeMovie(movie.movie_id).subscribe(res => {
      if (movie.liked) {
        movie.liked = false;
        const list = [];
        this.favorites.data.forEach((m) => {
          if (m.movie_id !== movie.movie_id) { list.push(m); }
        });
        this.favorites.data = list;
      } else {
        movie.liked = true;
        const list = this.favorites.data;
        list.push(movie);
        this.favorites.data = list;
      }
    }, err => {
      console.log('Could not add to favorites');
    });
  }

  ngAfterViewInit() {
    this.movies.sort = this.sortMovie;
    this.movies.paginator = this.paginatorMovie;
    this.favorites.sort = this.sortFav;
    this.favorites.paginator = this.paginatorFav;
    this.cdRef.detectChanges();
  }

  applyFilter(type) {
    if (type === 'genre') {
      this.movies.filterPredicate = (data, filter) => {
        for (let i = 0; i < data.genre.length; i++) {
          if (data.genre[i].toLowerCase() === filter) { return true; }
        }
        return false;
      };
      let genre = this.selectedGenre.trim();
      genre = genre.toLowerCase();
      if (genre !== 'all') {
        this.movies.filter = genre;
      } else {
        this.movies.filter = '';
      }
    } else {
      this.movies.filterPredicate = (data, filter) => {
        return data.name.toLowerCase().indexOf(filter.toLocaleLowerCase()) !== -1;
      };
      this.movies.filter = this.searchQuery.trim().toLocaleLowerCase();
    }
  }

  goToMovie(link) {
    console.log(link);
  }

  ngOnInit() {
  }

}
