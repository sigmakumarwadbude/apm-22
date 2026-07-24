import { CommonModule, CurrencyPipe, LowerCasePipe } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../product';
import { ConvertToSpacesPipe } from '../../shared/convert-to-spaces-pipe';
import { Star } from '../../shared/star/star';
import { ProductService } from '../product.service';
import { ProductFilter } from '../product-filter/product-filter';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, FormsModule, LowerCasePipe, CurrencyPipe, ConvertToSpacesPipe, Star, ProductFilter],
  templateUrl: './product-list.html',
  styles: [
    `
      thead {
        color: #337ab7;
      }
    `,
  ],
})
export class ProductList implements OnInit {
  private readonly productService = inject(ProductService);

  // UI State
  readonly pageTitle = signal('Product List');
  readonly showImage = signal(false);
  readonly listFilter = signal('');

  readonly loading = signal(false);
  readonly errorMessage = signal('');

  // Data
  readonly products = signal<readonly Product[]>([]);

  // Derived State
  readonly filteredProducts = computed(() => {
    const filter = this.listFilter().trim().toLowerCase();

    if (!filter) {
      return this.products();
    }

    return this.products().filter(product =>
      product.productName.toLowerCase().includes(filter)
    );
  });

  readonly productCount = computed(() => this.filteredProducts().length);

  ngOnInit(): void {
    this.loadProducts();
  }

  toggleImage(): void {
    this.showImage.update(show => !show);
  }

  onRatingClicked(message: string): void {
    this.pageTitle.set(`Product List ${message}`);
  }

  private loadProducts(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.productService.getProducts().subscribe({
      next: products => {
        this.products.set(products);
        this.loading.set(false);
      },
      error: err => {
        this.errorMessage.set(err.message);
        this.loading.set(false);
      },
    });
  }
}
