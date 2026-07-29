import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { signal } from '@angular/core';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { ProductEdit } from './product-edit';
import { ProductFacade } from '../product-facade';
import { Product } from '../product';
import { createEmptyProduct } from '../product.factory';
import { By } from '@angular/platform-browser';

describe('ProductEdit', () => {
  let component: ProductEdit;
  let fixture: ComponentFixture<ProductEdit>;
  let router: Router;

  const facade = {
    initializeProduct: vi.fn(),
    selectedProduct: signal<Product | null>(null),
    loading: signal(false),
    error: signal(''),
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    facade.selectedProduct.set(null);
    facade.loading.set(false);
    facade.error.set('');

    await TestBed.configureTestingModule({
      imports: [ProductEdit],
      providers: [
        provideRouter([]),
        {
          provide: ProductFacade,
          useValue: facade,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: '0' })),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductEdit);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate').mockResolvedValue(true);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should copy the selected product from the facade', () => {
    const product: Product = {
      productId: 1,
      productName: 'Hammer',
      productCode: 'TBX-001',
      description: 'Test product',
      releaseDate: '2026-01-01',
      price: 25,
      starRating: 4,
      imageUrl: 'assets/images/hammer.png',
    };

    facade.selectedProduct.set(product);

    fixture.detectChanges();

    expect(component.product()).toEqual(product);

    // Verify it's a copy, not the same object
    expect(component.product()).not.toBe(product);
  });

  it('should create an empty product when no product is selected', () => {
    facade.selectedProduct.set(null);

    fixture.detectChanges();

    expect(component.product()).toEqual(createEmptyProduct());
  });

  it('should render product name validation message', () => {
    fixture.detectChanges();

    component.product.update(product => ({
      ...product,
      productName: '',
    }));

    component.saveProduct(new SubmitEvent('submit'));

    fixture.detectChanges();

    const error = fixture.nativeElement.querySelector(
      '.text-red-600'
    );

    expect(error).not.toBeNull();
    expect(error.textContent).toContain('Product name is required');
  });


  it('should call saveProduct on form submit', () => {
    fixture.detectChanges();

    const spy = vi.spyOn(component, 'saveProduct');

    const form = fixture.debugElement.query(By.css('form'));

    form.triggerEventHandler('submit', new SubmitEvent('submit'));

    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });



  it('should render the error message container', () => {
    facade.error.set('Unable to load product');

    fixture.detectChanges();

    const errorDiv = fixture.nativeElement.querySelector('.bg-red-50');

    expect(errorDiv).not.toBeNull();
    expect(errorDiv.textContent).toContain('Unable to load product');
  });

  it('should call deleteProduct when Delete button is clicked', () => {
    const product: Product = {
      productId: 1,
      productName: 'Hammer',
      productCode: 'TBX-001',
      description: '',
      releaseDate: '2026-01-01',
      price: 25,
      starRating: 4,
      imageUrl: '',
    };

    facade.selectedProduct.set(product);

    fixture.detectChanges();

    const spy = vi.spyOn(component, 'deleteProduct');

    const deleteButton = fixture.debugElement
      .queryAll(By.css('button'))
      .find(btn => btn.nativeElement.textContent.trim() === 'Delete');

    expect(deleteButton).toBeTruthy();

    deleteButton!.nativeElement.click();

    expect(spy).toHaveBeenCalled();
  });

  it('should call cancel when Cancel button is clicked', () => {
    const spy = vi.spyOn(component, 'cancel');

    fixture.detectChanges();

    const cancelButton = fixture.debugElement
      .queryAll(By.css('button'))
      .find(btn => btn.nativeElement.textContent.trim() === 'Cancel');

    cancelButton?.nativeElement.click();

    expect(spy).toHaveBeenCalled();
  });
});