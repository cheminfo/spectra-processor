import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';

expect.extend({ toBeDeepCloseTo });

const { minMax } = require('../minMax');

describe('recale minMax', () => {
  it('simple test', () => {
    let spectra = [
      { normalized: { x: [0, 1, 2, 3], y: [1, 2, 3, 4] } },
      { normalized: { x: [0, 1, 2, 3], y: [2, 3, 4, 5] } },
      { normalized: { x: [0, 1, 2, 3], y: [2, 4, 6, 8] } },
      { normalized: { x: [0, 1, 2, 3], y: [3, 5, 7, 9] } },
    ];

    let targetSpectrum = { normalized: { x: [0, 1, 2, 3], y: [1, 2, 3, 4] } };

    let result = minMax(spectra, targetSpectrum, { from: 0.9, to: 2.1 });

    expect(result).toBeDeepCloseTo(
      [
        [1, 2, 3, 4],
        [1, 2, 3, 4],
        [1, 2, 3, 4],
        [1, 2, 3, 4],
      ],
      2,
    );
  });
});
