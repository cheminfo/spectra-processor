import getMax from 'ml-array-max';

import { SpectraProcessor } from '../SpectraProcessor';

describe('Align spectra', () => {
  it('The max of each array should match with the target', () => {
    const spectraProcessor = new SpectraProcessor({
      normalization: {
        from: 0,
        to: 11,
        numberOfPoints: 12,
      },
    });

    spectraProcessor.addFromData(
      {
        x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
        y: [0, 1, 2, 3, 4, 50, 600000000000, 50, 4, 3, 2, 1, 0, 0, 0],
      },
      { id: 1 },
    );
    spectraProcessor.addFromData(
      {
        x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
        y: [0, 1, 2, 3, 700000000000, 4, 50, 10, 10, 50, 4, 3, 2, 1, 0],
      },
      { id: 2 },
    );

    let options = {
      minMaxRatio: 0.4,
      realTopDetection: false,
      smoothY: true,
      sgOptions: {
        windowSize: 5,
        polynomial: 3,
      },
    };

    let target = 4;
    spectraProcessor.alignSpectra(target, 1, 10, options);
    const normalized = spectraProcessor.getNormalizedData();
    const matrix = normalized.matrix;
    const firstMax = getMax(matrix[0]);
    const secondMax = getMax(matrix[1]);
    expect(matrix[0].indexOf(firstMax)).toStrictEqual(target);
    expect(matrix[1].indexOf(secondMax)).toStrictEqual(target);
  });
});
