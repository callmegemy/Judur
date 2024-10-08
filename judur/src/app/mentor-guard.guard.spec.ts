import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { mentorGuardGuard } from './mentor-guard.guard';

describe('mentorGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => mentorGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
