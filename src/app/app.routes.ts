import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home').then((m) => m.Home),
    data: { title: 'Home' }
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./products/products.routes').then(
        (m) => m.productRoutes
      ),
    data: {
      preload: true
    }
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./user/login/login').then(
        (m) => m.Login
      ),
    data: { title: 'Login' }
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
