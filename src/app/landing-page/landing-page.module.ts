import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import { RouterModule, Router } from '@angular/router';
import {MatButtonModule, MatCardModule, MatDividerModule, MatIconModule, MatInputModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AuthService} from '../services/auth.service';
import {MoviesAppApiService} from '../services/movies-app-api.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule, HttpModule,
    MatDividerModule, MatButtonModule, MatCardModule, MatInputModule, MatIconModule,
    RouterModule.forChild([{
      path: '',
      component: AuthComponent
    }])
  ],
  declarations: [AuthComponent],
  providers: [AuthService, MoviesAppApiService]
})
export class LandingPageModule {
  constructor(private router: Router) { }
}
