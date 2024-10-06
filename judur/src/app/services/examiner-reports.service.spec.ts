import { TestBed } from '@angular/core/testing';

import { ExaminerReportsService } from './examiner-reports.service';

describe('ExaminerReportsService', () => {
  let service: ExaminerReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExaminerReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
