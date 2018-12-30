import { TestBed, async, inject } from '@angular/core/testing';

import { MemberOnlyCanActivateGuard } from './member-only-can-activate.guard';

describe('MemberOnlyCanActivateGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MemberOnlyCanActivateGuard]
    });
  });

  it('should ...', inject([MemberOnlyCanActivateGuard], (guard: MemberOnlyCanActivateGuard) => {
    expect(guard).toBeTruthy();
  }));
});
