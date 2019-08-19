import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';

expect.extend({ toBeDeepCloseTo });

const { min } = require('../min');

describe('recale min', () => {
  it('simple test', () => {
    let spectra = [
      { normalized: { x: [0, 1, 2, 3], y: [1, 2, 3, 4] } },
      { normalized: { x: [0, 1, 2, 3], y: [2, 3, 4, 5] } },
      { normalized: { x: [0, 1, 2, 3], y: [3, 4, 5, 6] } }
    ];

    let targetSpectrum = { normalized: { x: [0, 1, 2, 3], y: [1, 2, 3, 4] } };

    let result = min(spectra, targetSpectrum, { from: 0.9, to: 2.1 });
    expect(result).toBeDeepCloseTo(
      [[1, 2, 3, 4], [1.33, 2, 2.67, 3.33], [1.5, 2, 2.5, 3]],
      2
    );
  });
});
