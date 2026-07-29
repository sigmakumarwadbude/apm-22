import { Component, input, model, output } from '@angular/core';
import { Product } from '../product';
import { CommonModule, LowerCasePipe, CurrencyPipe } from '@angular/common';
import { ConvertToSpacesPipe } from '../../shared/convert-to-spaces-pipe';
import { Star } from '../../shared/star/star';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-table',
  imports: [CommonModule, LowerCasePipe, CurrencyPipe, ConvertToSpacesPipe, Star, FormsModule, RouterLink],
  templateUrl: './product-table.html',
})
export class ProductTable {
  readonly products = input.required<readonly Product[]>();
  readonly showImage = model(false);
  readonly filter = input('');
  readonly ratingClicked = output<string>();

  onRatingClicked(message: string): void {
    this.ratingClicked.emit(message);
  }

  toggleImage(): void {
    this.showImage.set(!this.showImage());
  }
}
