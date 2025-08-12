import { describe, expect, it } from 'vitest';

import { updateRangesInfo } from '../updateRangesInfo';

describe('updateRangesInfo', () => {
  it('simple case', () => {
    let x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let y = [0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0];
    let spectrum = {
      normalized: {
        x,
        y,
      },
    };

    updateRangesInfo(spectrum, [
      {
        label: 'A',
        from: 0,
        to: 3,
      },
      {
        label: 'B',
        from: 4,
        to: 6,
      },
    ]);

    expect(spectrum.ranges).toStrictEqual({
      A: {
        label: 'A',
        from: 0,
        to: 3,
        baseline: 4.5,
        correctedIntegration: 0,
        deltaX: 3,
        integration: 4.5,
        maxPoint: { x: 3, y: 3, index: 3 },
        minPoint: { x: 0, y: 0, index: 0 },
        x: [0, 1, 2, 3],
        y: [0, 1, 2, 3],
      },
      B: {
        label: 'B',
        from: 4,
        to: 6,
        baseline: 8,
        correctedIntegration: 1,
        deltaX: 2,
        integration: 9,
        maxPoint: { x: 5, y: 5, index: 5 },
        minPoint: { x: 4, y: 4, index: 4 },
        x: [4, 5, 6],
        y: [4, 5, 4],
      },
    });
  });
});
