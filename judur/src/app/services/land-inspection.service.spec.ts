import { TestBed } from '@angular/core/testing';

import { LandInspectionService } from './land-inspection.service';

describe('LandInspectionService', () => {
  let service: LandInspectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LandInspectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
