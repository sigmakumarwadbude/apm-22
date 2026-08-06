import { Route, Routes } from '@angular/router';

import { ProductList } from './product-list/product-list';
import { ProductDetail } from './product-detail/product-detail';
import { ProductEdit } from './product-edit/product-edit';
import { ProductEditInfo } from './product-edit/product-edit-info';
import { ProductEditTags } from './product-edit/product-edit-tags';

const productEditChildren: Routes = [
  {
    path: '',
    redirectTo: 'info',
    pathMatch: 'full',
  },
  {
    path: 'info',
    component: ProductEditInfo,
    data: { title: 'Product Info' },
  },
  {
    path: 'tags',
    component: ProductEditTags,
    data: { title: 'Product Tags' },
  },
];

const productEditRoute = (path: string, title: string): Route => ({
  path,
  component: ProductEdit,
  data: { title },
  children: productEditChildren,
});

export const productRoutes: Routes = [
  {
    path: '',
    component: ProductList,
  },
  productEditRoute('new', 'New Product'),
  {
    path: ':id',
    component: ProductDetail,
    data: { title: 'Product Detail' },
  },
  productEditRoute(':id/edit', 'Edit Product'),
];