import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import { RouterModule, Router } from '@angular/router';
import {MatButtonModule, MatCardModule, MatDividerModule, MatInputModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatDividerModule, MatButtonModule, MatCardModule, MatInputModule,
    RouterModule.forChild([{
      path: '',
      component: AuthComponent
    }])
  ],
  declarations: [AuthComponent]
})
export class LandingPageModule {
  constructor(private router: Router) { }
}
