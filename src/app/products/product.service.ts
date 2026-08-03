import { inject, Injectable } from '@angular/core';
import { Product } from './product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable, catchError, map, of } from 'rxjs';
import { ProductDto } from './dto/product.dto';
import { ProductMapper } from './product.mapper';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly productsURL = `${environment.apiUrl}/products`;
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

  createProduct(
    product: Product
  ): Observable<Product> {
    const dto = ProductMapper.toCreateDto(product);
    return this.http
      .post<ProductDto>(this.productsURL, dto)
      .pipe(
        map(ProductMapper.fromDto),
        catchError(error => this.handleError(error))
      );
  }

  /**
 * Update an existing product.
 */
  updateProduct(product: Product): Observable<Product> {
    const dto = ProductMapper.toDto(product);
    const url = `${this.productsURL}/${product.productId}`;

    return this.http
      .put<ProductDto>(url, dto)
      .pipe(
        map(ProductMapper.fromDto),
        catchError(error => this.handleError(error))
      );
  }

  deleteProduct(id: number): Observable<void> {
    const url = `${this.productsURL}/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError(error => this.handleError(error))
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (!environment.production) {
      console.error('HTTP Error:', error);

      const message =
        error.error?.message ??
        `HTTP ${error.status}`;

      return throwError(() => new Error(message));
    }

    return throwError(() => new Error(this.getUserMessage(error)));
  }

  private getUserMessage(error: HttpErrorResponse): string {
    if (error.status === 0) {
      return 'Unable to connect to the server. Please check your internet connection.';
    }

    switch (error.status) {
      case 400:
        return 'The request could not be processed. Please verify your input and try again.';

      case 401:
        return 'Your session has expired. Please sign in again.';

      case 403:
        return 'You do not have permission to perform this action.';

      case 404:
        return 'The requested resource could not be found.';

      case 409:
        return 'The requested operation could not be completed because of a conflict.';

      case 422:
        return 'One or more values are invalid. Please review your input.';

      case 500:
        return 'An unexpected server error occurred. Please try again later.';

      case 502:
      case 503:
      case 504:
        return 'The service is temporarily unavailable. Please try again later.';

      default:
        return 'Something went wrong. Please try again.';
    }
  }
}
