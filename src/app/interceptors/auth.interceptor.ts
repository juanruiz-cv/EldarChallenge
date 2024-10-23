import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticateService } from '@services/firebase-auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthenticateService);
  const authToken = 'Your auth token';
  const authReq = req.clone({
    setHeaders: {
      Authorization1: `Bearer ${authToken}`,
    },
  });
  console.log('auth interceptor', authReq);
  return next(authReq);
};
