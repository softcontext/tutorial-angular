import { TestBed, async, inject } from '@angular/core/testing';

import { DataResolveGuard } from './data-resolve.guard';

describe('DataResolveGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataResolveGuard]
    });
  });

  it('should ...', inject([DataResolveGuard], (guard: DataResolveGuard) => {
    expect(guard).toBeTruthy();
  }));
});
