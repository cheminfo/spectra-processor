import { expect, test } from 'vitest';

import { getTrackAnnotation } from '../getTrackAnnotation.ts';

test('check jsgraph annotations', () => {
  const spectra = [
    {
      normalized: {
        x: [10, 20, 30],
        y: [1, 2, 3],
      },
      meta: {
        color: 'red',
      },
      id: 1,
    },
    {
      normalized: {
        x: [10, 20, 30],
        y: [2, 3, 4],
      },
      meta: {
        color: 'green',
      },
      id: 2,
    },
  ];
  // @ts-expect-error not full object but just for testing
  const result = getTrackAnnotation(spectra, 1);

  expect(result).toMatchSnapshot();
});
