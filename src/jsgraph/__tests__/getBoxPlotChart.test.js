import { getBoxPlotChart } from '../getBoxPlotChart';

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

describe('getBoxPlotChart', () => {
  it('check jsgraph chart with annotations', () => {
    let result = getBoxPlotChart(nomralizedData, { q2StrokeColor: '#000' });

    expect(result).toMatchSnapshot();
  });
});
