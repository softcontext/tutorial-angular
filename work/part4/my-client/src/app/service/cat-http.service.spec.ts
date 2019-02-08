import { TestBed } from '@angular/core/testing';

import { CatHttpService } from './cat-http.service';

describe('CatHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CatHttpService = TestBed.get(CatHttpService);
    expect(service).toBeTruthy();
  });
});
