import { getBoxPlotChart } from '../getBoxPlotChart';

const normalizedData = {
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

test('getBoxPlotChart', () => {
  let result = getBoxPlotChart(normalizedData, { medianStrokeColor: '#000' });

  expect(result).toMatchSnapshot();
});
