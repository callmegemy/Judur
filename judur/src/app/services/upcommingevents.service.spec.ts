import { TestBed } from '@angular/core/testing';

import { UpcommingeventsService } from './upcommingevents.service';

describe('UpcommingeventsService', () => {
  let service: UpcommingeventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpcommingeventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
