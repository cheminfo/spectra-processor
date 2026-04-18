import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { expect, test } from 'vitest';

import matrixParser from '../parseMatrix.ts';

test('small tsv', () => {
  const text = readFileSync(join(import.meta.dirname, 'matrix.tsv'), 'utf8');
  const result = matrixParser(text);

  expect(result.matrix).toHaveLength(4);
  expect(result.matrix[0]).toHaveLength(4);
  expect(result.ids).toHaveLength(4);
  expect(result.x).toHaveLength(4);
});

test('larger tsv', () => {
  const text = readFileSync(join(import.meta.dirname, 'matrix2.tsv'), 'utf8');
  const result = matrixParser(text);

  expect(result.matrix).toHaveLength(3080);
  expect(result.matrix[0]).toHaveLength(125);
  expect(result.ids).toHaveLength(3080);
  expect(result.x).toHaveLength(125);
});
