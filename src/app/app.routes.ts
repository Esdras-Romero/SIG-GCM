import { Routes } from '@angular/router';

export const routes: Routes = [
    
{
  path: 'dev/seed',
  loadComponent: () =>
    import('./features/dev/pages/dev-seed/dev-seed.component')
      .then(m => m.DevSeedComponent)
}
];

