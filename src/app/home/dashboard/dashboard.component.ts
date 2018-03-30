import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  columnsToDisplay: ['name', 'releaseDate', 'rating'];
  displayedColumns = ['name', 'releaseDate', 'rating', 'link'];
  dataSource = new MatTableDataSource(movies);
  pageSizeOptions = [2, 4, 10];
  genres = ['All', 'Comedy', 'Horror', 'SciFi'];
  selectedGenre = 'All';
  constructor() { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (data, filter) => {
      return data.genre.toLowerCase() === filter;
    };
    this.dataSource.paginator = this.paginator;
  }

  applyFilter() {
    console.log(this.selectedGenre);
    let genre = this.selectedGenre.trim();
    genre = genre.toLowerCase();
    if (genre !== 'all') {
      this.dataSource.filter = genre;
    } else {
      this.dataSource.filter = '';
    }
  }

  goToMovie(link) {
    console.log(link);
    console.log(this.dataSource);
  }

  ngOnInit() {
  }

}

const movies = [
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
