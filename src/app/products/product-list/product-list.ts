import { CommonModule, CurrencyPipe, LowerCasePipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, FormsModule, LowerCasePipe, CurrencyPipe],
  templateUrl: './product-list.html',
})
export class ProductList {
  pageTitle = signal('Product List');

  showImage = signal(false);
  listFilter = signal('');

  products = signal([
    {
      productId: 1,
      productName: 'Leaf Rake',
      productCode: 'GDN-0011',
      releaseDate: 'March 19, 2021',
      description: 'Leaf rake with 48-inch wooden handle.',
      price: 19.95,
      starRating: 3.2,
      imageUrl: 'assets/images/leaf_rake.png',
    },
  ]);

  filteredProducts = computed(() => {
    const filter = this.listFilter().toLowerCase().trim();

    return !filter
      ? this.products()
      : this.products().filter((product) => product.productName.toLowerCase().includes(filter));
  });

  toggleImage() {
    this.showImage.update((s) => !s);
  }
}
