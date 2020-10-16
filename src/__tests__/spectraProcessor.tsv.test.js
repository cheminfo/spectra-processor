import { readFileSync } from 'fs';
import { join } from 'path';

import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';

import { SpectraProcessor } from '../SpectraProcessor';

expect.extend({ toBeDeepCloseTo });

describe('SpectraProcessor text', () => {
  it('Parse normalized matrix text', () => {
    const normalizedTSV = readFileSync(
      join(__dirname, 'normalized.tsv'),
      'utf8',
    );
    const spectraProcessor = SpectraProcessor.fromNormalizedMatrix(
      normalizedTSV,
    );
    expect(spectraProcessor.getMemoryInfo().keepOriginal).toBe(false);
    const newNormalizedTSV = spectraProcessor.getNormalizedText();
    expect(normalizedTSV).toBe(newNormalizedTSV);
  });
});
