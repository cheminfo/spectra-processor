import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { test, expect } from 'vitest';

import textParser from '../parseText';

test('textParser', () => {
  const text = readFileSync(join(__dirname, './data.txt'), 'utf8');
  const spectrum = textParser(text, {
    parserOptions: { xColumn: 1, yColumn: 2 },
  });
  expect(spectrum).toStrictEqual({ data: { x: [2, 5], y: [3, 6] } });
});
