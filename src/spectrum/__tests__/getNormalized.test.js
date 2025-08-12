import { toBeDeepCloseTo, toMatchCloseTo } from 'jest-matcher-deep-close-to';
import { describe, expect, it } from 'vitest';

import { getNormalized } from '../getNormalized';

expect.extend({ toBeDeepCloseTo, toMatchCloseTo });

describe('getNormalized', () => {
  it('no filters', () => {
    let x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let y = [0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0];
    let result = getNormalized(
      {
        x,
        y,
      },
      {
        from: 1,
        to: 9,
        numberOfPoints: 5,
      },
    ).data;

    expect(result.x).toStrictEqual([1, 3, 5, 7, 9]);
    expect(result.y).toStrictEqual([1, 3, 4.5, 3, 1]);
  });

  it('with growingX', () => {
    let x = [0, 1, 1, 2, 1, 3, 4];
    let y = [0, 1, 2, 3, 4, 5, 6];
    let result = getNormalized(
      {
        x,
        y,
      },
      {
        from: 0,
        to: 4,
        numberOfPoints: 5,
        filters: [
          {
            name: 'ensureGrowing',
          },
        ],
      },
    ).data;
    expect(result.x).toStrictEqual([0, 1, 2, 3, 4]);
    expect(result.y).toStrictEqual([0.125, 1.125, 3, 4.875, 5.125]);
  });

  it('applyRangeSelectionFirst', () => {
    const x = [0, 1, 2, 3, 4];
    const y = [0, 1, 2, 3, 4];
    const result = getNormalized(
      { x, y },
      {
        from: 1,
        to: 4,
        numberOfPoints: 3,
        filters: [{ name: 'rescale' }],
      },
    ).data;
    expect(result.y).toStrictEqual([0.25, 0.625, 0.765625]);

    const result2 = getNormalized(
      { x, y },
      {
        from: 1,
        to: 4,
        numberOfPoints: 3,
        filters: [{ name: 'rescale' }],
        applyRangeSelectionFirst: true,
      },
    ).data;
    expect(result2.y).toBeDeepCloseTo([0, 0.7272727272727273, 1]);
  });

  it('with align', () => {
    let x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    let y = [0, 0, 0, 0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0, 0, 0, 0];
    let result = getNormalized(
      {
        x,
        y,
      },
      {
        from: 0,
        to: 16,
        numberOfPoints: 5,
        filters: [
          {
            name: 'calibrateX',
            options: {
              from: 1,
              to: 16,
              nbPeaks: 1,
              targetX: 1,
            },
          },
        ],
      },
    ).data;
    expect(result.x).toStrictEqual([0, 4, 8, 12, 16]);
    expect(result.y).toStrictEqual([3.75, 2, 0, 0, 0]);
  });
  it('with SNV', () => {
    let x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let y = [0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0];
    let result = getNormalized(
      {
        x,
        y,
      },
      {
        from: 1,
        to: 9,
        numberOfPoints: 5,
        filters: [{ name: 'centerMean' }, { name: 'divideBySD' }],
      },
    ).data;

    expect(result.x).toStrictEqual([1, 3, 5, 7, 9]);
    expect(result.y).toStrictEqual([
      -0.7581425055034354, 0.4332242888591059, 1.3267493846310112,
      0.4332242888591029, -0.7581425055034343,
    ]);
  });
});
