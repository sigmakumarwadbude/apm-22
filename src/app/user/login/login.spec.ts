import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Login } from './login';
import { provideRouter, Router } from '@angular/router';
import { Auth } from '../auth';
import { By } from '@angular/platform-browser';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  const authService = {
    login: vi.fn()
  };

  let router: Router;

  beforeEach(async () => {
    authService.login.mockClear();
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        provideRouter([]),
        { provide: Auth, useValue: authService }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;

    router = TestBed.inject(Router);

    vi.spyOn(router, 'navigate').mockResolvedValue(true);

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form values', () => {
    expect(component.loginForm().value()).toEqual({
      username: '',
      password: '',
    });
  });

  it('should be invalid initially', () => {
    expect(component.loginForm().invalid()).toBe(true);
  });

  it('should show error message for invalid form', () => {
    component.login(new SubmitEvent('submit'));

    expect(component.errorMessage()).toBe(
      'Invalid username or password'
    );

    expect(authService.login).not.toHaveBeenCalled();
  });

  it('should mark form as touched when invalid', () => {
    component.login(new SubmitEvent('submit'));

    expect(component.loginForm().touched()).toBe(true);
  });

  it('should login with valid credentials', () => {
    component.loginForm().value.set({
      username: 'admin',
      password: 'password',
    });

    component.login(new SubmitEvent('submit'));

    expect(authService.login).toHaveBeenCalledOnce();
    expect(authService.login).toHaveBeenCalledWith(
      'admin',
      'password'
    );
  });

  it('should navigate after successful login', () => {
    const navigateSpy = vi.spyOn(router, 'navigate');

    component.loginForm().value.set({
      username: 'admin',
      password: 'password',
    });

    component.login(new SubmitEvent('submit'));

    expect(navigateSpy).toHaveBeenCalledWith(['/products']);
  });

  it('should clear previous error message', () => {
    component.errorMessage.set('Previous Error');

    component.login(new SubmitEvent('submit'));

    expect(component.errorMessage()).toBe(
      'Invalid username or password'
    );
  });

  it('should not navigate when form is invalid', () => {
    const navigateSpy = vi.spyOn(router, 'navigate');

    component.login(new SubmitEvent('submit'));

    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it('should not call Auth.login when form is invalid', () => {
    component.login(new SubmitEvent('submit'));

    expect(authService.login).not.toHaveBeenCalled();
  });

  it('should render username minlength validation', () => {
    component.formModel.set({
      username: 'ab',
      password: 'password'
    });

    component.loginForm().markAsTouched();

    fixture.detectChanges();

    const errors = fixture.debugElement.queryAll(By.css('p'));

    expect(errors[0].nativeElement.textContent).toContain(
      'User name must be at least 3 characters'
    );
  });

  it('should render password minlength validation', () => {
    component.formModel.set({
      username: 'admin',
      password: '12'
    });

    component.loginForm().markAsTouched();

    fixture.detectChanges();

    const errors = fixture.debugElement.queryAll(By.css('p'));

    expect(errors[0].nativeElement.textContent).toContain(
      'Password must be at least 3 characters'
    );
  });

  it('should display error after invalid login', () => {
    component.login(new SubmitEvent('submit'));

    fixture.detectChanges();

    const error = fixture.debugElement.query(By.css('.text-red-700'));

    expect(error.nativeElement.textContent).toContain(
      'Invalid username or password'
    );
  });

  it('should render username required validation message', () => {
    component.login(new SubmitEvent('submit'));
    fixture.detectChanges();

    const error = fixture.debugElement.query(By.css('p'));

    expect(error.nativeElement.textContent).toContain(
      'User Name is required'
    );
  });
  it('should render password required validation message', () => {
    component.login(new SubmitEvent('submit'));
    fixture.detectChanges();

    const errors = fixture.debugElement.queryAll(By.css('p'));

    expect(errors[1].nativeElement.textContent).toContain(
      'Password is required'
    );
  });
});
