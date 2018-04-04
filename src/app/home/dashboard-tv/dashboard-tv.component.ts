import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Http} from '@angular/http';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import {AuthService} from '../../services/auth.service';
import {MoviesAppApiService} from '../../services/movies-app-api.service';

@Component({
  selector: 'app-dashboard-tv',
  templateUrl: './dashboard-tv.component.html',
  styleUrls: ['./dashboard-tv.component.css']
})
export class DashboardTvComponent implements OnInit {

  username = '';
  user_details;
  displayedColumns = ['name', 'firstAirDate', 'rating', 'genre', 'link', 'like'];
  favoritesArray = [];
  tv;
  favorites;
  pageSizeOptions = [10, 20, 50];
  genres;
  genres_list = ['All'];
  selectedGenre = 'All';
  searchQuery = '';
  amazon_search_link = 'https://www.amazon.in/s/ref=a9_asc_1?rh=i%3Aaps%2Ck%3A';

  constructor(private cdRef: ChangeDetectorRef, private http: Http, private router: Router,
              private auth: AuthService, private api: MoviesAppApiService) {

    this.username = this.auth.getUsername();
    console.log(this.username);
    if (this.username === null || this.username === undefined) {
      router.navigateByUrl('/auth');
    }
    this.api.getUserDetails().subscribe(res => {
      this.user_details = res.json();
      this.favoritesArray = this.user_details.favorite_tv;
      this.api.getTVGenres().subscribe(res => {
        const g = res.json().genres;
        g.forEach(elem => this.genres_list.push(elem.name));
        this.genres = g;
        this.processTV();
      });
    }, err => {
      console.log('User not found');
      router.navigateByUrl('/auth');
    });
    this.tv = new MatTableDataSource([]);
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

  processTV() {
    const list = [];
    const fav_list = [];
    const min_vote_count = 250;
    const min_vote_average = 5;
    this.api.getTVList(min_vote_count, min_vote_average, 1).subscribe(res => {
      const pages = res.json().total_pages;
      for (let i = 1; i <= pages; i++) {
        this.api.getTVList(min_vote_count, min_vote_average, i).subscribe(res => {
          const results = res.json().results;
          if (results) {
            results.forEach((tv) => {
              const liked = this.favoritesArray.indexOf(tv.id.toString()) !== -1;
              const m = {
                tv_id: tv.id,
                name: tv.original_name,
                rating: tv.vote_average,
                firstAirDate: tv.first_air_date,
                liked: liked,
                genre: this.genre(tv.genre_ids)
              };
              if (liked) {
                fav_list.push(m);
              }
              list.push(m);
            });
            this.tv.data = list;
            this.favorites.data = fav_list;
          }
        });
      }
    });
  }

  likeTV(tv) {
    return this.api.likeTV(tv.tv_id).subscribe(res => {
      if (tv.liked) {
        tv.liked = false;
        const list = [];
        this.favorites.data.forEach((m) => {
          if (m.tv_id !== tv.tv_id) { list.push(m); }
        });
        this.favorites.data = list;
      } else {
        tv.liked = true;
        const list = this.favorites.data;
        list.push(tv);
        this.favorites.data = list;
      }
    }, err => {
      console.log('Could not add to favorites');
    });
  }

  ngAfterViewInit() {
    this.tv.sort = this.sortMovie;
    this.tv.paginator = this.paginatorMovie;
    this.favorites.sort = this.sortFav;
    this.favorites.paginator = this.paginatorFav;
    this.cdRef.detectChanges();
  }

  applyFilter(type) {
    if (type === 'genre') {
      this.tv.filterPredicate = (data, filter) => {
        for (let i = 0; i < data.genre.length; i++) {
          if (data.genre[i].toLowerCase() === filter) { return true; }
        }
        return false;
      };
      let genre = this.selectedGenre.trim();
      genre = genre.toLowerCase();
      if (genre !== 'all') {
        this.tv.filter = genre;
      } else {
        this.tv.filter = '';
      }
    } else {
      this.tv.filterPredicate = (data, filter) => {
        return data.name.toLowerCase().indexOf(filter.toLocaleLowerCase()) !== -1;
      };
      this.tv.filter = this.searchQuery.trim().toLocaleLowerCase();
    }
  }

  goToTV(name) {
    name = name + " dvd";
    const link = this.amazon_search_link + name + '&keywords=' + name;
    window.open(link);
  }

  ngOnInit() {
  }

}
