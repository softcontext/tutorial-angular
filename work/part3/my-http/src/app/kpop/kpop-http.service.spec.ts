import { TestBed } from '@angular/core/testing';

import { KpopHttpService } from './kpop-http.service';

describe('KpopHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KpopHttpService = TestBed.get(KpopHttpService);
    expect(service).toBeTruthy();
  });
});
