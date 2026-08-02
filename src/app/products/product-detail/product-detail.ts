import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, effect, inject, input } from '@angular/core';
import { Star } from '../../shared/star/star';
import { ConvertToSpacesPipe } from '../../shared/convert-to-spaces-pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductFacade } from '../product-facade';
import { injectPageTitle } from '../../shared/route-data';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, Star, ConvertToSpacesPipe, CurrencyPipe, DatePipe],
  templateUrl: './product-detail.html',
})
export class ProductDetail {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  protected readonly facade = inject(ProductFacade);
  readonly pageTitle = injectPageTitle();

  readonly product = this.facade.selectedProduct;

  readonly id = input.required({
    transform: (value: string) => Number(value)
  });

  constructor() {
    effect(() => {
      this.facade.initializeProduct(this.id());
    });
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
}
