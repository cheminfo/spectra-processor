import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import matrixParser from '../parseMatrix.js';

describe('matrix', () => {
  it('small tsv', () => {
    const text = readFileSync(join(__dirname, 'matrix.tsv'), 'utf8');
    const result = matrixParser(text);

    expect(result.matrix).toHaveLength(4);
    expect(result.matrix[0]).toHaveLength(4);
    expect(result.ids).toHaveLength(4);
    expect(result.x).toHaveLength(4);
  });

  it('larger tsv', () => {
    const text = readFileSync(join(__dirname, 'matrix2.tsv'), 'utf8');
    const result = matrixParser(text);

    expect(result.matrix).toHaveLength(3080);
    expect(result.matrix[0]).toHaveLength(125);
    expect(result.ids).toHaveLength(3080);
    expect(result.x).toHaveLength(125);
  });
});
