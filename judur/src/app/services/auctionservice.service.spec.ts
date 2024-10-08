import { TestBed } from '@angular/core/testing';

import { AuctionserviceService } from './auctionservice.service';

describe('AuctionserviceService', () => {
  let service: AuctionserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuctionserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
