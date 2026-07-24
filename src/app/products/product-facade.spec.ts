import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { vi } from 'vitest';

import { ProductFacade } from './product-facade';
import { ProductService } from './product.service';
import { Product } from './product';
import { PRODUCTS } from './product.data';

describe(ProductFacade.name, () => {
  let facade: ProductFacade;

  const mockProducts: readonly Product[] = PRODUCTS;

  const productServiceMock = {
    getProducts: vi.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductFacade,
        {
          provide: ProductService,
          useValue: productServiceMock,
        },
      ],
    });

    facade = TestBed.inject(ProductFacade);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  it('should have the initial state', () => {
    expect(facade.products()).toEqual([]);
    expect(facade.loading()).toBe(false);
    expect(facade.error()).toBe('');
    expect(facade.productCount()).toBe(0);
  });

  it('should load products successfully', () => {
    productServiceMock.getProducts.mockReturnValue(of(mockProducts));

    facade.loadProducts();

    expect(productServiceMock.getProducts).toHaveBeenCalled();
    expect(facade.products()).toEqual(mockProducts);
    expect(facade.loading()).toBe(false);
    expect(facade.error()).toBe('');
    expect(facade.productCount()).toBe(1);
  });

  it('should handle service errors', () => {
    productServiceMock.getProducts.mockReturnValue(
      throwError(() => new Error('Something went wrong'))
    );

    facade.loadProducts();

    expect(productServiceMock.getProducts).toHaveBeenCalled();
    expect(facade.products()).toEqual([]);
    expect(facade.loading()).toBe(false);
    expect(facade.error()).toBe('Something went wrong');
  });

  it('should compute productCount when products are loaded', () => {
    productServiceMock.getProducts.mockReturnValue(of(mockProducts));

    facade.loadProducts();

    expect(facade.productCount()).toBe(mockProducts.length);
  });
});