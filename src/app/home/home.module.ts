import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import {MatButtonModule, MatInputModule, MatPaginatorModule, MatSelectModule, MatSortModule, MatTabsModule} from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    MatTableModule, MatButtonModule, MatSortModule, MatInputModule, MatPaginatorModule, MatSelectModule,
    MatTabsModule,
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
