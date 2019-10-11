import { readFileSync } from 'fs';
import { join } from 'path';

import matrixParsaer from '../matrix';

test('textParser', () => {
  const text = readFileSync(join(__dirname, 'matrix.tsv'), 'utf8');
  matrixParsaer(text);
  expect(true).toBe(true);
});
