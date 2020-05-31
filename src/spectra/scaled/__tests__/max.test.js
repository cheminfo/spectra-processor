import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';

expect.extend({ toBeDeepCloseTo });

const { max } = require('../max');

describe('recale max', () => {
  it('simple test', () => {
    let spectra = [
      { normalized: { x: [0, 1, 2, 3], y: [1, 2, 3, 4] } },
      { normalized: { x: [0, 1, 2, 3], y: [2, 3, 4, 5] } },
      { normalized: { x: [0, 1, 2, 3], y: [3, 4, 5, 6] } },
    ];

    let targetSpectrum = { normalized: { x: [0, 1, 2, 3], y: [1, 2, 3, 4] } };

    let results = max(spectra, targetSpectrum, {
      from: 0.9,
      to: 2.1,
    }).map((result) => Array.from(result));

    expect(results).toBeDeepCloseTo(
      [
        [1, 2, 3, 4],
        [1.5, 2.25, 3, 3.75],
        [1.8, 2.4, 3, 3.6],
      ],
      3,
    );
  });
});
