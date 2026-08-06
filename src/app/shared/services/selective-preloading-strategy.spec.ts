import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { SelectivePreloadingStrategy } from './selective-preloading-strategy';

describe('SelectivePreloadingStrategy', () => {
  let service: SelectivePreloadingStrategy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectivePreloadingStrategy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should preload routes marked with preload=true', () => {
    const load = vi.fn(() => of('loaded'));

    let result: unknown;
    service.preload({ data: { preload: true } }, load).subscribe(value => {
      result = value;
    });

    expect(load).toHaveBeenCalledTimes(1);
    expect(result).toBe('loaded');
  });

  it('should skip routes without preload=true', () => {
    const load = vi.fn(() => of('loaded'));

    let result: unknown;
    service.preload({ data: {} }, load).subscribe(value => {
      result = value;
    });

    expect(load).not.toHaveBeenCalled();
    expect(result).toBeNull();
  });
});
