import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home').then((m) => m.Home),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./products/product-list/product-list').then(
        (m) => m.ProductList
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
