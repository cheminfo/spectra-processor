import { expect, test } from 'vitest';

import { SpectraProcessor, xFindClosestIndex } from '../index.ts';

test('contains right properties', () => {
  expect(SpectraProcessor).toBeInstanceOf(Function);
  expect(xFindClosestIndex).toBeInstanceOf(Function);
});
