import { readFileSync } from 'fs';
import { join } from 'path';

import jcampParser from '../jcamp';

test('fromJcamp absorbance', () => {
  const path = join(__dirname, '../../../testFiles/absorbance.jdx');
  const jcamp = readFileSync(path, 'utf8');
  const spectrum = jcampParser(jcamp, 'test');

  expect(spectrum.data.x).toHaveLength(1738);
  expect(spectrum.data.y).toHaveLength(1738);
  expect(spectrum.kind).toStrictEqual({
    normalization: {},
    kind: 'Infrared',
    display: {
      xLabel: 'wavelength [cm-1]',
      xInverted: true,
      yLabel: 'Absorbance'
    }
  });
});

test('fromJcamp transmittance', () => {
  const path = join(__dirname, '../../../testFiles/transmittance1.jdx');
  const jcamp = readFileSync(path, 'utf8');
  const spectrum = jcampParser(jcamp);
  expect(spectrum.data.x).toHaveLength(1991);
  expect(spectrum.data.x).toHaveLength(1991);
});
