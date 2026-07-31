import { Component, inject } from '@angular/core';
import { ProductEdit } from './product-edit';
import { FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-product-edit-tags',
  imports: [FormField],
  templateUrl: './product-edit-tags.html',
})
export class ProductEditTags {
  private readonly parent = inject(ProductEdit);

  readonly vm = this.parent.vm;
}
