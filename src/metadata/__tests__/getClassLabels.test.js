import { expect, test } from 'vitest';

import { getClassLabels } from '../getClassLabels.js';

test('getClassLabels', () => {
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

  let result = getClassLabels(metadata);

  expect(result).toStrictEqual(['A', 'B', 'A']);
});
