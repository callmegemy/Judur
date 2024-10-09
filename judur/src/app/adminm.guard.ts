import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';

export const adminmGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.getUserData();
  console.log('adminm guard:', user);

  if (user && (user.role_id === 1 ||  user.role_id === 6)) {
    return true; 
  } else {
    console.log('Access denied: redirecting to unauthorized page');
    router.navigate(['/unauthorized']); 
    return false;
  }
};
