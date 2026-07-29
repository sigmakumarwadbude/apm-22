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
    path: 'products/new',
    loadComponent: () =>
      import('./products/product-edit/product-edit').then(
        (m) => m.ProductEdit
      ),
  },
  {
    path: 'products/:id',
    loadComponent: () =>
      import('./products/product-detail/product-detail').then(
        (m) => m.ProductDetail
      ),
  },
  {
    path: 'products/:id/edit',
    loadComponent: () =>
      import('./products/product-edit/product-edit').then(
        (m) => m.ProductEdit
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
