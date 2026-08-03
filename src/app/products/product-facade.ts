import {
  computed,
  DestroyRef,
  inject,
  Injectable,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, finalize, Observable, tap, throwError } from 'rxjs';

import { Product } from './product';
import { ProductService } from './product.service';
import { createEmptyProduct } from './product.factory';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductFacade {
  private readonly productService = inject(ProductService);
  private readonly destroyRef = inject(DestroyRef);

  // --------------------------------------------------------------------------
  // State
  // --------------------------------------------------------------------------

  private readonly _products = signal<readonly Product[]>([]);
  private readonly _selectedProduct = signal<Product | null>(null);
  private readonly _loading = signal(false);
  private readonly _error = signal('');

  // --------------------------------------------------------------------------
  // Public Readonly Signals
  // --------------------------------------------------------------------------

  readonly products = this._products.asReadonly();
  readonly selectedProduct = this._selectedProduct.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  // --------------------------------------------------------------------------
  // Computed Selectors
  // --------------------------------------------------------------------------

  readonly productCount = computed(() => this.products().length);

  readonly hasProducts = computed(() => this.productCount() > 0);

  readonly hasSelectedProduct = computed(
    () => this.selectedProduct() !== null
  );

  readonly hasError = computed(() => this.error().length > 0);

  // --------------------------------------------------------------------------
  // Public API
  // --------------------------------------------------------------------------

  /**
   * Loads all products.
   * Uses cached data unless forceRefresh is true.
   */
  loadProducts(forceRefresh = false): void {
    if (!forceRefresh && this.hasProducts()) {
      return;
    }

    this.clearError();

    this.executeRequest(
      this.productService.getProducts(),
      products => this._products.set(products)
    );
  }

  /**
   * Loads a product by id.
   * Checks cached products before making an HTTP request.
   */
  loadProductById(id: number): void {
  if (Number.isNaN(id) || id <= 0) {
    this._selectedProduct.set(null);
    this.setError('Invalid product ID');
    return;
  }

  this.clearError();
  this._selectedProduct.set(null);

  this.executeRequest(
    this.productService.getProductById(id),
    product => {
      this._selectedProduct.set(product);

      this._products.update(products => {
        const index = products.findIndex(p => p.productId === product.productId);

        if (index === -1) {
          return [...products, product];
        }

        return products.map(p =>
          p.productId === product.productId ? product : p
        );
      });
    }
  );
}

  /**
   * Initializes selected product.
   * id === 0 => New Product
   * id > 0  => Existing Product
   */
  initializeProduct(id: number): void {
    this.clearError();

    if (id === 0) {
      this._selectedProduct.set(createEmptyProduct());
      return;
    }

    this.loadProductById(id);
  }

  saveProduct(product: Product): Observable<Product> {
  return product.productId === 0
    ? this.createProduct(product)
    : this.updateProduct(product);
}

  createProduct(product: Product): Observable<Product> {
    this.clearError();

    return this.productService
      .createProduct(product)
      .pipe(
        tap(saved => {
          this._products.update(products => [...products, saved]);
          this._selectedProduct.set(saved);
        }),
        catchError(error => {
          this.setError(error);
          return throwError(() => error);
        })
      );
  }

  updateProduct(product: Product): Observable<Product> {
    this.clearError();

    return this.productService
      .updateProduct(product)
      .pipe(
        tap(saved => {
          this._products.update(products =>
            products.map(p =>
              p.productId === saved.productId ? saved : p
            )
          );
          this._selectedProduct.set(saved);
        }),
        catchError(error => {
          this.setError(error);
          return throwError(() => error);
        })
      );
  }

  deleteProduct(id: number): Observable<void> {
    this.clearError();

    return this.productService.deleteProduct(id).pipe(
      tap(() => {
        this._products.update(products => products.filter(p => p.productId !== id));
        this._selectedProduct.set(null);
      }),
      catchError(error => {
        this.setError(error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Clears selected product.
   */
  clearSelectedProduct(): void {
    this._selectedProduct.set(null);
  }

  /**
   * Clears error.
   */
  clearError(): void {
    this._error.set('');
  }

  // --------------------------------------------------------------------------
  // Private Helpers
  // --------------------------------------------------------------------------

  private executeRequest<T>(
    request$: Observable<T>,
    onSuccess: (value: T) => void
  ): void {
    this._loading.set(true);

    request$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this._loading.set(false))
      )
      .subscribe({
        next: onSuccess,
        error: error => this.setError(error),
      });
  }

  private setError(error: unknown): void {
    if (typeof error === 'string') {
      this._error.set(error);
      return;
    }

    if (error instanceof HttpErrorResponse) {
      this._error.set(error.message);
      return;
    }

    if (error instanceof Error) {
      this._error.set(error.message);
      return;
    }

    this._error.set('An unexpected error occurred.');
  }
}