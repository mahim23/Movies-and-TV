import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {Http} from '@angular/http';
import {AuthService} from '../../services/auth.service';
import {MoviesAppApiService} from '../../services/movies-app-api.service';
import {SHAHashService} from '../../services/shahash.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {

  signupForm: FormGroup;
  loginForm: FormGroup;
  usernameExists = false;
  loginPasswordHide = true;
  signupPasswordHide = true;
  invalidLogin = false;

  constructor(private router: Router, private http: Http, private auth: AuthService,
              private api: MoviesAppApiService, private sha: SHAHashService) {}

  usernameExistsValidator(control: FormControl) {
    return this.usernameExists ? {'usernameExists': {value: control.value}} : null;
  }

  login() {
    this.invalidLogin = false;
    if (this.loginForm.valid) {
      this.api.login(this.loginForm.value.username, this.sha.hash(this.loginForm.value.password))
      .subscribe(res => {
        if (res["_body"].indexOf('Invalid') !== -1) {
          this.invalidLogin = true;
          this.loginForm.controls.password.reset();
          this.loginForm.controls.password.markAsUntouched();
          this.loginForm.controls.password.setErrors(null);
        } else {
          console.log('Login successful');
          this.auth.login(this.loginForm.value.username);
          this.router.navigateByUrl('/dashboard');
        }
      })
    }
  }

  signup() {
    if (this.signupForm.valid) {
      const signupData = {
        username: this.signupForm.value.username,
        password: this.sha.hash(this.signupForm.value.password),
        first_name: this.signupForm.value.firstName,
        last_name: this.signupForm.value.lastName,
        email: this.signupForm.value.email
      };
      this.api.signup(signupData).subscribe(res => {
        if (res["_body"].indexOf('exists') !== -1) {
          this.usernameExists = true;
          this.signupForm.controls.username.updateValueAndValidity();
          this.signupForm.controls.password.reset();
          this.signupForm.controls.password.markAsUntouched();
          this.signupForm.controls.password.setErrors(null);
        } else {
          console.log('Signup successful');
          this.auth.login(signupData.username);
          this.router.navigateByUrl('/dashboard');
        }
      }, err => {
        console.log('Could not complete the signup');
        this.signupForm.controls.password.reset();
        this.signupForm.controls.password.markAsUntouched();
        this.signupForm.controls.password.setErrors(null);
      });
    }
  }

  ngOnInit() {
    const user = this.auth.getUsername();
    if (user) {
      this.api.getUserDetails().subscribe(res => this.router.navigateByUrl('/dashboard'),
        err => console.log('Username not valid'));
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

  clear() {
    this.signupForm.reset();
  }
}
