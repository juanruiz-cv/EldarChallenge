import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticateService } from '@services/firebase-auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthenticateService);
  const isAuthenticated = authService.isAuthenticated();

  if (isAuthenticated) {
    return true;
  } else {
    router.navigate(['/auth/login']);
    return false;
  }
};
