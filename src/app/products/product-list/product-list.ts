import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { ProductFilter } from '../product-filter/product-filter';
import { ProductTable } from '../product-table/product-table';
import { FormsModule } from '@angular/forms';
import { ProductFacade } from '../product-facade';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, ProductFilter, ProductTable, FormsModule],
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
  readonly facade = inject(ProductFacade);

  // UI State
  readonly pageTitle = signal('Product List');
  readonly showImage = signal(false);
  readonly listFilter = signal('');

  // Derived State
  readonly filteredProducts = computed(() => {
    const filter = this.listFilter().trim().toLowerCase();
    if (!filter) {
      return this.facade.products();
    }
    return this.facade.products().filter(product =>
      product.productName.toLowerCase().includes(filter)
    );
  });

  ngOnInit(): void {
    this.facade.loadProducts();
  }

  onRatingClicked(message: string): void {
    this.pageTitle.set(`Product List ${message}`);
  }
}
