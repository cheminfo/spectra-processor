import { getBoxPlotAnnotations } from '../getBoxPlotAnnotations';

let spectra = [
  {
    normalized: {
      x: [10, 20, 30],
      y: [1, 2, 3],
    },
  },
  {
    normalized: {
      x: [10, 20, 30],
      y: [2, 3, 4],
    },
  },
  {
    normalized: {
      x: [10, 20, 30],
      y: [3, 4, 5],
    },
  },
  {
    normalized: {
      x: [10, 20, 30],
      y: [4, 5, 6],
    },
  },
  {
    normalized: {
      x: [10, 20, 30],
      y: [6, 7, 8],
    },
  },
];

describe('getBoxPlotAnnotations', () => {
  it('check jsgraph annotations', () => {
    let result = getBoxPlotAnnotations(spectra);

    expect(result).toMatchSnapshot();
  });
});
