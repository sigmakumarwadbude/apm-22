import { inject, Service } from '@angular/core';
import { Product } from './product';
import { PRODUCTS } from './product.data';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, throwError, Observable, catchError } from 'rxjs';

@Service()
export class ProductService {
  private readonly productsURL = 'products/products.json';
  private readonly http: HttpClient = inject(HttpClient);
  
  getProducts(): Observable<ReadonlyArray<Product>> {
    return this.http.get<ReadonlyArray<Product>>(this.productsURL).pipe(
      catchError(error => this.handleError(error))
    );
  }

  // handleError(error: HttpErrorResponse): Observable<never> {
  //   const errorMessage = error instanceof ErrorEvent
  //   ? `An error occurred: ${error.error.message}`
  //   : `Server returned code: ${error.status}, error message is: ${error.message}`;
  //   return throwError(() => new Error(errorMessage));
  // }

   handleError(error: HttpErrorResponse): Observable<never> {
    const message =
    error.error instanceof ErrorEvent
      ? error.error.message
      : `Server returned code ${error.status}: ${error.message}`;

  return throwError(() => new Error(message));
  }

  
}
