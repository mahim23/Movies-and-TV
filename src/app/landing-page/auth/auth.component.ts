import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {
  signup_form: FormGroup;
  constructor(private router: Router) {}

  signup() {
    if (this.signup_form.valid) {
      console.log(this.signup_form.value);
      localStorage.setItem('username', this.signup_form.value.username);
      this.router.navigateByUrl('/dashboard');
    } else {
      console.log('Invalid');
    }
  }

  ngOnInit() {
    const user = localStorage.getItem('username');
    if (user !== null) {
      this.router.navigateByUrl('/dashboard');
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
        // Validators.pattern('[^ @]*@[^ @]*')
        Validators.email
      ]),
    });
  }
}
