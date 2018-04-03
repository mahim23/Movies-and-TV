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


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    MatTableModule, MatButtonModule, MatSortModule, MatInputModule, MatPaginatorModule, MatSelectModule,
    MatTabsModule, MatIconModule,
    RouterModule.forChild([{
      path: '',
      component: DashboardComponent
    }])
  ],
  declarations: [DashboardComponent]
})
export class HomeModule {
  constructor(private router: Router) { }
}
