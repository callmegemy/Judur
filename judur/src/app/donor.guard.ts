import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

export const donorGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.getUserData();
  if (!authService.hasToken()) {
    router.navigate(['/login']);
    return false;
  }

  if (user) {
    if (user.role_id === 2 ) {
      return true;
    } else {
      router.navigate(['/unauthorized']);
      return false;
    }
  } else {
    router.navigate(['/login']);
    return false;
  }
};
function hasToken() {
  throw new Error('Function not implemented.');
}

