import { toBeDeepCloseTo, toMatchCloseTo } from 'jest-matcher-deep-close-to';
expect.extend({ toBeDeepCloseTo, toMatchCloseTo });

import { getMeanData } from '../getMeanData';

let normalized = {
  x: [1, 2],
  matrix: [[1, 3], [2, 2], [3, 1]]
};

describe('getMeanData', () => {
  it('Simple dataset', () => {
    let result = getMeanData(normalized, 0);
    expect(result.x).toEqual([1, 2]);
    expect(result.y).toEqual([2, 2]);
  });
});
