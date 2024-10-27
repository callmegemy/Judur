import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminerReportsComponent } from './examiner-reports.component';

describe('ExaminerReportsComponent', () => {
  let component: ExaminerReportsComponent;
  let fixture: ComponentFixture<ExaminerReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExaminerReportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExaminerReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
