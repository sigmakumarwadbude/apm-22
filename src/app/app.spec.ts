import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  function createComponent() {
    return TestBed.createComponent(App);
  }

  it('should create the application', () => {
    // Arrange & Act
    const fixture = createComponent();

    // Assert
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should display the application title', () => {
    // Arrange
    const fixture = createComponent();

    // Act
    fixture.detectChanges();

    // Assert
    const heading = fixture.nativeElement.querySelector('h1');
    expect(heading?.textContent).toContain('apm-22');
  });
});