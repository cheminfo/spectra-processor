import { toBeDeepCloseTo, toMatchCloseTo } from 'jest-matcher-deep-close-to';
import { describe, it, expect } from 'vitest';

import { getAutocorrelation } from '../getAutocorrelation';

expect.extend({ toBeDeepCloseTo, toMatchCloseTo });

let normalized = {
  x: [1, 2],
  matrix: [
    [1, 3],
    [2, 2],
    [3, 1],
  ],
};

describe('getAutocorrelation', () => {
  it('Simple dataset', () => {
    let result = getAutocorrelation(normalized, 0);
    expect(result.x).toStrictEqual([1, 2]);
    expect(result.y).toBeDeepCloseTo([1, -1], 5);

    result = getAutocorrelation(normalized, 1);
    expect(result.x).toStrictEqual([1, 2]);
    expect(result.y).toBeDeepCloseTo([-1, 1], 5);
  });
});
