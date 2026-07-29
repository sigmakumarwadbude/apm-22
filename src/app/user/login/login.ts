import { Component, inject, signal } from '@angular/core';
import { form, FormField, minLength, required } from '@angular/forms/signals';
import { Auth } from '../auth';
import { Router, RouterLink } from '@angular/router';
import { UserCredentials } from '../user.model';
import { injectPageTitle } from '../../shared/route-data';

@Component({
  selector: 'app-login',
  imports: [FormField, RouterLink],
  templateUrl: './login.html',
})
export class Login {
  readonly pageTitle = injectPageTitle();

  errorMessage = signal('');
  formModel = signal<UserCredentials>({
    username: '',
    password: '',
  })

  loginForm = form(this.formModel, schema => {
    required(schema.username, { message: 'User Name is required' }),
      required(schema.password, { message: 'Password is required' }),
      minLength(schema.username, 3, { message: 'User name must be at least 3 characters' })
    minLength(schema.password, 3, { message: 'Password must be at least 3 characters' })
  });

  private authService = inject(Auth);
  private router = inject(Router);

  login(event: SubmitEvent) {
    event.preventDefault();
    this.errorMessage.set('')

    if (this.loginForm().invalid()) {
      this.errorMessage.set('Invalid username or password');
      this.loginForm().markAsTouched();
      return;
    }

    const { username, password } = this.loginForm().value();

    this.authService.login(username, password);
    this.router.navigate(['/products'])
  }
}
