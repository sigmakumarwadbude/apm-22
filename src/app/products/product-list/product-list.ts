import { CommonModule, CurrencyPipe, LowerCasePipe } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../product';
import { ConvertToSpacesPipe } from '../../shared/convert-to-spaces-pipe';
import { Star } from '../../shared/star/star';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, FormsModule, LowerCasePipe, CurrencyPipe, ConvertToSpacesPipe, Star],
  templateUrl: './product-list.html',
  styles: [`
    thead {
      color: #337AB7
    }
    `]
})
export class ProductList implements OnInit {
  pageTitle = signal('Product List');

  showImage = signal(false);
  listFilter = signal('');

  products = signal<Product[]>([
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

  ngOnInit(): void {
    console.log('Component initialized');
  }
  toggleImage() {
    this.showImage.update((s) => !s);
  }

  onRatingClicked(message: string) {
    this.pageTitle.set(`Product List ${message}` )    
  }
}
