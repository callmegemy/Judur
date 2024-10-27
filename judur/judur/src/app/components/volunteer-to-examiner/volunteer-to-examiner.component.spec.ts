import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerToExaminerComponent } from './volunteer-to-examiner.component';

describe('VolunteerToExaminerComponent', () => {
  let component: VolunteerToExaminerComponent;
  let fixture: ComponentFixture<VolunteerToExaminerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VolunteerToExaminerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolunteerToExaminerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
