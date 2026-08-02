import { Route, Routes } from '@angular/router';

const loadProductList = () =>
  import('./product-list/product-list').then((m) => m.ProductList);

const loadProductDetail = () =>
  import('./product-detail/product-detail').then((m) => m.ProductDetail);

const loadProductEdit = () =>
  import('./product-edit/product-edit').then((m) => m.ProductEdit);

const loadProductEditInfo = () =>
  import('./product-edit/product-edit-info').then((m) => m.ProductEditInfo);

const loadProductEditTags = () =>
  import('./product-edit/product-edit-tags').then((m) => m.ProductEditTags);

const productEditChildren: Routes = [
  {
    path: '',
    loadComponent: loadProductEditInfo,
    data: { title: 'Product Info' },
  },
  {
    path: 'info',
    loadComponent: loadProductEditInfo,
    data: { title: 'Product Info' },
  },
  {
    path: 'tags',
    loadComponent: loadProductEditTags,
    data: { title: 'Product Tags' },
  },
];

const productEditRoute = (path: string, title: string): Route => ({
  path,
  loadComponent: loadProductEdit,
  data: { title },
  children: productEditChildren,
});

export const productRoutes: Routes = [
  {
    path: '',
    loadComponent: loadProductList,
  },
  productEditRoute('new', 'New Product'),
  {
    path: ':id',
    loadComponent: loadProductDetail,
    data: { title: 'Product Detail' },
  },
  productEditRoute(':id/edit', 'Edit Product'),
];
