import { Component, inject } from '@angular/core';
import { ProductEdit } from './product-edit';
import { FormFieldComponent } from '../../shared/ui/form-field/form-field';
import { FormErrors } from '../../shared/ui/form-errors/form-errors';
import { FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-product-edit-info',
  imports: [FormFieldComponent, FormErrors, FormField],
  templateUrl: './product-edit-info.html',
})
export class ProductEditInfo {
  private readonly parent = inject(ProductEdit);

  readonly vm = this.parent.vm;
}
