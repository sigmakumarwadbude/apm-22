import { inject, Injectable } from '@angular/core';
import { Product } from './product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly productsURL = 'products/products.json';
  private readonly http: HttpClient = inject(HttpClient);

  /**
   * Fetches all products from the data source.
   */
  getProducts(): Observable<ReadonlyArray<Product>> {
    return this.http
      .get<ReadonlyArray<Product>>(this.productsURL)
      .pipe(catchError(error => this.handleError(error)));
  }

  /**
   * Fetches a single product by ID.
   * Returns Observable<Product | null>.
   */
  getProductById(id: number): Observable<Product | null> {
    if (isNaN(id) || id <= 0) {
      return of(null);
    }
    return this.getProducts().pipe(
      map(products => products.find(p => p.productId === id) ?? null),
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
