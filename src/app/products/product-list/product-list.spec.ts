import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductList } from './product-list';

describe(ProductList.name, () => {
  let fixture: ComponentFixture<ProductList>;
  let component: ProductList;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductList],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('toggleImage()', () => {
    it('should show images when currently hidden', () => {
      // Arrange
      expect(component.showImage()).toBe(false);

      // Act
      component.toggleImage();

      // Assert
      expect(component.showImage()).toBe(true);
    });

    it('should hide images when currently visible', () => {
      // Arrange
      component.showImage.set(true);

      // Act
      component.toggleImage();

      // Assert
      expect(component.showImage()).toBe(false);
    });

    it('should display "Show Image" initially', () => {
      const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');

      expect(button.textContent).toContain('Show Image');
    });

    it('should display "Hide Image" after toggling', () => {
      component.toggleImage();
      fixture.detectChanges();

      const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');

      expect(button.textContent).toContain('Hide Image');
    });

    it('should not display product images initially', () => {
      const image = fixture.nativeElement.querySelector('img');

      expect(image).toBeNull();
    });
  });

  it('should update the filter text', () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');

    input.value = 'leaf';
    input.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.listFilter()).toBe('leaf');
    expect(fixture.nativeElement.textContent).toContain('Filtered by:');
    expect(fixture.nativeElement.textContent).toContain('leaf');
  });

  it('should toggle images when the button is clicked', () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');

    expect(component.showImage()).toBe(false);

    button.click();
    fixture.detectChanges();

    expect(component.showImage()).toBe(true);
  });

  it('should toggle images when the button is clicked', () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');

    expect(component.showImage()).toBe(false);

    button.click();
    fixture.detectChanges();

    expect(component.showImage()).toBe(true);
  });

  it('should hide the table when there are no products', () => {
    // Arrange
    component.products.set([]);
    fixture.detectChanges();

    // Assert
    expect(fixture.nativeElement.querySelector('table')).toBeNull();
    expect(fixture.nativeElement.textContent).toContain('No products found.');
  });
});
