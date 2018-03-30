import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Router } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
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
