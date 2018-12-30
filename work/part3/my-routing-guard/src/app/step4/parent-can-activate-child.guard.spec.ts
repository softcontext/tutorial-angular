import { TestBed, async, inject } from '@angular/core/testing';

import { ParentCanActivateChildGuard } from './parent-can-activate-child.guard';

describe('ParentCanActivateChildGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParentCanActivateChildGuard]
    });
  });

  it('should ...', inject([ParentCanActivateChildGuard], (guard: ParentCanActivateChildGuard) => {
    expect(guard).toBeTruthy();
  }));
});
