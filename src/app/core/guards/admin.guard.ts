// src/app/core/guards/admin.guard.ts

import { inject }
from '@angular/core';

import {
  CanActivateFn,
  Router
} from '@angular/router';

import { AuthService }
from '../services/auth.service';

export const adminGuard:
  CanActivateFn = async () => {

  const authService =
    inject(AuthService);

  const router =
    inject(Router);

  try {

    await authService
      .carregarUsuarioAtual();

    const usuario =

      authService
        .usuario();

    if(!usuario) {

      return router.createUrlTree([
        '/auth/login'
      ]);
    }

    const role =

      usuario.user_metadata
        ?.['role'];

    if(role === 'admin') {

      return true;
    }

    return router.createUrlTree([
      '/acesso-negado'
    ]);

  } catch {

    return router.createUrlTree([
      '/auth/login'
    ]);
  }

};