import { TestBed } from '@angular/core/testing';

import { DataHolderService } from './data-holder.service';

describe('DataHolderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataHolderService = TestBed.get(DataHolderService);
    expect(service).toBeTruthy();
  });
});
