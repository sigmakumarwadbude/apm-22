import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { ProductFilter } from '../product-filter/product-filter';
import { ProductTable } from '../product-table/product-table';
import { FormsModule } from '@angular/forms';
import { ProductFacade } from '../product-facade';
import { ActivatedRoute } from '@angular/router';
import { Spinner } from '../../shared/ui/spinner/spinner'

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, ProductFilter, ProductTable, FormsModule, Spinner],
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
  private readonly route = inject(ActivatedRoute);

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

  constructor() {
    effect(() => {
      this.showImage.set(
        this.route.snapshot.queryParamMap.get('showImage') === 'true'
      );
      const filter = this.route.snapshot.queryParamMap.get('filterBy') || '';
      this.listFilter.set(filter);
    })
  }
  ngOnInit(): void {
    this.facade.loadProducts();
  }

  onRatingClicked(message: string): void {
    this.pageTitle.set(`Product List ${message}`);
  }

  onDeleteProduct(id: number): void {
    this.facade.deleteProduct(id).subscribe();
  }
}
