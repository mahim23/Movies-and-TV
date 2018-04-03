import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder, ValidatorFn} from '@angular/forms';
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

  signupForm: FormGroup;
  loginForm: FormGroup;
  usernameExists = true;

  constructor(private router: Router, private http: Http, private auth: AuthService,
              private api: MoviesAppApiService) {}

  usernameExistsValidator(control: FormControl) {
    console.log(this.usernameExists);
    return this.usernameExists ? {'usernameExists': {value: control.value}} : null;
  }

  signup() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      const signupData = {
        username: this.signupForm.value.username,
        password: this.signupForm.value.password,
        first_name: this.signupForm.value.firstName,
        last_name: this.signupForm.value.lastName,
        email: this.signupForm.value.email
      };
      this.api.signup(signupData).subscribe(res => {
        console.log(res);
        if (res._body.indexOf('exists') !== -1) {
          this.usernameExists = true;
          this.signupForm.controls.username.updateValueAndValidity();
          console.log(this.usernameExists, this.signupForm);
        } else {
          this.auth.login(signupData.username);
          // this.router.navigateByUrl('/dashboard');
        }
      }, err => {
        console.log('Username already exists');
      });
    } else {
      console.log('Invalid form details');
    }
  }

  ngOnInit() {
    const user = this.auth.getUsername();
    if (user) {
      this.api.getUserDetails().subscribe(res => this.router.navigateByUrl('/dashboard'),
        err => console.log('Username not valid. Login again.'));
    }
    this.signupForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        this.usernameExistsValidator.bind(this)
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
    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ])
    });
  }

  func() {
    console.log(this.usernameExists);
  }
}
