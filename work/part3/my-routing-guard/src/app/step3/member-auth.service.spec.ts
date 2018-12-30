import { TestBed } from '@angular/core/testing';

import { MemberAuthService } from './member-auth.service';

describe('MemberAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MemberAuthService = TestBed.get(MemberAuthService);
    expect(service).toBeTruthy();
  });
});
