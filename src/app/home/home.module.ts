import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import {MatButtonModule, MatExpansionModule, MatInputModule, MatPaginatorModule, MatSelectModule, MatSortModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule, MatButtonModule, MatSortModule, MatInputModule, MatPaginatorModule, MatSelectModule,
    MatExpansionModule,
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
