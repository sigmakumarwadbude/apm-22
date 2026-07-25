import { computed, inject, Injectable, signal } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductFacade {
  private readonly productService = inject(ProductService);

  // State
  private readonly _products = signal<readonly Product[]>([]);
  private readonly _selectedProduct = signal<Product | null>(null);
  private readonly _loading = signal(false);
  private readonly _error = signal('');

  // Public Readonly State
  readonly products = this._products.asReadonly();
  readonly selectedProduct = this._selectedProduct.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  // Computed Selectors
  readonly productCount = computed(() => this.products().length);
  readonly hasProducts = computed(() => this.products().length > 0);
  readonly hasError = computed(() => this.error().length > 0);

  /**
   * Loads all products into state.
   */
  loadProducts(): void {
    this._loading.set(true);
    this._error.set('');

    this.productService.getProducts().subscribe({
      next: products => {
        this._products.set(products);
        this._loading.set(false);
      },
      error: err => {
        this._error.set(err.message);
        this._loading.set(false);
      },
    });
  }

  /**
   * Loads a product by ID into selectedProduct state.
   * Checks in-memory products list first before fetching from service.
   */
  loadProductById(id: number): void {
    if (isNaN(id) || id <= 0) {
      this._selectedProduct.set(null);
      this._error.set('Invalid product ID');
      return;
    }

    // Check in-memory state first
    const existing = this.products().find(p => p.productId === id);
    if (existing) {
      this._selectedProduct.set(existing);
      this._error.set('');
      return;
    }

    this._loading.set(true);
    this._error.set('');

    this.productService.getProductById(id).subscribe({
      next: product => {
        this._selectedProduct.set(product);
        this._loading.set(false);
        if (!product) {
          this._error.set(`Product with ID ${id} was not found`);
        }
      },
      error: err => {
        this._error.set(err.message);
        this._loading.set(false);
      },
    });
  }

  /**
   * Clears the current selected product state.
   */
  clearSelectedProduct(): void {
    this._selectedProduct.set(null);
  }

  /**
   * Clears any active error message.
   */
  clearError(): void {
    this._error.set('');
  }
}
