import { Component, input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `
  <div class="flex flex-col items-center justify-center gap-3 py-8" role="status" aria-live="polite">
    <i class="fa fa-circle-o-notch animate-spin text-sky-600" [class.text-xl]="size() === 'sm'"
        [class.text-3xl]="size() === 'md'" [class.text-5xl]="size() === 'lg'">
    </i>
    <p class="text-sm text-gray-600">
        {{ message()}}
    </p>
  </div>
  `
})
export class Spinner {
  readonly message = input('Loading');
  readonly size = input<'sm' | 'md' | 'lg'>('md');
}
