import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navigation } from './shared/layout/navigation/navigation';
import { Auth } from './user/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navigation],
  template: `
    <main class="min-h-screen bg-slate-50">
      <app-navigation 
        [title]="title()" 
        [isLoggedIn]="isLoggedIn()" 
        (logout)="onLogout()"/>
      <router-outlet />
    </main>
  `,
})
export class App {
  protected readonly title = signal('apm-22');
  private authService = inject(Auth);

  isLoggedIn = this.authService.isLoggedIn;

  onLogout() {
    this.authService.logout();
  }
}
