import { readFileSync, readdirSync, writeFileSync } from 'fs';
import { join } from 'path';

import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';

import { SpectraProcessor } from '../SpectraProcessor';

expect.extend({ toBeDeepCloseTo });

const testFilesDir = '../../testFiles/xtc';

describe('SpectraProcessor', () => {
  it('Load set of data', () => {
    let files = readdirSync(join(__dirname, testFilesDir)).filter((file) =>
      file.match(/0140|0189|0235/)
    );
    let spectraProcessor = new SpectraProcessor();
    spectraProcessor.setNormalization({
      from: 1000,
      to: 2600,
      numberOfPoints: 16,
      filters: [{ name: 'centerMean' }, { name: 'scaleSD' }]
    });
    for (let file of files) {
      let jcamp = readFileSync(join(__dirname, testFilesDir, file), 'utf8');
      spectraProcessor.addFromJcamp(jcamp, { id: file });
    }

    expect(spectraProcessor.spectra).toHaveLength(45);
    let normalized = spectraProcessor.getNormalizedData();
    expect(normalized.ids).toHaveLength(45);
    expect(normalized.matrix[0]).toHaveLength(16);
    let normalizedSelection = spectraProcessor.getNormalizedData({
      ids: ['0140_1a.jdx', '0140_1b.jdx', '0140_1c.jdx', 'asdf']
    });
    expect(normalizedSelection.ids).toHaveLength(3);
    expect(normalizedSelection.matrix[0]).toHaveLength(16);

    expect(normalized).toMatchSnapshot();

    let normalizedTSV = spectraProcessor.getNormalizedText();
    expect(normalizedTSV).toHaveLength(15421);
    expect(normalizedTSV).toMatchSnapshot();
    writeFileSync(`${__dirname}/normalized.tsv`, normalizedTSV);

    spectraProcessor.removeOriginals();

    expect(() => {
      spectraProcessor.setNormalization({
        from: 1000,
        to: 2600,
        numberOfPoints: 16,
        applySNV: true
      });
    }).toThrow(
      'getNormalized: Can not get normalized data, missing original data'
    );
  });

  it('test getScaleddData undefined method', () => {
    let spectraProcessor = getSimpleDataProcessor();

    let scaled = spectraProcessor.getScaledData({
      range: { from: 0.9, to: 2.1 }
    });

    expect(scaled.matrix).toStrictEqual([
      [1, 2, 3, 3.375],
      [1.875, 3, 4, 4.25],
      [2.75, 4, 5, 5.125]
    ]);
  });

  it('test getScaleddData undefined method, relative', () => {
    let spectraProcessor = getSimpleDataProcessor();

    let scaled = spectraProcessor.getScaledData({
      range: { from: 0.9, to: 2.1 },
      relative: true
    });
    expect(scaled.matrix).toStrictEqual([
      [0, 0, 0, 0],
      [0.875, 1, 1, 0.875],
      [1.75, 2, 2, 1.75]
    ]);
  });

  it('test getScaleddData minMax method, relative', () => {
    let spectraProcessor = getSimpleDataProcessor();

    let scaled = spectraProcessor.getScaledData({
      range: { from: 0.9, to: 2.1 },
      method: 'minMax',
      relative: true
    });

    expect(scaled.matrix).toStrictEqual([
      [0, 0, 0, 0],
      [-0.125, 0, 0, -0.125],
      [-0.25, 0, 0, -0.25]
    ]);
  });

  it('test getScaledChart minMax and relative', () => {
    let spectraProcessor = getSimpleDataProcessor();

    let spectra = spectraProcessor.getScaledChart({
      range: { from: 0.9, to: 2.1 },
      method: 'minMax',
      relative: true
    });

    expect(spectra).toMatchSnapshot();
  });
});

function getSimpleDataProcessor() {
  const spectraProcessor = new SpectraProcessor({
    normalization: {
      from: 0,
      to: 3,
      numberOfPoints: 4
    }
  });

  spectraProcessor.addFromData({ x: [0, 1, 2, 3], y: [1, 2, 3, 4] }, { id: 1 });
  spectraProcessor.addFromData({ x: [0, 1, 2, 3], y: [2, 3, 4, 5] }, { id: 2 });
  spectraProcessor.addFromData({ x: [0, 1, 2, 3], y: [3, 4, 5, 6] }, { id: 3 });
  return spectraProcessor;
}
