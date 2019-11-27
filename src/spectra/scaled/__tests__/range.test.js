import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';

expect.extend({ toBeDeepCloseTo });

const { range } = require('../range');

describe('recale range', () => {
  it('simple test', () => {
    let spectra = [
      { normalized: { x: [0, 1, 2, 3], y: [1, 2, 3, 4] } },
      { normalized: { x: [0, 1, 2, 3], y: [2, 3, 4, 5] } },
      { normalized: { x: [0, 1, 2, 3], y: [3, 4, 5, 6] } },
    ];

    let targetSpectrum = { normalized: { x: [0, 1, 2, 3], y: [2, 3, 4, 5] } };

    let result = range(spectra, targetSpectrum, { from: 0.9, to: 2.1 });
    expect(result).toBeDeepCloseTo(
      [
        [1.4, 2.8, 4.2, 5.6],
        [2, 3, 4, 5],
        [2.33, 3.11, 3.89, 4.67],
      ],
      2,
    );
  });
});
