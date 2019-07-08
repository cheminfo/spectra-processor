import { readFileSync } from 'fs';
import { join } from 'path';

import { fromText } from '../..';
import { Spectrum } from '../Spectrum';

test('Test load / save json', () => {
  let text = readFileSync(
    join(__dirname, '../../../testFiles/simple.txt'),
    'utf8'
  );
  let spectrum = fromText(text);
  let json = spectrum.toJSON();

  expect(json).toStrictEqual({
    peaks: [],
    wavelength: [1, 2, 3],
    transmittance: [2, 3, 2]
  });
  let spectrum2 = new Spectrum(json);
  let json2 = spectrum2.toJSON();
  expect(json).toStrictEqual(json2);
});
