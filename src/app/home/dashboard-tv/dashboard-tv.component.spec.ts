import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTvComponent } from './dashboard-tv.component';

describe('DashboardTvComponent', () => {
  let component: DashboardTvComponent;
  let fixture: ComponentFixture<DashboardTvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardTvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
