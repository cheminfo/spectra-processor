import { expect, test } from 'vitest';

import { getClasses } from '../getClasses.ts';

test('getClasses', () => {
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

  const result = getClasses(metadata);

  expect(result).toStrictEqual([0, 1, 0]);
});
