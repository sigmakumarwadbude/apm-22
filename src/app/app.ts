import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <main class="min-h-screen bg-slate-50">
      <div class="mx-auto max-w-7xl px-6 py-8">
        <header class="mb-8 border-b border-slate-200 pb-4">
          <h1 class="text-4xl font-bold tracking-tight text-slate-900">
            {{ title() }}
          </h1>
          <p class="mt-2 text-lg text-slate-600">Angular 22 Learning Project</p>
        </header>

        <router-outlet />
      </div>
    </main>
  `,
})
export class App {
  protected readonly title = signal('apm-22');
}
