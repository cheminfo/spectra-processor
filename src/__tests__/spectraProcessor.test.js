import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

import { SpectraProcessor } from '../SpectraProcessor';

const testFilesDir = '../../testFiles/xtc';
test('Load set of data', () => {
  let files = readdirSync(join(__dirname, testFilesDir)).filter((file) =>
    file.match(/0140|0189|0235/)
  );
  let spectraProcessor = new SpectraProcessor();
  spectraProcessor.setNormalizationFilter({
    from: 1000,
    to: 2600,
    numberOfPoints: 16,
    processes: [{ kind: 'centerMean' }, { kind: 'scaleSD' }]
  });
  for (let file of files) {
    let jcamp = readFileSync(join(__dirname, testFilesDir, file), 'utf8');
    spectraProcessor.addFromJcamp(jcamp, file, {});
  }

  expect(spectraProcessor.spectra).toHaveLength(45);
  let normalized = spectraProcessor.getNormalizedData();
  expect(normalized.ids).toHaveLength(45);
  expect(normalized.matrix[0]).toHaveLength(16);
  expect(normalized).toMatchSnapshot();

  expect(() => {
    spectraProcessor.setNormalizationFilter({
      from: 1000,
      to: 2600,
      numberOfPoints: 16,
      applySNV: true
    });
  }).toThrow('missing original data');
});
