import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

export const volunteerGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.getUserData();
  if (!authService.hasToken()) {
    router.navigate(['/login']);
    return false;
  }
  if (user && user.role_id === 3 ) {
    return true;
  } else {
    router.navigate(['/unauthorized']);
    return false;
  }
};
