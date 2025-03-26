import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
export const sellerGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (!authService.userData.subscribe({
      next: (user:any) => {
        if (user.role !== 'seller') {
          console.log('not seller');
          router.navigate(['/unauthorized']);
        }
      }
    })) {
    }
    return true;
};
