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
    getProductById: vi.fn(),
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

  it('should have the initial state and computed selectors', () => {
    expect(facade.products()).toEqual([]);
    expect(facade.selectedProduct()).toBeNull();
    expect(facade.loading()).toBe(false);
    expect(facade.error()).toBe('');
    expect(facade.productCount()).toBe(0);
    expect(facade.hasProducts()).toBe(false);
    expect(facade.hasError()).toBe(false);
  });

  it('should load products successfully', () => {
    productServiceMock.getProducts.mockReturnValue(of(mockProducts));

    facade.loadProducts();

    expect(productServiceMock.getProducts).toHaveBeenCalled();
    expect(facade.products()).toEqual(mockProducts);
    expect(facade.loading()).toBe(false);
    expect(facade.error()).toBe('');
    expect(facade.productCount()).toBe(5);
    expect(facade.hasProducts()).toBe(true);
    expect(facade.hasError()).toBe(false);
  });

  it('should handle service errors when loading products', () => {
    productServiceMock.getProducts.mockReturnValue(
      throwError(() => new Error('Something went wrong'))
    );

    facade.loadProducts();

    expect(productServiceMock.getProducts).toHaveBeenCalled();
    expect(facade.products()).toEqual([]);
    expect(facade.loading()).toBe(false);
    expect(facade.error()).toBe('Something went wrong');
    expect(facade.hasError()).toBe(true);
  });

  it('should load product by id via service when not in memory', () => {
    const singleProduct = mockProducts[0];
    productServiceMock.getProductById.mockReturnValue(of(singleProduct));

    facade.loadProductById(1);

    expect(productServiceMock.getProductById).toHaveBeenCalledWith(1);
    expect(facade.selectedProduct()).toEqual(singleProduct);
    expect(facade.loading()).toBe(false);
    expect(facade.error()).toBe('');
  });

  it('should load product by id from in-memory cache if products are already loaded', () => {
    productServiceMock.getProducts.mockReturnValue(of(mockProducts));
    facade.loadProducts();

    const cachedProduct = mockProducts[1];
    facade.loadProductById(2);

    expect(productServiceMock.getProductById).not.toHaveBeenCalled();
    expect(facade.selectedProduct()).toEqual(cachedProduct);
  });

  it('should set error message when product by id is not found', () => {
    productServiceMock.getProductById.mockReturnValue(of(null));

    facade.loadProductById(99);

    expect(productServiceMock.getProductById).toHaveBeenCalledWith(99);
    expect(facade.selectedProduct()).toBeNull();
    expect(facade.loading()).toBe(false);
    expect(facade.error()).toBe('Product with ID 99 was not found');
  });

  it('should handle invalid id for loadProductById', () => {
    facade.loadProductById(0);

    expect(productServiceMock.getProductById).not.toHaveBeenCalled();
    expect(facade.selectedProduct()).toBeNull();
    expect(facade.error()).toBe('Invalid product ID');

    facade.loadProductById(NaN);
    expect(facade.error()).toBe('Invalid product ID');
  });

  it('should handle service errors when loading product by id', () => {
    productServiceMock.getProductById.mockReturnValue(
      throwError(() => new Error('Product service error'))
    );

    facade.loadProductById(5);

    expect(facade.selectedProduct()).toBeNull();
    expect(facade.loading()).toBe(false);
    expect(facade.error()).toBe('Product service error');
  });

  it('should clear selected product state', () => {
    productServiceMock.getProductById.mockReturnValue(of(mockProducts[0]));
    facade.loadProductById(1);
    expect(facade.selectedProduct()).toEqual(mockProducts[0]);

    facade.clearSelectedProduct();
    expect(facade.selectedProduct()).toBeNull();
  });

  it('should clear error state', () => {
    productServiceMock.getProducts.mockReturnValue(
      throwError(() => new Error('Fetch failed'))
    );
    facade.loadProducts();
    expect(facade.hasError()).toBe(true);

    facade.clearError();
    expect(facade.error()).toBe('');
    expect(facade.hasError()).toBe(false);
  });
});