import { Component, signal } from '@angular/core';

@Component({
  template: `
    <section class="rounded-lg bg-slate-100 p-8">
      <h1 class="text-3xl font-bold">
        {{ title() }}
      </h1>

      <p class="mt-4 text-slate-600">
        {{ description }}
      </p>
    </section>
  `,
})
export class Home {
  readonly title = signal('Home');

  readonly description = 'Learn Modern Angular step by step.';
}
