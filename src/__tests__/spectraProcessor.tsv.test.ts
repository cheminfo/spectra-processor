import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';
import { expect, test } from 'vitest';

import { SpectraProcessor } from '../SpectraProcessor.ts';

expect.extend({ toBeDeepCloseTo });

test('Parse normalized matrix text', () => {
  const normalizedTSV = readFileSync(
    join(import.meta.dirname, 'normalized.tsv'),
    'utf8',
  );
  const spectraProcessor = SpectraProcessor.fromNormalizedMatrix(normalizedTSV);

  expect(spectraProcessor.getMemoryInfo().keepOriginal).toBe(false);

  const newNormalizedTSV = spectraProcessor.getNormalizedText();

  expect(normalizedTSV).toBe(newNormalizedTSV);
});
