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
    data: { title: 'New Product' },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./product-edit/product-edit-info').then(
            (m) => m.ProductEditInfo
          ),
        data: { title: 'Product Info' }
      },
      {
        path: 'info',
        loadComponent: () =>
          import('./product-edit/product-edit-info').then(
            (m) => m.ProductEditInfo
          ),
        data: { title: 'Product Info' }
      },
      {
        path: 'tags',
        loadComponent: () =>
          import('./product-edit/product-edit-tags').then(
            (m) => m.ProductEditTags
          ),
        data: { title: 'Product Tags' }
      }
    ]
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./product-detail/product-detail').then(
        (m) => m.ProductDetail
      ),
    data: { title: 'Product Detail' }
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./product-edit/product-edit').then(
        (m) => m.ProductEdit
      ),
    data: { title: 'Edit Product' },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./product-edit/product-edit-info').then(
            (m) => m.ProductEditInfo
          ),
        data: { title: 'Product Info' }
      },
      {
        path: 'info',
        loadComponent: () =>
          import('./product-edit/product-edit-info').then(
            (m) => m.ProductEditInfo
          ),
        data: { title: 'Product Info' }
      },
      {
        path: 'tags',
        loadComponent: () =>
          import('./product-edit/product-edit-tags').then(
            (m) => m.ProductEditTags
          ),
        data: { title: 'Product Tags' }
      }
    ]
  }
];
