import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Navigation } from './navigation';
import { provideRouter } from '@angular/router';

describe('Navigation', () => {
  let component: Navigation;
  let fixture: ComponentFixture<Navigation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navigation],
    providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Navigation);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('title', 'apm-22');
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the application title', () => {
    // Assert
    const heading = fixture.nativeElement.querySelector('h1');
    expect(heading?.textContent).toContain('apm-22');
  });
});
