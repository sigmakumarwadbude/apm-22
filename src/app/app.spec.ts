import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Navigation } from './shared/layout/navigation/navigation';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
      ],
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

  it('should pass the title to Navigation', () => {
    const fixture = createComponent();
    fixture.detectChanges();

    const navigation = fixture.debugElement.query(By.directive(Navigation));

    expect(navigation.componentInstance.title()).toBe('apm-22');
  });
});