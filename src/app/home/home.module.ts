import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSortModule,
  MatTabsModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AuthService} from 'app/services/auth.service';
import {MoviesAppApiService} from 'app/services/movies-app-api.service';
import { DashboardTvComponent } from './dashboard-tv/dashboard-tv.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    MatTableModule, MatButtonModule, MatSortModule, MatInputModule, MatPaginatorModule, MatSelectModule,
    MatTabsModule, MatIconModule,
    RouterModule.forChild([{
      path: '',
      pathMatch: 'full',
      redirectTo: 'movies'
    }, {
      path: 'movies',
      component: DashboardComponent,
    }, {
      path: 'tv',
      component: DashboardTvComponent
      }])
  ],
  declarations: [DashboardComponent, DashboardTvComponent],
  providers: [AuthService, MoviesAppApiService]
})

export class HomeModule {
  constructor(private router: Router) { }
}
