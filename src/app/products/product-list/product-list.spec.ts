import { ComponentFixture, TestBed } from '@angular/core/testing';
import { computed, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';

import { ProductList } from './product-list';
import { ProductFacade } from '../product-facade';
import { Product } from '../product';
import { Star } from '../../shared/star/star';
import { PRODUCTS } from '../product.data';

describe(ProductList.name, () => {
  let fixture: ComponentFixture<ProductList>;
  let component: ProductList;

  const mockProducts: readonly Product[] = PRODUCTS;

  const products = signal<readonly Product[]>(mockProducts);

const loading = signal(false);
const error = signal('');

  const mockFacade = {
    products,
    loading,
    error,
    productCount: computed(() => products().length),
    loadProducts: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductList],
      providers: [
        {
          provide: ProductFacade,
          useValue: mockFacade,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    mockFacade.products.set(mockProducts);

    mockFacade.loading.set(false);
    mockFacade.error.set('');
    vi.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadProducts on init', () => {
    expect(mockFacade.loadProducts).toHaveBeenCalled();
  });

  it('should update the filter text', () => {
    component.listFilter.set('leaf');
    fixture.detectChanges();

    expect(component.listFilter()).toBe('leaf');
    expect(component.filteredProducts().length).toBe(1);
  });

  it('should toggle images', () => {
    expect(component.showImage()).toBe(false);

    component.showImage.update(show => !show);

    expect(component.showImage()).toBe(true);
  });

  it('should show loading message', () => {
    mockFacade.loading.set(true);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Loading products');
  });

  it('should show error message', () => {
    mockFacade.loading.set(false);
    mockFacade.error.set('Failed to load products');
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain(
      'Failed to load products'
    );
  });

  it('should hide the table when there are no products', () => {
    mockFacade.products.set([]);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('table')).toBeNull();
    expect(fixture.nativeElement.textContent).toContain('No products found.');
  });

  describe('onRatingClicked', () => {
    it('should update pageTitle', () => {
      const star = fixture.debugElement.query(By.directive(Star));

      star.triggerEventHandler('ratingClicked', '4.5');
      fixture.detectChanges();

      expect(component.pageTitle()).toBe('Product List 4.5');
    });
  });
});