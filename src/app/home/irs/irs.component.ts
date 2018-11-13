import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
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
  username;

  constructor(private router: Router, private auth: AuthService, private api: MoviesAppApiService) {
    this.username = this.auth.getUsername();
    console.log(this.username);
    if (this.username === null || this.username === undefined) {
      router.navigateByUrl('/auth');
    }
    this.api.getUserDetails().subscribe(res => {
      console.log("User valid");
    }, err => {
      console.log('User not found');
      router.navigateByUrl('/auth');
    });
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
