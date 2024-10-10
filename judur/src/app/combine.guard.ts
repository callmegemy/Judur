import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

export const combineGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.getUserData();
  console.log('Combine guard:', user);
  if (!authService.hasToken()) {
    router.navigate(['/login']);
    return false;
  }

    if (user.role_id === 1 || user.role_id === 5 || user.role_id === 6) {
      return true; 
    } else {
      console.log('Access denied: redirecting to unauthorized page');
      router.navigate(['/unauthorized']); 
      return false;
    }
  }
