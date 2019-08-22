import { readFileSync } from 'fs';
import { join } from 'path';

import tsvParser from '../tsv';

test('tsvParser', () => {
  const text = readFileSync(join(__dirname, 'data.tsv'), 'utf8');
  const data = tsvParser(text);

  console.log(data);
});
