// route-data.ts
import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export function injectPageTitle(): string {
    return inject(ActivatedRoute).snapshot.data['title'] as string;
}