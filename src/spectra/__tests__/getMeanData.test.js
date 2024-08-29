import { toBeDeepCloseTo, toMatchCloseTo } from 'jest-matcher-deep-close-to';
import { describe, it, expect } from 'vitest';

import { getMeanData } from '../getMeanData';

expect.extend({ toBeDeepCloseTo, toMatchCloseTo });

let normalized = {
  x: [1, 2],
  matrix: [
    [1, 3],
    [2, 2],
    [3, 1],
  ],
};

describe('getMeanData', () => {
  it('Simple dataset', () => {
    let result = getMeanData(normalized, 0);
    expect(result.x).toStrictEqual([1, 2]);
    expect(result.y).toStrictEqual([2, 2]);
  });
});
