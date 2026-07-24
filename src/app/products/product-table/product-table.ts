import { Component, input, model, output } from '@angular/core';
import { Product } from '../product';
import { CommonModule, LowerCasePipe, CurrencyPipe } from '@angular/common';
import { ConvertToSpacesPipe } from '../../shared/convert-to-spaces-pipe';
import { Star } from '../../shared/star/star';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-table',
  imports: [CommonModule, LowerCasePipe, CurrencyPipe, ConvertToSpacesPipe, Star, FormsModule],
  templateUrl: './product-table.html',
})
export class ProductTable {
  readonly products = input.required<readonly Product[]>();
  readonly showImage = model(false);
  readonly ratingClicked = output<string>();

  onRatingClicked(message: string): void {
    this.ratingClicked.emit(message);
  }
}
