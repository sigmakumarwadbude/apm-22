import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home').then((m) => m.Home),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./products/products.routes').then(
        (m) => m.productRoutes
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./user/login/login').then(
        (m) => m.Login
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
