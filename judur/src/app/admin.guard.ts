import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.getUserData();
  console.log('Admin guard:', user);

  if (user && user.role_id == 1 && authService.hasToken()) {
    console.log('Access granted to admin');
    return true;
  } else {
    console.warn('Access denied: redirecting to unauthorized page');
    router.navigate(['/unauthorized']);
    return false;
  }
};
