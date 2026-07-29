import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { signal } from '@angular/core';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { ProductEdit } from './product-edit';
import { ProductFacade } from '../product-facade';

describe('ProductEdit', () => {
  let component: ProductEdit;
  let fixture: ComponentFixture<ProductEdit>;

  const facade = {
    initializeProduct: vi.fn(),
    selectedProduct: signal(null),
    error: signal(''),
  };

  beforeEach(async () => {
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

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});