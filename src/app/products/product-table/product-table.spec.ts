import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ProductTable } from './product-table';
import { PRODUCTS } from '../product.data';
import { By } from '@angular/platform-browser';
import { Star } from '../../shared/star/star';

describe('ProductTable', () => {
  let component: ProductTable;
  let fixture: ComponentFixture<ProductTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductTable],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductTable);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('products', PRODUCTS);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle image visibility when the button is clicked', () => {
    expect(component.showImage()).toBe(false);

    const button: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');

    button.click();
    fixture.detectChanges();

    expect(component.showImage()).toBe(true);
    expect(button.textContent).toContain('Hide Image');

    button.click();
    fixture.detectChanges();

    expect(component.showImage()).toBe(false);
    expect(button.textContent).toContain('Show Image');
  });

  it('should emit ratingClicked when Star emits', () => {
    const spy = vi.fn();

    component.ratingClicked.subscribe(spy);

    const star = fixture.debugElement.query(By.directive(Star));

    star.triggerEventHandler('ratingClicked', '4.5');

    expect(spy).toHaveBeenCalledWith('4.5');
  });
});
