import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';

import { SpectraProcessor } from '../../SpectraProcessor';
import { getPostProcessedData } from '../getPostProcessedData';

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

describe('getPostProcessedData', () => {
  it('No options', () => {
    let result = getPostProcessedData(spectraProcessor);
    expect(result.matrix).toStrictEqual([
      [1, 2, 3],
      [2, 3, 4],
      [3, 4, 5],
    ]);
  });

  it('filter pqn', () => {
    let result = getPostProcessedData(spectraProcessor, {
      filters: [{ name: 'pqn', options: { max: 10 } }],
    });
    expect(result.matrix).toBeDeepCloseTo([
      [2.672612419124244, 5.345224838248488, 8.017837257372733],
      [3.7139067635410377, 5.570860145311556, 7.427813527082075],
      [4.242640687119285, 5.65685424949238, 7.071067811865475],
    ]);
  });

  it('filter rescale', () => {
    let result = getPostProcessedData(spectraProcessor, {
      filters: [{ name: 'rescale', options: { max: 10 } }],
    });
    result.matrix = result.matrix.map(row => Array.from(row));
    expect(result.matrix).toEqual([[0, 0, 0], [5, 5, 5], [10, 10, 10]]);
  });

  it('filter centerMean', () => {
    let result = getPostProcessedData(spectraProcessor, {
      filters: [{ name: 'centerMean' }],
    });
    result.matrix = result.matrix.map(row => Array.from(row));
    expect(result.matrix).toEqual([[-1, -1, -1], [0, 0, 0], [1, 1, 1]]
    );
  });

  it('minMax', () => {
    let result = getPostProcessedData(spectraProcessor, {
      scale: { method: 'minMax' },
    });
    expect(result.matrix).toStrictEqual([
      [1, 2, 3],
      [1, 2, 3],
      [1, 2, 3],
    ]);
  });

  it('minMax cache', () => {
    let result = getPostProcessedData(spectraProcessor, {
      scale: { method: 'minMax' },
    });
    let result2 = getPostProcessedData(spectraProcessor, {
      scale: { method: 'minMax' },
    });
    expect(result === result2).toBe(true);
    expect(result2.matrix).toStrictEqual([
      [1, 2, 3],
      [1, 2, 3],
      [1, 2, 3],
    ]);
    // same values but other pointer, normalized changed we can not use the cache
    spectraProcessor.spectra[0].normalized = { x: [10, 20, 30], y: [1, 2, 3] };
    let result3 = getPostProcessedData(spectraProcessor, {
      scale: { method: 'minMax' },
    });
    expect(result === result3).toBe(false);
  });

  it('min', () => {
    let result = getPostProcessedData(spectraProcessor, {
      scale: {
        method: 'min',
        targetID: 3,
      },
    });
    result.matrix[0] = Array.from(result.matrix[0]);
    result.matrix[1] = Array.from(result.matrix[1]);
    result.matrix[2] = Array.from(result.matrix[2]);
    expect(result.matrix).toStrictEqual([
      [3, 6, 9],
      [3, 4.5, 6],
      [3, 4, 5],
    ]);
  });

  it('max', () => {
    let result = getPostProcessedData(spectraProcessor, {
      scale: { method: 'max', targetID: 2 },
    });
    result.matrix[0] = Array.from(result.matrix[0]);
    result.matrix[1] = Array.from(result.matrix[1]);
    result.matrix[2] = Array.from(result.matrix[2]);
    expect(result.matrix).toBeDeepCloseTo(
      [
        [1.3333333, 2.666666, 4],
        [2, 3, 4],
        [2.4, 3.2, 4],
      ],
      5,
    );
  });

  it('integration', () => {
    let result = getPostProcessedData(spectraProcessor, {
      scale: { method: 'integration', targetID: 2 },
    });
    result.matrix[0] = Array.from(result.matrix[0]);
    result.matrix[1] = Array.from(result.matrix[1]);
    result.matrix[2] = Array.from(result.matrix[2]);
    expect(result.matrix).toBeDeepCloseTo(
      [
        [1.5, 3, 4.5],
        [2, 3, 4],
        [2.25, 3, 3.75],
      ],
      5,
    );
  });

  it('ranges', () => {
    let result = getPostProcessedData(spectraProcessor, {
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
        integration: 20,
        maxPoint: { x: 10, y: 2, index: 0 },
      },
      B: {
        label: 'B',
        from: 16,
        to: 34,
        integration: 70,
        maxPoint: { x: 30, y: 4, index: 2 },
      },
    });
  });

  it('ranges and calculations', () => {
    let result = getPostProcessedData(spectraProcessor, {
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
        integration: 20,
        maxPoint: { x: 10, y: 2, index: 0 },
      },
      B: {
        label: 'B',
        from: 16,
        to: 34,
        integration: 70,
        maxPoint: { x: 30, y: 4, index: 2 },
      },
    });
    expect(result.calculations[1]).toStrictEqual({
      sum: 90,
      difference: -50,
    });
  });
});
