import { toBeDeepCloseTo, toMatchCloseTo } from 'jest-matcher-deep-close-to';
expect.extend({ toBeDeepCloseTo, toMatchCloseTo });

import { getAutocorrelation } from '../getAutocorrelation';

let normalized = {
  x: [1, 2, 3],
  matrix: [[1, 3], [2, 2], [3, 1]]
};

describe('getAutocorrelation', () => {
  it('Simple dataset', () => {
    let result = getAutocorrelation(normalized, 0);
    expect(result.x).toEqual([1, 2, 3]);
    expect(result.y).toBeDeepCloseTo([1, -1], 5);

    result = getAutocorrelation(normalized, 1);
    expect(result.x).toEqual([1, 2, 3]);
    expect(result.y).toBeDeepCloseTo([-1, 1], 5);
  });
});
