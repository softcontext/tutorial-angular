import { TestBed } from '@angular/core/testing';

import { FooLibService } from './foo-lib.service';

describe('FooLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FooLibService = TestBed.get(FooLibService);
    expect(service).toBeTruthy();
  });
});
