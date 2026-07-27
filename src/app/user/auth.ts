import { computed, Service, signal } from '@angular/core';
import { User } from './user.model';

@Service()
export class Auth {
    currentUser = signal<User | null>(null);

    isLoggedIn = computed(() => this.currentUser() !== null);

    login(username: string, password: string) {
        // TODO: replace with real API call; for now set a mock user on success
        this.currentUser.set({ id: 1, username, admin: false });
    }

    logout() {
        this.currentUser.set(null);
    }
}
