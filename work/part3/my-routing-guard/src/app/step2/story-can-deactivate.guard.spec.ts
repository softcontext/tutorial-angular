import { TestBed, async, inject } from '@angular/core/testing';

import { StoryCanDeactivateGuard } from './story-can-deactivate.guard';

describe('StoryCanDeactivateGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoryCanDeactivateGuard]
    });
  });

  it('should ...', inject([StoryCanDeactivateGuard], (guard: StoryCanDeactivateGuard) => {
    expect(guard).toBeTruthy();
  }));
});
