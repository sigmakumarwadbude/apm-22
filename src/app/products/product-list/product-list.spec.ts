import { ComponentFixture, TestBed } from '@angular/core/testing';
import { computed, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';

import { ProductList } from './product-list';
import { ProductFacade } from '../product-facade';
import { Product } from '../product';
import { PRODUCTS } from '../product.data';
import { ProductFilter } from '../product-filter/product-filter';
import { ProductTable } from '../product-table/product-table';

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
        provideRouter([]),
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
    component.listFilter.set('');
    component.showImage.set(false);
    vi.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadProducts on init', () => {
    expect(mockFacade.loadProducts).toHaveBeenCalled();
  });

  it('should render page title in header', () => {
    const h2 = fixture.nativeElement.querySelector('header h2');
    expect(h2.textContent.trim()).toBe('Product List');
  });

  it('should pass count to ProductFilter component', () => {
    const filterDebugEl = fixture.debugElement.query(By.directive(ProductFilter));
    const filterComp = filterDebugEl.componentInstance as ProductFilter;
    expect(filterComp.count()).toBe(5);
  });

  it('should update filter text and filter products via ProductFilter binding', () => {
    const filterDebugEl = fixture.debugElement.query(By.directive(ProductFilter));
    filterDebugEl.triggerEventHandler('filterChange', 'cart');
    fixture.detectChanges();

    expect(component.listFilter()).toBe('cart');
    expect(component.filteredProducts().length).toBe(1);
    expect(component.filteredProducts()[0].productName).toContain('Garden Cart');
  });

  it('should toggle showImage via ProductTable binding', () => {
    const tableDebugEl = fixture.debugElement.query(By.directive(ProductTable));
    expect(component.showImage()).toBe(false);

    tableDebugEl.triggerEventHandler('showImageChange', true);
    fixture.detectChanges();

    expect(component.showImage()).toBe(true);
  });

  it('should show loading message when facade loading is true', () => {
    mockFacade.loading.set(true);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Loading products...');
  });

  it('should show error message when facade error is set', () => {
    mockFacade.loading.set(false);
    mockFacade.error.set('Failed to load products');
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Failed to load products');
  });

  it('should display "No products found." when filtered products list is empty', () => {
    component.listFilter.set('NonExistentProduct');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('app-product-table')).toBeNull();
    expect(fixture.nativeElement.textContent).toContain('No products found.');
  });

  it('should update pageTitle when ratingClicked is emitted from ProductTable', () => {
    const tableDebugEl = fixture.debugElement.query(By.directive(ProductTable));
    tableDebugEl.triggerEventHandler('ratingClicked', '5.0');
    fixture.detectChanges();

    expect(component.pageTitle()).toBe('Product List 5.0');
    const h2 = fixture.nativeElement.querySelector('header h2');
    expect(h2.textContent.trim()).toBe('Product List 5.0');
  });
});