import {ChangeDetectorRef, Component, OnInit, ViewChild, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {Http} from '@angular/http';
import {MatPaginator, MatTableDataSource, MatSort, MatDialog, MatDialogRef, 
  MAT_DIALOG_DATA} from '@angular/material';
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
  displayedColumns = ['name', 'first_air_date', 'rating', 'genre', 'like'];
  favoritesArray = [];
  tv;
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
      this.favoritesArray = this.user_details.liked_tv;
      this.processTV();
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

  insertIntoGenres(genre) {
    if (this.genres_list.indexOf(genre) === -1) {
      this.genres_list.push(genre);
    }
  }

  processTV() {
    const list = [];
    const fav_list = [];
    this.api.getTVList().subscribe(res => {
      const results = res.json().tv;
      if (results) {
        results.forEach((tv) => {
          const liked = this.favoritesArray.indexOf(tv.id) !== -1;
          tv.genres.forEach(genre => {
            this.insertIntoGenres(genre.name);
          });
          const m = {
            tv_id: tv.id,
            name: tv.title,
            plot: tv.plot,
            rating: tv.ratings,
            first_air_date: tv.start_date,
            no_of_seasons: tv.no_of_seasons,
            no_of_episodes: tv.no_of_episodes,
            liked: liked,
            genres: tv.genres.map(x => x.name),
            directors: tv.directors.map(x => x.name),
            cast: tv.cast.map(x => x.name),
            production_companies: tv.production_companies.map(x => x.name)
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
        for (let i = 0; i < data.genres.length; i++) {
          if (data.genres[i].toLowerCase() === filter) { return true; }
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

  tvDetails(tv) {
    let dialogRef = this.dialog.open(TVDetailsDialog, {
      width: '750px',
      data: { tv: tv }
    });
  }

  ngOnInit() {
  }

}

@Component({
  selector: 'tv-details-dialog',
  template: `
    <div>
      <h3 class="title">{{tv.name}}</h3>
      <div><strong>Plot: </strong>{{tv.plot}}</div>
      <div><strong>First Air Date: </strong>{{tv.first_air_date}}</div>
      <div><strong>Rating: </strong>{{tv.rating}}</div>
      <div><strong>Number of Seasons: </strong>{{tv.no_of_seasons}}</div>
      <div><strong>Number of Episodes: </strong>{{tv.no_of_episodes}}</div>
      <div><strong>Genres: </strong>{{tv.genres.join(", ")}}</div>
      <div><strong>Cast: </strong>{{tv.cast.join(", ")}}</div>
      <div><strong>Production Companies: </strong>{{tv.production_companies.join(", ")}}</div>
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
export class TVDetailsDialog {
  tv;
  constructor(
    public dialogRef: MatDialogRef<TVDetailsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.tv = data.tv;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

