import { SpectraProcessor } from '../../SpectraProcessor';
import { getScaledData } from '../getScaledData';

import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';

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
    let result = getScaledData(spectraProcessor, { filters: [{ name: 'pqn', options: { max: 10 } }] });
    expect(result.matrix).toBeDeepCloseTo([
      [1.4351022459675875, 2.870204491935175, 4.305306737902763],
      [2.1773088497382695, 3.265963274607404, 4.354617699476539],
      [2.583031511931815, 3.444042015909086, 4.305052519886358]
    ])


  })

  it('min', () => {
    let result = getScaledData(spectraProcessor, { method: 'minMax' });
    expect(result.matrix).toStrictEqual([
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
