import { describe, expect, it } from 'vitest';

import { getBoxPlotData } from '../getBoxPlotData.js';

const nomralizedData = {
  ids: [undefined, undefined, undefined, undefined, undefined],
  matrix: [
    [1, 2, 3],
    [2, 3, 4],
    [3, 4, 5],
    [4, 5, 6],
    [6, 7, 8],
  ],
  meta: [undefined, undefined, undefined, undefined, undefined],
  x: [10, 20, 30],
};

describe('getBoxPlotData', () => {
  it('Load set of data', () => {
    let result = getBoxPlotData(nomralizedData);

    expect(result).toStrictEqual({
      x: [10, 20, 30],
      q1: Float64Array.from([1.5, 2.5, 3.5]),
      median: Float64Array.from([3, 4, 5]),
      q3: Float64Array.from([5, 6, 7]),
      min: Float64Array.from([1, 2, 3]),
      max: Float64Array.from([6, 7, 8]),
    });
  });
});
