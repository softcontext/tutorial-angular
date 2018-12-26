import { TestBed } from '@angular/core/testing';

import { EventBridgeService } from './event-bridge.service';

describe('EventBridgeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventBridgeService = TestBed.get(EventBridgeService);
    expect(service).toBeTruthy();
  });
});
