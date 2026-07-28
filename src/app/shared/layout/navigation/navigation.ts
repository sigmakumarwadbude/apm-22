import { Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink, RouterLinkActive],
  template: `
 <header class="border-b border-slate-200 bg-white shadow-sm">
  <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

    <div class="flex items-center gap-10">
      <div>
        <h1 class="text-3xl font-bold">{{ title() }}</h1>
        <p class="text-sm text-slate-600">
          Angular 22 Learning Project
        </p>
      </div>

      <nav class="flex gap-2">
        <a routerLink="/home" routerLinkActive="bg-blue-600 text-white"
          class="rounded-md px-4 py-2 hover:bg-slate-100">
          Home
        </a>

        <a routerLink="/products" routerLinkActive="bg-blue-600 text-white"
        [routerLinkActiveOptions]="{ exact: true }"
          class="rounded-md px-4 py-2 hover:bg-slate-100">
          Products
        </a>
        <a routerLink="/products/new" routerLinkActive="bg-blue-600 text-white"
          [routerLinkActiveOptions]="{exact: true}"
          class="rounded-md px-4 py-2 hover:bg-slate-100">
          Add Product
        </a>
      </nav>
    </div>
    @if(isLoggedIn()){
      <a
      (click)="onLogout()"
      class="cursor-pointer rounded-md bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
      >
      Log out
      </a>
}
    @else {
    <a
      routerLink="/login"
      routerLinkActive="bg-blue-700"
      class="rounded-md bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
    >
      Log In
    </a>
}
  </div>
</header>
 `
})
export class Navigation {
  readonly title = input.required<string>();
  readonly isLoggedIn = input<boolean>();
  readonly logout = output<void>();

  onLogout() {
    this.logout.emit();
  }
}
