import { SanitizeResourceUrlPipe } from './sanitize-resource-url.pipe';

describe('SanitizeResourceUrlPipe', () => {
  it('create an instance', () => {
    const pipe = new SanitizeResourceUrlPipe();
    expect(pipe).toBeTruthy();
  });
});
