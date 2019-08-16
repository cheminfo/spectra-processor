import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

import { SpectraProcessor } from '../SpectraProcessor';

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
    expect(normalized).toMatchSnapshot();

    expect(() => {
      spectraProcessor.setNormalization({
        from: 1000,
        to: 2600,
        numberOfPoints: 16,
        applySNV: true
      });
    }).toThrow('Missing original data.');
  });

  it('test basic case', () => {
    let spectraProcessor = new SpectraProcessor({
      normalization: {
        from: 0,
        to: 3,
        numberOfPoints: 4
      }
    });

    spectraProcessor.addFromData(
      { x: [0, 1, 2, 3], y: [1, 2, 3, 4] },
      { id: 1 }
    );
    spectraProcessor.addFromData(
      { x: [0, 1, 2, 3], y: [2, 3, 4, 5] },
      { id: 2 }
    );
    spectraProcessor.addFromData(
      { x: [0, 1, 2, 3], y: [3, 4, 5, 6] },
      { id: 3 }
    );

    let relativeData = spectraProcessor.getRelativeChart(2).data;
    expect(relativeData[0].y).toStrictEqual([-0.875, -1, -1, -0.875]);
    expect(relativeData[1].y).toStrictEqual([0, 0, 0, 0]);
    expect(relativeData[2].y).toStrictEqual([0.875, 1, 1, 0.875]);

    let scaledData = spectraProcessor.getScaledChart(1, 1).data;
    expect(scaledData[0].y).toStrictEqual([1.5, 3, 4.5, 5.0625]);
    expect(scaledData[1].y).toStrictEqual([1.875, 3, 4, 4.25]);
    expect(scaledData[2].y).toStrictEqual([2.0625, 3, 3.75, 3.84375]);
  });
});
