import { expect, test } from 'vitest';

import { getClassLabels } from '../getClassLabels.ts';

test('getClassLabels', () => {
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

  const result = getClassLabels(metadata);

  expect(result).toStrictEqual(['A', 'B', 'A']);
});
