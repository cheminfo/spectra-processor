import { SpectraProcessor } from '../../SpectraProcessor';
import { getScaledData } from '../getScaledData';

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
