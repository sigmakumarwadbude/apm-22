import { TestBed } from '@angular/core/testing';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ProductService } from './product.service';
import { Product } from './product';
import { PRODUCTS } from './product.data';

describe(ProductService.name, () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return products', () => {
    const mockProducts: readonly Product[] = PRODUCTS;

    service.getProducts().subscribe(products => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne('products/products.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should get product by id when found', () => {
    const mockProducts: readonly Product[] = PRODUCTS;

    service.getProductById(1).subscribe(product => {
      expect(product).toEqual(PRODUCTS[0]);
    });

    const req = httpMock.expectOne('products/products.json');
    req.flush(mockProducts);
  });

  it('should return null when product by id is not found', () => {
    const mockProducts: readonly Product[] = PRODUCTS;

    service.getProductById(999).subscribe(product => {
      expect(product).toBeNull();
    });

    const req = httpMock.expectOne('products/products.json');
    req.flush(mockProducts);
  });

  it('should return null for invalid or non-positive product id without network call', () => {
    service.getProductById(0).subscribe(product => {
      expect(product).toBeNull();
    });

    service.getProductById(NaN).subscribe(product => {
      expect(product).toBeNull();
    });

    httpMock.expectNone('products/products.json');
  });

  it('should handle server errors', () => {
    service.getProducts().subscribe({
      next: () => {
        throw new Error('Expected an error');
      },
      error: error => {
        expect(error).toBeTruthy();
        expect(error.message).toContain('Server returned code 500');
      },
    });

    const req = httpMock.expectOne('products/products.json');
    req.flush('Internal Server Error', {
      status: 500,
      statusText: 'Server Error',
    });
  });

  it('should handle client errors', () => {
    service.getProducts().subscribe({
      next: () => {
        throw new Error('Expected an error');
      },
      error: error => {
        expect(error.message).toContain('Network error');
      },
    });

    const req = httpMock.expectOne('products/products.json');
    req.error(new ProgressEvent('Network Error'));
  });
});