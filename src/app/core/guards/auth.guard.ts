// src/app/core/guards/auth.guard.ts

import { inject }
from '@angular/core';

import {
  CanActivateFn,
  Router
} from '@angular/router';

import { AuthService }
from '../services/auth.service';

export const authGuard:
  CanActivateFn = async () => {

  const authService =
    inject(AuthService);

  const router =
    inject(Router);

  try {

    await authService
      .carregarSessaoAtual();

    const autenticado =

      authService
        .autenticado();

    if(autenticado) {

      return true;
    }

    return router.createUrlTree([
      '/auth/login'
    ]);

  } catch {

    return router.createUrlTree([
      '/auth/login'
    ]);
  }

};