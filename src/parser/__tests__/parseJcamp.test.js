import { readFileSync } from 'fs';
import { join } from 'path';

import parseJcamp from '../parseJcamp';

test('parseJcamp absorbance', () => {
  const path = join(__dirname, '../../../testFiles/absorbance.jdx');
  const jcamp = readFileSync(path);
  const spectra = parseJcamp(jcamp);
  const spectrum = spectra[0];
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

test('parseJcamp transmittance', () => {
  const path = join(__dirname, '../../../testFiles/transmittance1.jdx');
  const jcamp = readFileSync(path);
  const spectrum = parseJcamp(jcamp)[0];
  expect(spectrum.data.x).toHaveLength(1991);
  expect(spectrum.data.x).toHaveLength(1991);
});
