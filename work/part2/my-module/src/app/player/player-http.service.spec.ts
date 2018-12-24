import { TestBed } from '@angular/core/testing';

import { PlayerHttpService } from './player-http.service';

describe('PlayerHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlayerHttpService = TestBed.get(PlayerHttpService);
    expect(service).toBeTruthy();
  });
});
