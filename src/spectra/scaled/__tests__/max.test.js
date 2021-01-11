import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';

expect.extend({ toBeDeepCloseTo });

const { max } = require('../max');

test('recale max', () => {
  let matrix = [
    [1, 2, 3, 4],
    [2, 3, 4, 5],
    [3, 4, 5, 6],
  ];

  let normalizedTarget = { x: [0, 1, 2, 3], y: [1, 2, 3, 4] };

  max(matrix, normalizedTarget, {
    from: 0.9,
    to: 2.1,
  });

  matrix = matrix.map((row) => Array.from(row));

  expect(matrix).toBeDeepCloseTo(
    [
      [1, 2, 3, 4],
      [1.5, 2.25, 3, 3.75],
      [1.8, 2.4, 3, 3.6],
    ],
    3,
  );
});
