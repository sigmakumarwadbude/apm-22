import { ConvertToSpacesPipe } from './convert-to-spaces-pipe';

describe(ConvertToSpacesPipe.name, () => {
  let pipe: ConvertToSpacesPipe;

  beforeEach(() => {
    pipe = new ConvertToSpacesPipe();
  });

  it('should replace hyphens with spaces', () => {
    expect(pipe.transform('GDN-0011')).toBe('GDN 0011');
  });

  it('should replace the specified character', () => {
    expect(pipe.transform('ABC_123', '_')).toBe('ABC 123');
  });

  it('should return an empty string for empty input', () => {
    expect(pipe.transform('')).toBe('');
  });
});