import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyregistrationComponent } from './facultyregistration.component';

describe('FacultyregistrationComponent', () => {
  let component: FacultyregistrationComponent;
  let fixture: ComponentFixture<FacultyregistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultyregistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultyregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
