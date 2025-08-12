import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';
import { expect, test } from 'vitest';

import { integration } from '../integration';

expect.extend({ toBeDeepCloseTo });

test('recale integration', () => {
  let matrix = [
    [1, 2, 3, 4],
    [2, 3, 4, 5],
    [3, 4, 5, 6],
  ];

  let normalizedTarget = { x: [0, 1, 2, 3], y: [2, 3, 4, 5] };

  integration(matrix, normalizedTarget, {
    from: 0.9,
    to: 2.1,
  });

  matrix = matrix.map((row) => Array.from(row));

  expect(matrix).toBeDeepCloseTo(
    [
      [1.4, 2.8, 4.2, 5.6],
      [2, 3, 4, 5],
      [2.33, 3.11, 3.89, 4.67],
    ],
    2,
  );
});
