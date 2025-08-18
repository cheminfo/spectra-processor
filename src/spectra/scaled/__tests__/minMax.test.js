import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';
import { expect, test } from 'vitest';

import { minMax } from '../minMax.js';

expect.extend({ toBeDeepCloseTo });

test('recale minMax', () => {
  let matrix = [
    [1, 2, 3, 4],
    [2, 3, 4, 5],
    [2, 4, 6, 8],
    [3, 5, 7, 9],
  ];

  let normalizedTarget = { x: [0, 1, 2, 3], y: [1, 2, 3, 4] };

  minMax(matrix, normalizedTarget, { from: 0.9, to: 2.1 });

  matrix = matrix.map((row) => Array.from(row));

  expect(matrix).toBeDeepCloseTo(
    [
      [1, 2, 3, 4],
      [1, 2, 3, 4],
      [1, 2, 3, 4],
      [1, 2, 3, 4],
    ],
    2,
  );
});
