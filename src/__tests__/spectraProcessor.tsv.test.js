import { readFileSync, writeFileSync, write } from 'fs';
import { join } from 'path';

import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';

import { SpectraProcessor } from '../SpectraProcessor';

expect.extend({ toBeDeepCloseTo });

describe('SpectraProcessor text', () => {
  it('Parse normalized matrix text', () => {
    const normalizedTSV = readFileSync(
      join(__dirname, 'normalized.tsv'),
      'utf8'
    );
    const spectraProcessor = SpectraProcessor.fromNormalizedText(normalizedTSV);
    const newNormalizedTSV = spectraProcessor.getNormalizedTSV();
    expect(normalizedTSV).toBe(newNormalizedTSV);
  });
});
