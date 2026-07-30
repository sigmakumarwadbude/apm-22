import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEditTags } from './product-edit-tags';

describe('ProductEditTags', () => {
  let component: ProductEditTags;
  let fixture: ComponentFixture<ProductEditTags>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductEditTags],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductEditTags);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
