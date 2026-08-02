import { Component, inject } from '@angular/core';
import { ProductEdit } from './product-edit';
import { FormField } from '@angular/forms/signals';
import { TagInputComponent } from '../../shared/ui/tag-input/tag-input';

@Component({
  selector: 'app-product-edit-tags',
  imports: [FormField, TagInputComponent],
  templateUrl: './product-edit-tags.html',
})
export class ProductEditTags {
  private readonly parent = inject(ProductEdit);

  readonly vm = this.parent.vm;
}
