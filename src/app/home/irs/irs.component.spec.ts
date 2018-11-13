import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IrsComponent } from './irs.component';

describe('IrsComponent', () => {
  let component: IrsComponent;
  let fixture: ComponentFixture<IrsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IrsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
