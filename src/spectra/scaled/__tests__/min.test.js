import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';
import { test, expect } from 'vitest';

import { min } from '../min';

expect.extend({ toBeDeepCloseTo });

test('recale min', () => {
  let matrix = [
    [1, 2, 3, 4],
    [2, 3, 4, 5],
    [3, 4, 5, 6],
  ];

  let normalizedTarget = { x: [0, 1, 2, 3], y: [1, 2, 3, 4] };

  min(matrix, normalizedTarget, {
    from: 0.9,
    to: 2.1,
  });

  matrix = matrix.map((row) => Array.from(row));

  expect(matrix).toBeDeepCloseTo(
    [
      [1, 2, 3, 4],
      [1.33, 2, 2.67, 3.33],
      [1.5, 2, 2.5, 3],
    ],
    2,
  );
});
