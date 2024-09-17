import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { test, expect } from 'vitest';

import jcampParser from '../parseJcamp';

test('jcampParser absorbance', () => {
  const path = join(__dirname, '../../../testFiles/absorbance.jdx');
  const jcamp = readFileSync(path, 'utf8');
  const spectrum = jcampParser(jcamp);

  expect(spectrum.data.x).toHaveLength(1738);
  expect(spectrum.data.y).toHaveLength(1738);
  expect(spectrum.kind).toStrictEqual({
    normalization: {},
    kind: 'Infrared',
    display: {
      xLabel: 'wavelength [cm-1]',
      xInverted: true,
      yLabel: 'Absorbance',
    },
  });
});

test('jcampParser transmittance', () => {
  const path = join(__dirname, '../../../testFiles/transmittance1.jdx');
  const jcamp = readFileSync(path, 'utf8');
  const spectrum = jcampParser(jcamp);
  expect(spectrum.meta).toStrictEqual({
    'NIST SOURCE': 'COBLENTZ',
    'NIST IMAGE': 'cob3577',
  });
  expect(spectrum.data.x).toHaveLength(1991);
  expect(spectrum.data.x).toHaveLength(1991);
});
