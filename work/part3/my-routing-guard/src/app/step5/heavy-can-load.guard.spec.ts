import { TestBed, async, inject } from '@angular/core/testing';

import { HeavyCanLoadGuard } from './heavy-can-load.guard';

describe('HeavyCanLoadGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeavyCanLoadGuard]
    });
  });

  it('should ...', inject([HeavyCanLoadGuard], (guard: HeavyCanLoadGuard) => {
    expect(guard).toBeTruthy();
  }));
});
