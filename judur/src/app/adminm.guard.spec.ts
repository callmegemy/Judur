import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminmGuard } from './adminm.guard';

describe('adminmGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminmGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
