import { inject } from '@angular/core';

import {
  CanActivateFn,
  Router
} from '@angular/router';

import { AuthApiService }
from '../services/auth-api.service';

export const adminGuard: CanActivateFn = () => {

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

  if (usuario.perfil === 'ADMINISTRADOR') {
    return true;
  }

  return router.createUrlTree([
    '/acesso-negado'
  ]);
};