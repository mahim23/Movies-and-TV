import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {Http} from '@angular/http';
import {AuthService} from '../../services/auth.service';
import {MoviesAppApiService} from '../../services/movies-app-api.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {

  signup_form: FormGroup;

  constructor(private router: Router, private http: Http, private auth: AuthService,
              private api: MoviesAppApiService) {}

  signup() {
    if (this.signup_form.valid) {
      console.log(this.signup_form.value);
      const signupData = {
        username: this.signup_form.value.username,
        password: this.signup_form.value.password,
        first_name: this.signup_form.value.firstName,
        last_name: this.signup_form.value.lastName,
        email: this.signup_form.value.email
      };
      this.api.signup(signupData).subscribe(res => {
        this.auth.login(signupData.username);
        this.router.navigateByUrl('/dashboard');
      }, err => {
        console.log('Username already exists');
      });
    } else {
      console.log('Invalid form details');
    }
  }

  ngOnInit() {
    const user = this.auth.getUsername();
    if (user !== null) {
      this.api.getUserDetails().subscribe(res => this.router.navigateByUrl('/dashboard'),
        err => console.log('Username not valid. Login again.'));
    }
    this.signup_form = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ]),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
    });
  }
}
