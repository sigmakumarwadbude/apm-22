import { Component, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, scan, startWith } from 'rxjs';
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
      <div class="route-shell" [style.--route-animation]="outletAnimation()">
        <router-outlet />
      </div>
    </main>
  `,
})
export class App {
  protected readonly title = signal('apm-22');
  private readonly router = inject(Router);
  private authService = inject(Auth);
  private readonly navigationCount = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      scan(count => count + 1, 0),
      startWith(0),
    ),
    { initialValue: 0 }
  );

  isLoggedIn = this.authService.isLoggedIn;
  readonly outletAnimation = computed(() =>
    this.navigationCount() % 2 === 0
      ? 'route-slide-in-a 220ms ease-out both'
      : 'route-slide-in-b 220ms ease-out both'
  );

  onLogout() {
    this.authService.logout();
  }
}
