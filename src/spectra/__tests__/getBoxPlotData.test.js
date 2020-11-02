import { getBoxPlotData } from '../getBoxPlotData';

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
      Q1: [1.5, 2.5, 3.5],
      Q2: [3, 4, 5],
      Q3: [5, 6, 7],
      min: [1, 2, 3],
      max: [6, 7, 8],
    });
  });
});
