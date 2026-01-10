import { expect, test } from 'vitest';

import { getCategoriesStats } from '../getCategoriesStats.ts';

test('getCategoriesStats', () => {
  const metadata = [
    {
      category: 'A',
    },
    {
      category: 'B',
    },
    {
      category: 'A',
    },
  ];

  const result = getCategoriesStats(metadata);

  expect(result).toStrictEqual({
    A: { classNumber: 0, counter: 2 },
    B: { classNumber: 1, counter: 1 },
  });
});
