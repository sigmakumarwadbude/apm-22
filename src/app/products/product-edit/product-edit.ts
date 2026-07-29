import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { Product } from '../product';
import { form, FormField, max, min, minLength, required } from '@angular/forms/signals';
import { ProductFacade } from '../product-facade';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  imports: [FormField],
  templateUrl: './product-edit.html',
})
export class ProductEdit {
  private readonly facade = inject(ProductFacade);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly errorMessage = signal('');

  readonly pageTitle = computed(() =>
    this.product().productId === 0
      ? 'Add Product'
      : 'Edit Product'
  );
  /**
   * Local editable copy.
   * Prevents editing the facade state until Save is clicked.
   */
  readonly product = signal<Product>(this.facade.createEmptyProduct());

  /**
   * Route: /products/:id/edit
   * id = 0 => New Product
   */
  readonly productId = toSignal(
    this.route.paramMap.pipe(
      map(params => {
        const id = params.get('id');
        return id ? Number(id) : 0;
      })
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
        this.product.set(this.facade.createEmptyProduct());
      }
    });

    // Synchronize errors.
    effect(() => {
      this.errorMessage.set(this.facade.error());
    });
  }

  saveProduct(event: SubmitEvent): void {
    event.preventDefault();

    this.errorMessage.set('');

    if (this.productForm().invalid()) {
      this.productForm().markAsTouched();
      return;
    }

    // TODO: wire up productService.saveProduct(this.product())
    // this.facade.saveProduct(this.product())
    //   .subscribe({
    //     next: () => this.router.navigate(['/products']),
    //     error: (err) => this.errorMessage.set(err.message)
    //   });
  }

  cancel(): void {
    this.router.navigate(['/products'], {
      queryParamsHandling: 'preserve',
    });
  }

  deleteProduct(): void {
    if (this.product().productId === 0) {
      this.router.navigate(['/products']);
      return;
    }

    // TODO: wire up productService.deleteProduct(this.product().productId)
  }
}
