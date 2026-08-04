import { Component, computed, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, scan, startWith } from 'rxjs';
import { Navigation } from './shared/layout/navigation/navigation';
import { Auth } from './user/auth';
import { Loading } from './shared/services/loading';
import { Spinner } from './shared/ui/spinner/spinner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navigation, Spinner],
  template: `
    <main class="min-h-screen bg-slate-50">
      <app-navigation 
        [title]="title" 
        [isLoggedIn]="isLoggedIn()" 
        (logout)="onLogout()"/>
      @if (loadingService.loading()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
          <app-spinner message="Loading..." />
        </div>
      }
      <div class="route-shell" [style.--route-animation]="outletAnimation()">
        <router-outlet />
      </div>
    </main>
  `,
})
export class App {
  readonly title = 'apm-22';
  private readonly router = inject(Router);
  private readonly authService = inject(Auth);
  protected readonly loadingService = inject(Loading);

  private readonly navigationCount = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      scan(navigationIndex => navigationIndex + 1, 0),
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
