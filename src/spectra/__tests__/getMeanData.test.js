import { toBeDeepCloseTo, toMatchCloseTo } from 'jest-matcher-deep-close-to';
import { expect, test } from 'vitest';

import { getMeanData } from '../getMeanData.js';

expect.extend({ toBeDeepCloseTo, toMatchCloseTo });

test('Simple dataset', () => {
  let normalized = {
    x: [1, 2],
    matrix: [
      [1, 3],
      [2, 2],
      [3, 1],
    ],
  };
  let result = getMeanData(normalized, 0);

  expect(result.x).toStrictEqual([1, 2]);
  expect(result.y).toStrictEqual([2, 2]);
});
