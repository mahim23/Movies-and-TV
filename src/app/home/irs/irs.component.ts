import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {MoviesAppApiService} from '../../services/movies-app-api.service';

@Component({
  selector: 'app-irs',
  templateUrl: './irs.component.html',
  styleUrls: ['./irs.component.css']
})
export class IrsComponent implements OnInit {

  searchQuery = "";
  irsResults = [];

  constructor(private auth: AuthService, private api: MoviesAppApiService) {

  }

  runQuery() {
    this.api.runIRS(this.searchQuery).subscribe(res => {
      console.log(res.json().response);
      this.irsResults = res.json().response;
    })
  }

  ngOnInit() {
  }

}
