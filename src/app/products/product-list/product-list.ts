import { CommonModule, CurrencyPipe, LowerCasePipe } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../product';
import { ConvertToSpacesPipe } from '../../shared/convert-to-spaces-pipe';
import { Star } from '../../shared/star/star';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, FormsModule, LowerCasePipe, CurrencyPipe, ConvertToSpacesPipe, Star],
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
  pageTitle = signal('Product List');

  showImage = signal(false);
  listFilter = signal('');

  private productService = inject(ProductService);

  readonly products = signal<ReadonlyArray<Product>>(this.productService.getProducts());

  filteredProducts = computed(() => {
    const filter = this.listFilter().toLowerCase().trim();

    return !filter
      ? this.products()
      : this.products().filter((product) => product.productName.toLowerCase().includes(filter));
  });

  ngOnInit(): void {
    console.log('Component initialized');
  }
  toggleImage() {
    this.showImage.update((s) => !s);
  }

  onRatingClicked(message: string) {
    this.pageTitle.set(`Product List ${message}`);
  }
}
