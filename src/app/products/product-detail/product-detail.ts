import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Star } from '../../shared/star/star';
import { ConvertToSpacesPipe } from '../../shared/convert-to-spaces-pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductFacade } from '../product-facade';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, Star, ConvertToSpacesPipe, CurrencyPipe],
  templateUrl: './product-detail.html',
})
export class ProductDetail implements OnInit {
  readonly router = inject(Router);
  readonly facade = inject(ProductFacade);
  readonly pageTitle = 'Product Detail';

  readonly product = this.facade.selectedProduct;
  private route = inject(ActivatedRoute);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getProduct(id);
    }
  }

  onBack() {
    this.router.navigate(['/products'], {
      queryParamsHandling: 'preserve',
    });
  }

  onEdit() {
    this.router.navigate(['/products', this.product()?.productId, 'edit'], {
      queryParamsHandling: 'preserve',
    });
  }

  getProduct(id: number) {
    this.facade.loadProductById(id);
  }
}
