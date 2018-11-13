import {ChangeDetectorRef, Component, OnInit, ViewChild, Inject} from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogRef, 
        MAT_DIALOG_DATA} from '@angular/material';
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
  displayedColumns = ['name', 'release_date', 'rating', 'genre', 'like'];
  favoritesArray = [];
  movies;
  favorites;
  pageSizeOptions = [10, 20, 50];
  genres;
  genres_list = ['All'];
  selectedGenre = 'All';
  searchQuery = '';

  constructor(private cdRef: ChangeDetectorRef, private http: Http, private router: Router,
              private auth: AuthService, private api: MoviesAppApiService, public dialog: MatDialog) {

    this.username = this.auth.getUsername();
    console.log(this.username);
    if (this.username === null || this.username === undefined) {
      router.navigateByUrl('/auth');
    }
    this.api.getUserDetails().subscribe(res => {
      this.user_details = res.json();
      this.favoritesArray = this.user_details.liked_movies;
      console.log(this.favoritesArray);
      this.processMovies();
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

  insertIntoGenres(genre) {
    if (this.genres_list.indexOf(genre) === -1) {
      this.genres_list.push(genre);
    }
  }

  processMovies() {
    const list = [];
    const fav_list = [];
    this.api.getMovieList().subscribe(res => {
      const results = res.json().movies;
      console.log(results[1]);
      if (results) {
        results.forEach((movie) => {
          const liked = this.favoritesArray.indexOf(movie.id) !== -1;
          movie.genres.forEach(genre => {
            this.insertIntoGenres(genre.name);
          });
          const m = {
            movie_id: movie.id,
            name: movie.title,
            rating: movie.ratings,
            runtime: movie.runtime,
            release_date: movie.release_date,
            liked: liked,
            plot: movie.plot,
            genres: movie.genres.map(x => x.name),
            directors: movie.directors.map(x => x.name),
            cast: movie.cast.map(x => x.name),
            production_companies: movie.production_companies.map(x => x.name)
          };
          if (liked) {
            fav_list.push(m);
          }
          list.push(m);
        });
        this.movies.data = list;
        this.favorites.data = fav_list;
      }
      console.log(this.genres_list);
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
        for (let i = 0; i < data.genres.length; i++) {
          if (data.genres[i].toLowerCase() === filter) { return true; }
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

  movieDetails(movie) {
    console.log("2: ", movie);
    let dialogRef = this.dialog.open(MovieDetailsDialog, {
      width: '750px',
      data: { movie: movie }
    });
  }

  ngOnInit() {
  }

}


@Component({
  selector: 'movie-details-dialog',
  template: `
    <div>
      <h3 class="title">{{movie.name}}</h3>
      <div><strong>Plot: </strong>{{movie.plot}}</div>
      <div><strong>Release Date: </strong>{{movie.release_date}}</div>
      <div><strong>Runtime: </strong>{{movie.runtime}}</div>
      <div><strong>Rating: </strong>{{movie.rating}}</div>
      <div><strong>Genres: </strong>{{movie.genres.join(", ")}}</div>
      <div><strong>Cast: </strong>{{movie.cast.join(", ")}}</div>
      <div><strong>Directors: </strong>{{movie.directors.join(", ")}}</div>
      <div><strong>Production Companies: </strong>{{movie.production_companies.join(", ")}}</div>
      <button mat-button style="float: right" (click)="onNoClick()">Close</button>

      <style>
        div {
          padding: 8px;
        }
        .title {
          text-align: center;
          padding: 4px;
        }
      </style>
    </div>
  `
})
export class MovieDetailsDialog {
  movie;
  constructor(
    public dialogRef: MatDialogRef<MovieDetailsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.movie = data.movie;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
