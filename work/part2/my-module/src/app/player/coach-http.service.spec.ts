import { TestBed } from '@angular/core/testing';

import { CoachHttpService } from './coach-http.service';

describe('CoachHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoachHttpService = TestBed.get(CoachHttpService);
    expect(service).toBeTruthy();
  });
});
