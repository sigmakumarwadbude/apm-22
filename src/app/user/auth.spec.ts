import { TestBed } from '@angular/core/testing';

import { Auth } from './auth';

describe('Auth', () => {
  let service: Auth;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Auth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set current user', () => {
    service.login('test', 'test');
    expect(service.currentUser()).not.toBeNull();
    expect(service.currentUser()?.username).toBe('test');
  });

  it('should logout', () => {
    service.login('test', 'test');
    service.logout();
    expect(service.currentUser()).toBeNull();
  });

  it('should check if logged in', () => {
    service.login('test', 'test');
    expect(service.isLoggedIn()).toBe(true);
    service.logout();
    expect(service.isLoggedIn()).toBeFalsy();
  });
});
