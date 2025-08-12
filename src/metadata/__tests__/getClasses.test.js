import { expect, test } from 'vitest';

import { getClasses } from '../getClasses';

test('getClasses', () => {
  let metadata = [
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

  let result = getClasses(metadata);

  expect(result).toStrictEqual([0, 1, 0]);
});
