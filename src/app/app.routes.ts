import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';
import { guardaGuard } from './core/guards/guarda.guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },

  /*
   * AUTH
   */
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./features/auth/pages/login/login.component')
        .then(m => m.LoginComponent)
  },

  {
    path: 'acesso-negado',
    loadComponent: () =>
      import('./features/auth/pages/acesso-negado/acesso-negado')
        .then(m => m.AcessoNegadoComponent)
  },

  /*
   * DASHBOARD ADMIN
   */
  {
    path: 'dashboard',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./features/dashboard/pages/home/home.component')
        .then(m => m.HomeComponent)
  },

  /*
   * DASHBOARD GUARDA
   */
  {
    path: 'area-guarda',
    canActivate: [guardaGuard],
    loadComponent: () =>
      import('./features/area-guarda/pages/home-guarda/home-guarda')
        .then(m => m.HomeGuardaComponent)
  },

  /*
   * GUARDA
   */
  {
    path: 'area-guarda/meu-posto',
    canActivate: [guardaGuard],
    loadComponent: () =>
      import('./features/area-guarda/pages/meu-posto/meu-posto')
        .then(m => m.MeuPostoComponent)
  },

  {
    path: 'area-guarda/minha-escala',
    canActivate: [guardaGuard],
    loadComponent: () =>
      import('./features/area-guarda/pages/minha-escala/minha-escala')
        .then(m => m.MinhaEscalaComponent)
  },

  /*
   * GUARDAS
   */
  {
    path: 'guardas',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./features/guardas/pages/lista-guardas/lista-guardas.component')
        .then(m => m.ListaGuardasComponent)
  },

  {
    path: 'guardas/cadastro',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./features/guardas/pages/cadastro-guarda/cadastro-guarda')
        .then(m => m.CadastroGuardaComponent)
  },

  {
    path: 'guardas/editar/:id',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./features/guardas/pages/editar-guarda/editar-guarda')
        .then(m => m.EditarGuardaComponent)
  },

  /*
   * POSTOS
   */
  {
    path: 'postos',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./features/postos/pages/lista-postos/lista-posto.component')
        .then(m => m.ListaPostosComponent)
  },

  {
    path: 'postos/cadastro',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./features/postos/pages/cadastro-postos/cadastro-posto.component')
        .then(m => m.CadastroPostoComponent)
  },

  {
    path: 'postos/editar/:id',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./features/postos/pages/editar-postos/editar-posto.component')
        .then(m => m.EditarPostoComponent)
  },

  /*
   * LOTAÇÕES
   */
  {
    path: 'lotacoes',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./features/lotacoes/pages/lista-lotacoes/lista-lotacoes')
        .then(m => m.ListaLotacoesComponent)
  },

  {
    path: 'lotacoes/cadastro',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./features/lotacoes/pages/cadastro-lotacao/cadastro-lotacao')
        .then(m => m.CadastroLotacaoComponent)
  },

  {
    path: 'lotacoes/editar/:id',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./features/lotacoes/pages/editar-lotacao/editar-lotacao')
        .then(m => m.EditarLotacaoComponent)
  },

  /*
   * ESCALAS
   */
  {
    path: 'escalas',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./features/escalas/pages/lista-escalas/lista-escalas')
        .then(m => m.ListaEscalasComponent)
  },

  {
    path: 'escalas/gerar',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./features/escalas/pages/gerar-escala/gerar-escala')
        .then(m => m.GerarEscalaComponent)
  },

  /*
   * RELATÓRIOS
   */
  {
    path: 'relatorios',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./features/relatorios/pages/resumo-relatorios')
        .then(m => m.ResumoRelatoriosComponent)
  },

  /*
   * FALLBACK
   */
  {
    path: '**',
    redirectTo: 'auth/login'
  }

];