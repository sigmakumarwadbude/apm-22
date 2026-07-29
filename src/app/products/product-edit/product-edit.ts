import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { Product } from '../product';
import { form, FormField, max, min, minLength, required } from '@angular/forms/signals';
import { ProductFacade } from '../product-facade';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { createEmptyProduct } from '../product.factory';
import { injectPageTitle } from '../../shared/route-data';

@Component({
  imports: [FormField],
  templateUrl: './product-edit.html',
})
export class ProductEdit {
  private readonly facade = inject(ProductFacade);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  /**
   * Display-only state from the facade.
   */
  readonly loading = this.facade.loading;
  readonly errorMessage = computed(() => this.facade.error());

  /**
   * Local editable copy.
   * Prevents mutating facade state while editing.
   */
  readonly product = signal<Product>(createEmptyProduct());

  /**
   * Dynamic page title.
   */
  readonly pageTitle = computed(() =>
    this.product().productId === 0
      ? injectPageTitle()
      : `${injectPageTitle()}: ${this.product().productName}`
  );

  /**
   * Route:
   * /products/0/edit  => New Product
   * /products/:id/edit => Existing Product
   */
  readonly productId = toSignal(
    this.route.paramMap.pipe(
      map(params => Number(params.get('id') ?? 0))
    ),
    { initialValue: 0 }
  );

  /**
   * Signal Form
   */
  readonly productForm = form(this.product, schema => {
    required(schema.productName, { message: 'Product name is required' });
    minLength(schema.productName, 3, { message: 'Product name must be at least 3 characters' });
    required(schema.productCode, { message: 'Product code is required' });
    required(schema.releaseDate, { message: 'Release date is required' });
    required(schema.price, { message: 'Price is required' });
    min(schema.price, 0, { message: 'Price must be 0 or greater' });
    required(schema.starRating, { message: 'Star rating is required' });
    min(schema.starRating, 1, { message: 'Rating must be at least 1' });
    max(schema.starRating, 5, { message: 'Rating must be 5 or less' });
  });

  constructor() {
    // Initialize product whenever the route changes.
    effect(() => {
      this.facade.initializeProduct(this.productId());
    });

    // Synchronize the local editable copy with the facade.
    effect(() => {
      const selected = this.facade.selectedProduct();

      if (selected) {
        this.product.set(structuredClone(selected));
      } else {
        this.product.set(createEmptyProduct());
      }
    });
  }

  saveProduct(event: SubmitEvent): void {
    event.preventDefault();

    if (this.productForm().invalid()) {
      this.productForm().markAsTouched();
      return;
    }

    // TODO
    // this.facade.saveProduct(this.product());
  }

  deleteProduct(): void {
    if (this.product().productId === 0) {
      this.cancel();
      return;
    }

    // TODO
    // this.facade.deleteProduct(this.product().productId);
  }

  cancel(): void {
    this.router.navigate(['/products'], {
      queryParamsHandling: 'preserve',
    });
  }
}
