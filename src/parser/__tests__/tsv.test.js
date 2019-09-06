import { readFileSync } from 'fs';
import { join } from 'path';

import textParser from '../text';

test('textParser', () => {
  const text = readFileSync(join(__dirname, 'data.tsv'), 'utf8');
  textParser(text);
  expect(true).toBe(true);
});
