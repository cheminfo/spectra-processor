import { readFileSync, readdirSync, writeFileSync } from 'fs';
import { join } from 'path';

import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';

import { SpectraProcessor } from '../SpectraProcessor';

expect.extend({ toBeDeepCloseTo });

const testFilesDir = '../../testFiles/xtc';

describe('SpectraProcessor', () => {
  it('Load set of data', () => {
    let files = readdirSync(join(__dirname, testFilesDir)).filter((file) =>
      file.match(/0140|0189|0235/),
    );
    let spectraProcessor = new SpectraProcessor();
    spectraProcessor.setNormalization({
      from: 1000,
      to: 2600,
      numberOfPoints: 16,
      filters: [{ name: 'centerMean' }, { name: 'scaleSD' }],
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
      ids: ['0140_1a.jdx', '0140_1b.jdx', '0140_1c.jdx', 'asdf'],
    });
    expect(normalizedSelection.ids).toHaveLength(3);
    expect(normalizedSelection.matrix[0]).toHaveLength(16);

    expect(normalized).toMatchSnapshot();

    let normalizedTSV = spectraProcessor.getNormalizedText();
    expect(normalizedTSV).toHaveLength(15431);
    expect(normalizedTSV).toMatchSnapshot();
    writeFileSync(`${__dirname}/normalized.tsv`, normalizedTSV);

    spectraProcessor.removeOriginals();

    expect(() => {
      spectraProcessor.setNormalization({
        from: 1000,
        to: 2600,
        numberOfPoints: 16,
        applySNV: true,
      });
    }).toThrow(
      'getNormalized: Can not get normalized data, missing original data',
    );

    expect(spectraProcessor.getIDs()).toStrictEqual([
      '0140_1a.jdx',
      '0140_1b.jdx',
      '0140_1c.jdx',
      '0140_1d.jdx',
      '0140_1e.jdx',
      '0140_2a.jdx',
      '0140_2b.jdx',
      '0140_2c.jdx',
      '0140_2d.jdx',
      '0140_2e.jdx',
      '0140_3a.jdx',
      '0140_3b.jdx',
      '0140_3c.jdx',
      '0140_3d.jdx',
      '0140_3e.jdx',
      '0189_1a.jdx',
      '0189_1b.jdx',
      '0189_1c.jdx',
      '0189_1d.jdx',
      '0189_1e.jdx',
      '0189_2a.jdx',
      '0189_2b.jdx',
      '0189_2c.jdx',
      '0189_2d.jdx',
      '0189_2e.jdx',
      '0189_3a.jdx',
      '0189_3b.jdx',
      '0189_3c.jdx',
      '0189_3d.jdx',
      '0189_3e.jdx',
      '0235_1a.jdx',
      '0235_1b.jdx',
      '0235_1c.jdx',
      '0235_1d.jdx',
      '0235_1e.jdx',
      '0235_2a.jdx',
      '0235_2b.jdx',
      '0235_2c.jdx',
      '0235_2d.jdx',
      '0235_2e.jdx',
      '0235_3a.jdx',
      '0235_3b.jdx',
      '0235_3c.jdx',
      '0235_3d.jdx',
      '0235_3e.jdx',
    ]);

    expect(
      spectraProcessor.getMetadata({
        ids: [
          '0140_1a.jdx',
          '0140_1b.jdx',
          '0140_1c.jdx',
          '0140_1d.jdx',
          '0140_1e.jdx',
        ],
      }),
    ).toStrictEqual([
      { TITLE: 'Z140a_1_a' },
      { TITLE: 'Z140a_1_b' },
      { TITLE: 'Z140a_1_c' },
      { TITLE: 'Z140a_1_d' },
      { TITLE: 'Z140a_1_e' },
    ]);

    expect(
      spectraProcessor.getClassesAsNumber({
        ids: [
          '0140_1a.jdx',
          '0140_1b.jdx',
          '0140_1c.jdx',
          '0140_1d.jdx',
          '0140_1e.jdx',
        ],
      }),
    ).toStrictEqual([0, 0, 0, 0, 0]);

    expect(
      spectraProcessor.getClassesAsNumber({
        ids: [
          '0140_1a.jdx',
          '0140_1b.jdx',
          '0140_1c.jdx',
          '0140_1d.jdx',
          '0140_1e.jdx',
        ],
        propertyName: 'TITLE',
      }),
    ).toStrictEqual([0, 1, 2, 3, 4]);

    expect(
      spectraProcessor.getClasses({
        ids: [
          '0140_1a.jdx',
          '0140_1b.jdx',
          '0140_1c.jdx',
          '0140_1d.jdx',
          '0140_1e.jdx',
        ],
        propertyName: 'TITLE',
      }),
    ).toStrictEqual([
      'Z140a_1_a',
      'Z140a_1_b',
      'Z140a_1_c',
      'Z140a_1_d',
      'Z140a_1_e',
    ]);
  });

  it('test getPostProcesseddData', () => {
    let spectraProcessor = getSimpleDataProcessor();

    let scaled = spectraProcessor.getPostProcessedData({
      scale: { range: { from: 0.9, to: 2.1 } },
    });

    expect(scaled.matrix).toStrictEqual([
      [1, 2, 3, 3.375],
      [1.875, 3, 4, 4.25],
      [2.75, 4, 5, 5.125],
    ]);
  });

  it('test getPostProcesseddData undefined method, relative', () => {
    let spectraProcessor = getSimpleDataProcessor();

    let scaled = spectraProcessor.getPostProcessedData({
      scale: { range: { from: 0.9, to: 2.1 }, relative: true },
    });
    expect(scaled.matrix).toStrictEqual([
      [0, 0, 0, 0],
      [0.875, 1, 1, 0.875],
      [1.75, 2, 2, 1.75],
    ]);
  });

  it('test getPostProcesseddData minMax method, relative', () => {
    let spectraProcessor = getSimpleDataProcessor();

    let scaled = spectraProcessor.getPostProcessedData({
      scale: {
        range: { from: 0.9, to: 2.1 },
        method: 'minMax',
        relative: true,
      },
    });

    expect(scaled.matrix).toStrictEqual([
      [0, 0, 0, 0],
      [-0.125, 0, 0, -0.125],
      [-0.25, 0, 0, -0.25],
    ]);
  });

  it('test getPostProcessedChart minMax and relative', () => {
    let spectraProcessor = getSimpleDataProcessor();

    let spectra = spectraProcessor.getPostProcessedChart({
      scale: {
        range: { from: 0.9, to: 2.1 },
        method: 'minMax',
        relative: true,
      },
    });

    expect(spectra).toMatchSnapshot();
  });

  it('test getNormalizedData of non uniform data', () => {
    let spectraProcessor = getNonUniformDataProcessor();

    let spectra = spectraProcessor.getNormalizedData();
    expect(spectra).toMatchSnapshot();
  });

  it('test getMinMaxX of non uniform data', () => {
    let spectraProcessor = getNonUniformDataProcessor();

    let minMaxX = spectraProcessor.getMinMaxX();
    expect(minMaxX).toStrictEqual({ min: 0, max: 5 });
  });

  it('test getNormalizedMinMaxX of non uniform data', () => {
    let spectraProcessor = getLogSpectra();

    let boundary = spectraProcessor.getNormalizedCommonBoundary();
    expect(boundary).toStrictEqual({
      x: { min: -1, max: 1 },
      y: { min: 1, max: 5 },
    });
  });
});

