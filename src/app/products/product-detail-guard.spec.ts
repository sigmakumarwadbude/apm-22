import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, provideRouter } from '@angular/router';
import { Observable, firstValueFrom, of, throwError } from 'rxjs';
import { vi } from 'vitest';

import { productDetailGuard } from './product-detail-guard';
import { ProductService } from './product.service';
import { PRODUCTS } from './product.data';
import { Product } from './product';

describe('productDetailGuard', () => {
  let mockProductService: { getProductById: ReturnType<typeof vi.fn> };
  let router: Router;

  const mockRoute = (id: string | null) =>
    ({
      paramMap: {
        get: (key: string) => (key === 'id' ? id : null),
      },
    }) as unknown as ActivatedRouteSnapshot;

  const mockState = {} as RouterStateSnapshot;

  beforeEach(() => {
    mockProductService = {
      getProductById: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: ProductService, useValue: mockProductService },
      ],
    });

    router = TestBed.inject(Router);
  });

  it('should allow activation when product is found', async () => {
    const mockProduct: Product = PRODUCTS[0];
    mockProductService.getProductById.mockReturnValue(of(mockProduct));

    const result$ = TestBed.runInInjectionContext(() =>
      productDetailGuard(mockRoute('1'), mockState)
    ) as Observable<boolean>;

    const res = await firstValueFrom(result$);
    expect(res).toBe(true);
  });

  it('should prevent activation and redirect to /products when product is not found', async () => {
    mockProductService.getProductById.mockReturnValue(of(null));
    const navigateSpy = vi.spyOn(router, 'navigate');

    const result$ = TestBed.runInInjectionContext(() =>
      productDetailGuard(mockRoute('999'), mockState)
    ) as Observable<boolean>;

    const res = await firstValueFrom(result$);
    expect(res).toBe(false);
    expect(navigateSpy).toHaveBeenCalledWith(['/products']);
  });

  it('should handle errors by redirecting to /products and returning false', async () => {
    mockProductService.getProductById.mockReturnValue(
      throwError(() => new Error('Error fetching product'))
    );
    const navigateSpy = vi.spyOn(router, 'navigate');

    const result$ = TestBed.runInInjectionContext(() =>
      productDetailGuard(mockRoute('invalid'), mockState)
    ) as Observable<boolean>;

    const res = await firstValueFrom(result$);
    expect(res).toBe(false);
    expect(navigateSpy).toHaveBeenCalledWith(['/products']);
  });
});
