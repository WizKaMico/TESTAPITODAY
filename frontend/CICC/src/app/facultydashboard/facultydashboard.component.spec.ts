import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultydashboardComponent } from './facultydashboard.component';

describe('FacultydashboardComponent', () => {
  let component: FacultydashboardComponent;
  let fixture: ComponentFixture<FacultydashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultydashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultydashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
