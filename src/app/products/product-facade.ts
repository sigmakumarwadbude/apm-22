import { computed, inject, Service, signal } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product';

@Service()
export class ProductFacade {
    private readonly productService = inject(ProductService);

    // State
    private readonly _products = signal<readonly Product[]>([]);
    private readonly _loading = signal(false);
    private readonly _error = signal('');

    // Public Readonly State
    readonly products = this._products.asReadonly();
    readonly loading = this._loading.asReadonly();
    readonly error = this._error.asReadonly();

    readonly productCount = computed(() =>
        this.products().length
    );

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
            }

        });

    }
}
