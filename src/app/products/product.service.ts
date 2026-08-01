import { inject, Injectable } from '@angular/core';
import { Product } from './product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable, catchError, map, of } from 'rxjs';
import { ProductDto } from './product.dto';
import { ProductMapper } from './product.mapper';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly productsURL = 'api/products';
  private readonly http: HttpClient = inject(HttpClient);

  /**
   * Fetches all products from the data source.
   */
  getProducts(): Observable<readonly Product[]> {
    return this.http
      .get<readonly ProductDto[]>(this.productsURL)
      .pipe(
        map(ProductMapper.fromDtos),
        catchError(error => this.handleError(error))
      );
  }

  /**
   * Fetch a product by id.
   */
  getProductById(id: number): Observable<Product> {
    return this.http
      .get<ProductDto>(`${this.productsURL}/${id}`)
      .pipe(
        map(ProductMapper.fromDto),
        catchError(error => this.handleError(error))
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let message: string;

    if (error.status === 0) {
      message = 'Unable to connect to the server.';
    } else {
      message = error.error?.message ??
        `Server returned ${error.status}: ${error.status}`;
    }

    return throwError(() => new Error(message));
  }
}
