import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';

export const organizerGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.getUserData();
  if (!authService.hasToken()) {
    router.navigate(['/login']);
    return false;
  }

  if (user && user.role_id === 5 && authService.hasToken()) {
    return true;
  } else {
    router.navigate(['/unauthorized']);
    return false;
  }
};
