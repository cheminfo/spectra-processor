import { expect, test } from 'vitest';

import { getNormalizedData } from '../getNormalizedData';

test('getNormalizedData', () => {
  let spectra = [
    {
      normalized: {
        x: [10, 20, 30],
        y: [1, 2, 3],
      },
    },
    {
      normalized: {
        x: [10, 20, 30],
        y: [2, 3, 4],
      },
    },
    {
      normalized: {
        x: [10, 20, 30],
        y: [3, 4, 5],
      },
    },
    {
      normalized: {
        x: [10, 20, 30],
        y: [4, 5, 6],
      },
    },
    {
      normalized: {
        x: [10, 20, 30],
        y: [6, 7, 8],
      },
    },
  ];

  let normalizedData = getNormalizedData(spectra);

  expect(normalizedData).toStrictEqual({
    ids: [undefined, undefined, undefined, undefined, undefined],
    matrix: [
      [1, 2, 3],
      [2, 3, 4],
      [3, 4, 5],
      [4, 5, 6],
      [6, 7, 8],
    ],
    meta: [undefined, undefined, undefined, undefined, undefined],
    x: [10, 20, 30],
  });
});
