import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { organizerGuardGuard } from './organizer-guard.guard';


describe('organizerGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => organizerGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
