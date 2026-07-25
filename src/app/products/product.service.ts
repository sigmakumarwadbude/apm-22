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

  private handleError(error: HttpErrorResponse): Observable<never> {

    let message: string;

    if (error.status === 0) {
      message = 'Network error. Please check your internet connection.';
    } else {
      message = `Server returned code ${error.status}: ${error.message}`;
    }

    return throwError(() => new Error(message));
  }


}
