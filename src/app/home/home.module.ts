import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent, MovieDetailsDialog } from './dashboard/dashboard.component';
import { RouterModule, Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSortModule,
  MatTabsModule,
  MatDialogModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AuthService} from 'app/services/auth.service';
import {MoviesAppApiService} from 'app/services/movies-app-api.service';
import { DashboardTvComponent, TVDetailsDialog } from './dashboard-tv/dashboard-tv.component';
import { IrsComponent } from './irs/irs.component';
import { NgxJsonViewerModule } from 'ngx-json-viewer';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    MatTableModule, MatButtonModule, MatSortModule, MatInputModule, MatPaginatorModule, MatSelectModule,
    MatTabsModule, MatIconModule, MatDialogModule, NgxJsonViewerModule,
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
    }, {
      path: 'irs',
      component: IrsComponent
    }])
  ],
  declarations: [DashboardComponent, DashboardTvComponent, MovieDetailsDialog, TVDetailsDialog, IrsComponent],
  providers: [AuthService, MoviesAppApiService],
  entryComponents: [MovieDetailsDialog, TVDetailsDialog]
})

export class HomeModule {
  constructor(private router: Router) { }
}
