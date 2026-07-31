import { Component, input } from '@angular/core';

@Component({
  selector: 'app-form-field',
  template: `
  <div class="space-y-2">
    <label [for]="fieldId()" class="block text-sm font-medium text-slate-700">
      {{ label() }}
    </label>
    <ng-content />
  </div>
  `,
})
export class FormFieldComponent {
  readonly label = input.required<string>();
  readonly fieldId = input.required<string>();  
}
