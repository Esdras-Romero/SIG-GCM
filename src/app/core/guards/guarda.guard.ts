import { inject } from '@angular/core';

import {
  CanActivateFn,
  Router
} from '@angular/router';

import { AuthApiService }
from '../services/auth-api.service';

export const guardaGuard: CanActivateFn = () => {

  const authService =
    inject(AuthApiService);

  const router =
    inject(Router);

  const usuario =
    authService.obterUsuario();

  if (!usuario) {
    return router.createUrlTree([
      '/auth/login'
    ]);
  }

  if (usuario.perfil === 'GUARDA') {
    return true;
  }

  return router.createUrlTree([
    '/acesso-negado'
  ]);
};