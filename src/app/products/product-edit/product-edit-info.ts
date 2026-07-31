import { Component, inject } from '@angular/core';
import { ProductEdit } from './product-edit';
import { FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-product-edit-info',
  imports: [FormField],
  templateUrl: './product-edit-info.html',
})
export class ProductEditInfo {
  private readonly parent = inject(ProductEdit);

  readonly vm = this.parent.vm;
}
