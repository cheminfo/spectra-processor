import { toBeDeepCloseTo, toMatchCloseTo } from 'jest-matcher-deep-close-to';
import { expect, test } from 'vitest';

import { getAutocorrelation } from '../getAutocorrelation.js';

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

  let result = getAutocorrelation(normalized, 0);

  expect(result.x).toStrictEqual([1, 2]);
  expect(result.y).toBeDeepCloseTo([1, -1], 5);

  result = getAutocorrelation(normalized, 1);

  expect(result.x).toStrictEqual([1, 2]);
  expect(result.y).toBeDeepCloseTo([-1, 1], 5);
});
