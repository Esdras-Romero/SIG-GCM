import { Routes } from '@angular/router';

import { authGuard }
from './core/guards/auth.guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },

  {
    path: 'auth/login',
    loadComponent: () =>
      import('./features/auth/pages/login/login.component')
        .then(m => m.LoginComponent)
  },

  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/dashboard/pages/home/home.component')
        .then(m => m.HomeComponent)
  },

  {
    path: 'guardas',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/guardas/pages/lista-guardas/lista-guardas.component')
        .then(m => m.ListaGuardasComponent)
  },

  {
    path: 'guardas/cadastro',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/guardas/pages/cadastro-guarda/cadastro-guarda')
        .then(m => m.CadastroGuardaComponent)
  },

  {
    path: 'guardas/editar/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/guardas/pages/editar-guarda/editar-guarda')
        .then(m => m.EditarGuardaComponent)
  },

  {
    path: '**',
    redirectTo: 'dashboard'
  }

];