import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.userData.subscribe({
    next: (user) => {
      if (user.role !== 'admin') {
        console.log('not admin');
        router.navigate(['/unauthorized']);
      }
    }
  })) {
  }
  return true;
};
