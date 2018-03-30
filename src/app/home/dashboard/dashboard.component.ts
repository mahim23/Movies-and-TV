import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayedColumns = ['name', 'releaseDate', 'rating', 'genre', 'link', 'like'];
  moviesArray;
  favoritesArray;
  movies;
  favorites;
  pageSizeOptions = [10, 4, 2];
  genres = ['All', 'Comedy', 'Horror', 'SciFi'];
  selectedGenre = 'All';
  constructor(private cdRef: ChangeDetectorRef) {
    this.moviesArray = [
      {
        movie_id: 100,
        name: 'Movie 1',
        releaseDate: '20/20/2000',
        rating: 9,
        link: 'link1',
        genre: 'Comedy'
      },
      {
        movie_id: 101,
        name: 'Movie 2',
        releaseDate: '20/20/2000',
        rating: 8,
        link: 'link2',
        genre: 'Horror'
      },
      {
        movie_id: 102,
        name: 'Movie 3',
        releaseDate: '20/20/2000',
        rating: 6,
        link: 'link3',
        genre: 'SciFi'
      },
      {
        movie_id: 103,
        name: 'Movie 4',
        releaseDate: '20/20/2000',
        rating: 7,
        link: 'link4',
        genre: 'Horror'
      },
      {
        movie_id: 104,
        name: 'Movie 5',
        releaseDate: '20/20/2000',
        rating: 9,
        link: 'link5',
        genre: 'Comedy'
      }
    ];

    this.favoritesArray = [100, 102, 103];
    this.moviesArray = this.processMovies();
    this.movies = new MatTableDataSource(this.moviesArray);
    this.favorites = new MatTableDataSource(this.favoritesList());
  }

  @ViewChild('movieSort') sortMovie: MatSort;
  @ViewChild('paginatorMovie') paginatorMovie: MatPaginator;
  @ViewChild('favoritesSort') sortFav: MatSort;
  @ViewChild('paginatorFav') paginatorFav: MatPaginator;

  processMovies() {
    const list = [];
    this.moviesArray.forEach((movie) => {
      movie.liked = this.favoritesArray.indexOf(movie.movie_id) !== -1;
      list.push(movie);
    });
    return list;
  }

  favoritesList() {
    const favList = [];
    this.moviesArray.forEach((movie) => {
      if (movie.liked) { favList.push(movie); }
    });
    return favList;
  }

  likeMovie(movie) {
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
  }

  ngAfterViewInit() {
    this.movies.sort = this.sortMovie;
    this.movies.filterPredicate = (data, filter) => {
      return data.genre.toLowerCase() === filter;
    };
    this.movies.paginator = this.paginatorMovie;
    this.favorites.sort = this.sortFav;
    this.favorites.paginator = this.paginatorFav;
    this.cdRef.detectChanges();
  }

  applyFilter() {
    console.log(this.selectedGenre);
    let genre = this.selectedGenre.trim();
    genre = genre.toLowerCase();
    if (genre !== 'all') {
      this.movies.filter = genre;
    } else {
      this.movies.filter = '';
    }
  }

  goToMovie(link) {
    console.log(link);
    console.log(this.movies);
  }

  ngOnInit() {
  }

}