function getSimpleDataProcessor() {
  const spectraProcessor = new SpectraProcessor({
    normalization: {
      from: 0,
      to: 3,
      numberOfPoints: 4,
    },
  });

  spectraProcessor.addFromData({ x: [0, 1, 2, 3], y: [1, 2, 3, 4] }, { id: 1 });
  spectraProcessor.addFromData({ x: [0, 1, 2, 3], y: [2, 3, 4, 5] }, { id: 2 });
  spectraProcessor.addFromData({ x: [0, 1, 2, 3], y: [3, 4, 5, 6] }, { id: 3 });
  return spectraProcessor;
}

function getNonUniformDataProcessor() {
  const spectraProcessor = new SpectraProcessor({
    normalization: {
      from: 0,
      to: 5,
      numberOfPoints: 6,
    },
  });

  spectraProcessor.addFromData({ x: [0, 1, 2, 4], y: [1, 2, 3, 4] }, { id: 1 });
  spectraProcessor.addFromData({ x: [0, 1, 2, 5], y: [2, 3, 4, 5] }, { id: 2 });
  spectraProcessor.addFromData({ x: [0, 1, 2, 3], y: [3, 4, 5, 6] }, { id: 3 });
  return spectraProcessor;
}

function getLogSpectra() {
  const spectraProcessor = new SpectraProcessor({
    normalization: {
      from: 0,
      to: 5,
      numberOfPoints: 4,
      filters: [{ name: 'xFunction', options: { function: 'log10(x)' } }],
    },
  });

  spectraProcessor.addFromData(
    { x: [0.01, 1, 2, 10], y: [1, 2, 3, 4] },
    { id: 1 },
  );
  spectraProcessor.addFromData(
    { x: [0.1, 1, 2, 100], y: [2, 3, 4, 5] },
    { id: 2 },
  );

  return spectraProcessor;
}
