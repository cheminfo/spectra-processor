import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';

import { SpectraProcessor } from '../../SpectraProcessor';
import { getScaledData } from '../getScaledData';

expect.extend({ toBeDeepCloseTo });

let spectraProcessor = new SpectraProcessor();
spectraProcessor.spectra = [
  {
    id: 1,
    normalized: {
      x: [10, 20, 30],
      y: [1, 2, 3],
    },
  },
  {
    id: 2,
    normalized: {
      x: [10, 20, 30],
      y: [2, 3, 4],
    },
  },
  {
    id: 3,
    normalized: {
      x: [10, 20, 30],
      y: [3, 4, 5],
    },
  },
];

describe('getScaledData', () => {
  it('No options', () => {
    let result = getScaledData(spectraProcessor);
    expect(result.matrix).toStrictEqual([
      [1, 2, 3],
      [2, 3, 4],
      [3, 4, 5],
    ]);
  });

  it('filter', () => {
    let result = getScaledData(spectraProcessor, {
      filters: [{ name: 'pqn', options: { max: 10 } }],
    });
    expect(result.matrix).toBeDeepCloseTo([
      [2.672612419124244, 5.345224838248488, 8.017837257372733],
      [3.7139067635410377, 5.570860145311556, 7.427813527082075],
      [4.242640687119285, 5.65685424949238, 7.071067811865475],
    ]);
  });

  it('min', () => {
    let result = getScaledData(spectraProcessor, { method: 'minMax' });
    expect(result.matrix).toStrictEqual([
      [1, 2, 3],
      [1, 2, 3],
      [1, 2, 3],
    ]);
  });

  it('min cache', () => {
    let result = getScaledData(spectraProcessor, { method: 'minMax' });
    let result2 = getScaledData(spectraProcessor, { method: 'minMax' });
    expect(result === result2).toBe(true);
    expect(result2.matrix).toStrictEqual([
      [1, 2, 3],
      [1, 2, 3],
      [1, 2, 3],
    ]);
  });

  it('ranges', () => {
    let result = getScaledData(spectraProcessor, {
      ranges: [
        { label: 'A', from: 6, to: 14 },
        { label: 'B', from: 16, to: 34 },
      ],
    });
    expect(result.matrix).toStrictEqual([
      [1, 2, 3],
      [2, 3, 4],
      [3, 4, 5],
    ]);
    expect(result.ranges[1]).toStrictEqual({
      A: {
        label: 'A',
        from: 6,
        to: 14,
        integration: 0,
        maxPoint: { x: 10, y: 2, index: 0 },
      },
      B: {
        label: 'B',
        from: 16,
        to: 34,
        integration: 35,
        maxPoint: { x: 30, y: 4, index: 2 },
      },
    });
  });

  it('ranges and calculations', () => {
    let result = getScaledData(spectraProcessor, {
      ranges: [
        { label: 'A', from: 6, to: 14 },
        { label: 'B', from: 16, to: 34 },
      ],
      calculations: [
        {
          formula: 'A+B',
          label: 'sum',
        },
        {
          formula: 'A-B',
          label: 'difference',
        },
      ],
    });
    expect(result.matrix).toStrictEqual([
      [1, 2, 3],
      [2, 3, 4],
      [3, 4, 5],
    ]);
    expect(result.ranges[1]).toStrictEqual({
      A: {
        label: 'A',
        from: 6,
        to: 14,
        integration: 0,
        maxPoint: { x: 10, y: 2, index: 0 },
      },
      B: {
        label: 'B',
        from: 16,
        to: 34,
        integration: 35,
        maxPoint: { x: 30, y: 4, index: 2 },
      },
    });
    expect(result.calculations[1]).toStrictEqual({
      sum: 35,
      difference: -35,
    });
  });
});
