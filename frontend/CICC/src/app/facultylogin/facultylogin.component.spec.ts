import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyloginComponent } from './facultylogin.component';

describe('FacultyloginComponent', () => {
  let component: FacultyloginComponent;
  let fixture: ComponentFixture<FacultyloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultyloginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultyloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
