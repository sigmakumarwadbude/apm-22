import { DestroyRef, inject, Service, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Service()
export class Loading {
    private readonly router = inject(Router);
    private readonly destroyRef = inject(DestroyRef);
    private timer?: ReturnType<typeof setTimeout>;
    private activeRequests = 0;
    private readonly _loading = signal(false);
    readonly loading = this._loading.asReadonly();
    constructor() {
        this.router.events
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(event => {
                if (event instanceof NavigationStart) {
                    this.show();
                } else if (
                    event instanceof NavigationEnd ||
                    event instanceof NavigationCancel ||
                    event instanceof NavigationError
                ) {
                    this.hide();
                }
            });
    }
    show(): void {
        this.activeRequests++;
        if (this.activeRequests > 1) {
            return;
        }
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this._loading.set(true);
        }, 150);
    }

    hide(): void {
        if (this.activeRequests > 0) {
            this.activeRequests--;
        }
        if (this.activeRequests > 0) {
            return;
        }
        clearTimeout(this.timer);
        this._loading.set(false);
    }
}
