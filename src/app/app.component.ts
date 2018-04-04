import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'app';
  username;
  isLoggedIn: Observable<boolean>;

  constructor(private auth: AuthService, private router: Router){
    this.isLoggedIn = this.auth.getAuthorizedObservable();
    this.username = this.auth.getUsernameObservable();
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/auth');
  }
}
