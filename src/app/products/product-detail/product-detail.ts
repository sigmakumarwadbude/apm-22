import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Star } from '../../shared/star/star';
import { ConvertToSpacesPipe } from '../../shared/convert-to-spaces-pipe';
import { Router } from '@angular/router';
import { ProductFacade } from '../product-facade';
import { injectPageTitle } from '../../shared/route-data';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, Star, ConvertToSpacesPipe, CurrencyPipe, DatePipe],
  templateUrl: './product-detail.html',
})
export class ProductDetail {
  readonly router = inject(Router);
  readonly facade = inject(ProductFacade);
  readonly pageTitle = injectPageTitle();

  readonly product = this.facade.selectedProduct;

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
}
