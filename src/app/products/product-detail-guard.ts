import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ProductService } from './product.service';
import { map, catchError, of } from 'rxjs';

export const productDetailGuard: CanActivateFn = (route, state) => {
  const productService = inject(ProductService);
  const router = inject(Router);

  const id = Number(route.paramMap.get('id'));

  return productService.getProductById(id).pipe(
    map(product => {
      if (product) {
        return true;
      }
      router.navigate(['/products']);
      return false;
    }),
    catchError(() => {
      router.navigate(['/products']);
      return of(false);
    })
  );
};
