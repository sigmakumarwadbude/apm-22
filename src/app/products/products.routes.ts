import { Routes } from '@angular/router';

export const productRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./product-list/product-list').then(
        (m) => m.ProductList
      ),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./product-edit/product-edit').then(
        (m) => m.ProductEdit
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./product-detail/product-detail').then(
        (m) => m.ProductDetail
      ),
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./product-edit/product-edit').then(
        (m) => m.ProductEdit
      ),
  }
];
