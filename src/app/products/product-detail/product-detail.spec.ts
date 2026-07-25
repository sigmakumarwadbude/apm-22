import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { ActivatedRoute, Router, provideRouter } from '@angular/router';
import { vi } from 'vitest';

import { ProductDetail } from './product-detail';
import { ProductFacade } from '../product-facade';
import { Product } from '../product';
import { PRODUCTS } from '../product.data';

describe('ProductDetail', () => {
  let component: ProductDetail;
  let fixture: ComponentFixture<ProductDetail>;
  let router: Router;

  const mockProduct: Product = PRODUCTS[0];
  const selectedProduct = signal<Product | null>(mockProduct);
  const loading = signal(false);
  const error = signal('');

  const mockFacade = {
    selectedProduct,
    loading,
    error,
    loadProductById: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetail],
      providers: [
        provideRouter([]),
        {
          provide: ProductFacade,
          useValue: mockFacade,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => (key === 'id' ? '1' : null),
              },
            },
          },
        },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(ProductDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    selectedProduct.set(mockProduct);
    loading.set(false);
    error.set('');
    vi.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadProductById on init with route id', () => {
    expect(mockFacade.loadProductById).toHaveBeenCalledWith(1);
  });

  it('should display product detail information', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain(mockProduct.productName);
    expect(compiled.textContent).toContain(mockProduct.description);
  });

  it('should display loading message when facade is loading', () => {
    loading.set(true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Loading product details...');
  });

  it('should display error message and back button when facade has an error', () => {
    loading.set(false);
    error.set('Failed to fetch product');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Failed to fetch product');
    expect(compiled.textContent).toContain('Back to Products');

    const navigateSpy = vi.spyOn(router, 'navigate');
    const backBtn: HTMLButtonElement = compiled.querySelector('button')!;
    backBtn.click();
    expect(navigateSpy).toHaveBeenCalledWith(['/products']);
  });

  it('should navigate to /products when onBack is called', () => {
    const navigateSpy = vi.spyOn(router, 'navigate');
    component.onBack();
    expect(navigateSpy).toHaveBeenCalledWith(['/products']);
  });
});
