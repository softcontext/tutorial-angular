import { TestBed } from '@angular/core/testing';

import { EmpHttpService } from './emp-http.service';

describe('EmpHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmpHttpService = TestBed.get(EmpHttpService);
    expect(service).toBeTruthy();
  });
});
