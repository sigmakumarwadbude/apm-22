import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navigation } from './shared/layout/navigation/navigation';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navigation],
  template: `
    <main class="min-h-screen bg-slate-50">
      <app-navigation [title]="title()" />
      <router-outlet />
    </main>
  `,
})
export class App {
  protected readonly title = signal('apm-22');
}
