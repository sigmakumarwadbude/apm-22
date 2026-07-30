import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEditInfo } from './product-edit-info';

describe('ProductEditInfo', () => {
  let component: ProductEditInfo;
  let fixture: ComponentFixture<ProductEditInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductEditInfo],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductEditInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
