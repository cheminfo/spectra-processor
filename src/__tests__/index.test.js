import { SpectraProcessor, xFindClosestIndex } from '..';

describe('index', () => {
  it('contains right properties', () => {
    expect(SpectraProcessor).toBeInstanceOf(Function);
    expect(xFindClosestIndex).toBeInstanceOf(Function);
  });
});
