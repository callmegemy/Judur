import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminerRequestComponent } from './examiner-request.component';

describe('ExaminerRequestComponent', () => {
  let component: ExaminerRequestComponent;
  let fixture: ComponentFixture<ExaminerRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExaminerRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExaminerRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
