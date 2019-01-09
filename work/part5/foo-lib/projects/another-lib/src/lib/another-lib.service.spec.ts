import { TestBed } from '@angular/core/testing';

import { AnotherLibService } from './another-lib.service';

describe('AnotherLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnotherLibService = TestBed.get(AnotherLibService);
    expect(service).toBeTruthy();
  });
});
