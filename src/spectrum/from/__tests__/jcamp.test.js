import { readFileSync } from 'fs';
import { join } from 'path';

import { fromJcamp } from '../jcamp';

test('fromJcamp absorbance', () => {
  const path = join(__dirname, '../../../../testFiles/absorbance.jdx');
  const jcamp = readFileSync(path, 'utf8');
  const spectrum = fromJcamp(jcamp, 'test');
  expect(spectrum.data.x).toHaveLength(1738);
  expect(spectrum.data.y).toHaveLength(1738);
  expect(spectrum.id).toBe('test');
});

test('fromJcamp transmittance', () => {
  const path = join(__dirname, '../../../testFiles/transmittance1.jdx');
  const jcamp = readFileSync(path, 'utf8');
  const spectrum = fromJcamp(jcamp);
  expect(spectrum.wavelength).toHaveLength(1991);
  expect(spectrum.absorbance).toHaveLength(1991);
  expect(spectrum.transmittance).toHaveLength(1991);
});
