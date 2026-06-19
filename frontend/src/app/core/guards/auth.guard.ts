import { inject } from '@angular/core';

import {
  CanActivateFn,
  Router
} from '@angular/router';

import { AuthApiService }
from '../services/auth-api.service';

export const authGuard: CanActivateFn = () => {

  const authService =
    inject(AuthApiService);

  const router =
    inject(Router);

  if (authService.estaLogado()) {
    return true;
  }

  return router.createUrlTree([
    '/auth/login'
  ]);
};