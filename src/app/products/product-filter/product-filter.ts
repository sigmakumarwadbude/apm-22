import { CommonModule } from '@angular/common';
import { Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-filter',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-4">
      <div class="flex flex-col gap-4 md:flex-row md:items-center">
          <label for="filter" class="w-full text-sm font-medium text-slate-700 md:w-32">
              Filter by
          </label>

          <input id="filter" type="text" [(ngModel)]="filter" placeholder="Search products..."
              class="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" />
      </div>

      @if (filter()) {
      <p class="text-sm text-slate-600">
          Filtered by:
          <span class="font-semibold">{{ filter() }}</span>
      </p>
      }

      <p class="text-sm text-slate-500">
          {{ count() }} product(s)
      </p>
    </div>
  `,
})
export class ProductFilter {
  readonly filter = model('');
  readonly count = input(0)
}
