import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  template: `
    <section class="rounded-xl bg-slate-100 px-8 py-16 text-center shadow-sm">
      <p class="mb-6 text-lg text-slate-600">
        {{ description }}
      </p>

      <button
        type="button"
        class="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        Get Started
      </button>
    </section>
  `,
})
export class Home {
  protected readonly description = 'Learn Modern Angular step by step.';
}
