import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Star } from './star';
import { By } from '@angular/platform-browser';

describe('Star', () => {
  let component: Star;
  let fixture: ComponentFixture<Star>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Star],
    }).compileComponents();

    fixture = TestBed.createComponent(Star);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the correct rating message', () => {
    component.rating = 4.5;

    let emittedValue = '';

    component.ratingClicked.subscribe((value) => {
      emittedValue = value;
    });

    // Find the clickable element
    const clickable = fixture.debugElement.query(By.css('div')); // or 'span'

    // Simulate click
    clickable.triggerEventHandler('click');

    // or
    // clickable.nativeElement.click();

    fixture.detectChanges();

    expect(emittedValue).toBe('rating clicked 4.5');
  });
});
